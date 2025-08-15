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

export default function InstagramLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const code = useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("code") ?? "";
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      // if (!code) {
      //   setStatus({
      //     state: "error",
      //     error: "Missing authorization code in URL.",
      //   });
      //   return;
      // }
      setStatus({ state: "loading" });

      // try {
      //   const data = await exchangeCodeForSession(code);

      //   if (cancelled) return;

      //   if (data.ok) {
      //     setStatus({ state: "done" });
      //     // You might want to persist tokens/profile here (if returned)
      //     // localStorage.setItem('ig_access_token', data.access_token ?? '');
      //     // Check if Flutter bridge exists
      //     if ((window as any).flutter_inappwebview?.callHandler) {
      //       (window as any).flutter_inappwebview.callHandler(
      //         "onInstagramData",
      //         data
      //       );
      //     }
      //     navigate("/verified", { replace: true });
      //   } else {
      //     setStatus({
      //       state: "error",
      //       error: data.message || "Authorization failed.",
      //     });
      //   }
      // } catch (err: unknown) {
      //   const message =
      //     (err as Error)?.message ??
      //     "Unexpected error while contacting Supabase function.";
      //   setStatus({ state: "error", error: message });
      // }
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
          <h1 style={{ fontSize: 28, marginBottom: 8, fontWeight: 800, color: theme.textColor }}>
            Login Issue
          </h1>
          <p style={{ marginBottom: 16, color: theme.textColor }}>{status.error}</p>
          <p style={{ opacity: 0.8, color: theme.textColor }}>
            Open the Instagram login on mobile again and make sure this page
            receives a URL with
            <code> ?code=&lt;value&gt;</code>.
          </p>
        </div>
        <div style={{height:100}}></div>
      </div>
    );
  }

  // 'done' will navigate to /verified, but keep a minimal fallback UI
  return <LoadingScreen />;
}
