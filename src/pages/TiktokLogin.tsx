import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { exchangeCodeForSession } from "../lib/handleTikTokLogin";

/* ---------------------------------------------
   Types
--------------------------------------------- */
type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; error: string };

/* ---------------------------------------------
   Styled Components
--------------------------------------------- */
const Page = styled.div`
  min-height: 100vh;
  background: #000000; /* TikTok black */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 64px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Card = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 420px;
  height: auto;
  align-self: flex-start;

  padding: 32px 24px 36px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);

  animation: fadeIn 0.25s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const Logo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #000000;
  color: #ffffff;
  font-size: 26px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
  color: #111111;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #6b6b6b;
  margin-bottom: 24px;
`;

const Loader = styled.div`
  width: 36px;
  height: 36px;
  margin: 0 auto;
  border: 4px solid #e5e5e5;
  border-top-color: #000000;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorText = styled.p`
  font-size: 15px;
  color: #d93025;
  line-height: 1.5;
`;

/* ---------------------------------------------
   Component
--------------------------------------------- */
export default function TikTokLogin() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const code = useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    return sp.get("code") ?? "";
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!code) {
        setStatus({
          state: "error",
          error: "Missing authorization code from TikTok.",
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
            error: data.message || "TikTok authorization failed.",
          });
          return;
        }

        /* -----------------------------------------
           🔥 Redirect to Flutter Deep Link
        ----------------------------------------- */
        const deeplinkUrl =
          `https://amazing-griffin-5d41ac.netlify.app/deeplink` +
          `?success=true` +
          `&authType=tiktok` +
          `&session_id=${encodeURIComponent(data.session_id)}`;

        window.location.replace(deeplinkUrl);
      } catch (err: unknown) {
        setStatus({
          state: "error",
          error:
            (err as Error)?.message ??
            "Unexpected error during TikTok login.",
        });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <Page>
      <Card>
        <LogoWrapper>
          <Logo>🎵</Logo>
        </LogoWrapper>

        {status.state === "error" ? (
          <>
            <Title>Login Failed</Title>
            <ErrorText>{status.error}</ErrorText>
          </>
        ) : (
          <>
            <Title>Connecting to TikTok</Title>
            <Subtitle>
              Verifying your TikTok account and profile information
            </Subtitle>
            <Loader />
          </>
        )}
      </Card>
    </Page>
  );
}
