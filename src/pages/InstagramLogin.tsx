import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { exchangeCodeForSession } from "../lib/supaClient";
import { useTheme } from "styled-components";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; error: string }
  | { state: "done" };

// Extract ?code=... robustly without letting '+' turn into spaces
function extractCodeFromLocation(): string | null {
  const href = window.location.href;

  // 1) Drop any hash fragments first (e.g., #_, #_=_)
  const hrefNoHash = href.split("#")[0];

  // 2) Try to read from the querystring
  const queryMatch = hrefNoHash.match(/[?&]code=([^&]+)/);
  if (queryMatch && queryMatch[1]) {
    // decodeURIComponent won't convert '+' to space, which is what we want
    const decoded = decodeURIComponent(queryMatch[1]);
    // normalize any accidental whitespace (extremely defensive)
    return decoded.replace(/\s+/g, "+").trim();
  }

  // 3) Fallback: some providers place the code in the hash (e.g., #code=...)
  if (window.location.hash) {
    // remove leading '#' and optional leading '/'
    const rawHash = window.location.hash.replace(/^#\/?/, "");
    // make it look like a querystring for consistent regex
    const pseudoQuery = rawHash.startsWith("?") ? rawHash : `?${rawHash}`;
    const hashMatch = pseudoQuery.match(/[?&]code=([^&]+)/);
    if (hashMatch && hashMatch[1]) {
      const decoded = decodeURIComponent(hashMatch[1]);
      return decoded.replace(/\s+/g, "+").trim();
    }
  }

  return null;
}

export default function InstagramLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const code = useMemo(() => extractCodeFromLocation() ?? "", []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!code) {
        setStatus({
          state: "error",
          error: "Missing authorization code in URL.",
        });
        return;
      }

      setStatus({ state: "loading" });

      try {
        const data = await exchangeCodeForSession(code);

        if (cancelled) return;

        if (data.ok) {
          setStatus({ state: "done" });

          // Optional: clean the URL (remove ?code=... and any #_)
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete("code");
            url.hash = "";
            window.history.replaceState({}, document.title, url.toString());
          } catch {
            // no-op if history replace fails
          }

          // Flutter bridge (if present)
          if ((window as any).flutter_inappwebview?.callHandler) {
            (window as any).flutter_inappwebview.callHandler(
              "onInstagramData",
              data
            );
          }

          navigate("/verified", { replace: true });
        } else {
          setStatus({
            state: "error",
            error:
              data.message ||
              "Authorization failed. (Code exchange returned an error.)",
          });
        }
      } catch (err: unknown) {
        const message =
          (err as Error)?.message ??
          "Unexpected error while contacting Supabase function.";
        setStatus({ state: "error", error: message });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [code, navigate]);

  if (status.state === "loading" || status.state === "idle")
    return <LoadingScreen />;

  if (status.state === "error") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: 24,
          textAlign: "center",
          background: theme.background,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h1
            style={{
              fontSize: 28,
              marginBottom: 8,
              fontWeight: 800,
              color: theme.textColor,
            }}
          >
            Login Issue
          </h1>
          <p style={{ marginBottom: 16, color: theme.textColor }}>
            {status.error}
          </p>
          <p style={{ opacity: 0.8, color: theme.textColor }}>
            Open the Instagram login on mobile again and make sure this page
            receives a URL with
            <code> ?code=&lt;value&gt;</code>.
          </p>
        </div>
        <div style={{ height: 100 }}></div>
      </div>
    );
  }

  // 'done' will navigate to /verified, but keep a minimal fallback UI
  return <LoadingScreen />;
}