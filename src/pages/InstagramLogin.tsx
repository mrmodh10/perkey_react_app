import { useEffect, useMemo, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { exchangeCodeForSession } from "../lib/supaClient";
import { useTheme } from "styled-components";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; error: string };

export default function InstagramLogin() {
  const theme = useTheme();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const code = useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    const raw = sp.get("code") ?? "";
    return raw.replace(/#_$/, "");
  }, []);

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

        if (!data.ok) {
          setStatus({
            state: "error",
            error: data.message || "Authorization failed.",
          });
          return;
        }

        /**
         * 🔥 IMPORTANT PART
         * Redirect to Flutter deep link
         */
        const deeplinkUrl =
          `https://amazing-griffin-5d41ac.netlify.app/deeplink` +
          `?success=true` +
          `&session_id=${encodeURIComponent(data.session_id)}`;

        window.location.replace(deeplinkUrl);
      } catch (err: unknown) {
        setStatus({
          state: "error",
          error:
            (err as Error)?.message ??
            "Unexpected error while contacting server.",
        });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (status.state === "loading" || status.state === "idle") {
    return <LoadingScreen />;
  }

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
        <h1 style={{ fontSize: 28, fontWeight: 800, color: theme.textColor }}>
          Login Issue
        </h1>
        <p style={{ color: theme.textColor }}>{status.error}</p>
      </div>
    </div>
  );
}