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
  background: linear-gradient(
    135deg,
    #000000 0%,
    #0b0b0b 55%,
    #111111 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Card = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 420px;
  padding: 40px 28px;
  border-radius: 22px;
  text-align: center;

  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(0, 0, 0, 0.05);

  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(16px);
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
  margin-bottom: 22px;
`;

const TikTokLogo = styled.img`
  width: 64px;
  height: 64px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #111111;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 30px;
  line-height: 1.45;
`;

const Loader = styled.div`
  width: 38px;
  height: 38px;
  margin: 0 auto;

  border: 4px solid #e5e5e5;
  border-top-color: #25f4ee;
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

        const deeplinkUrl =
          `https://amazing-griffin-5d41ac.netlify.app/deeplink` +
          `?success=true` +
          `&authType=ed163bb5-2756-4873-8ef1-69146799f2c6` +
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
          <TikTokLogo
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/TikTok_logo.svg"
            alt="TikTok"
          />
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
              Verifying your TikTok account and securely linking it to your
              profile
            </Subtitle>
            <Loader />
          </>
        )}
      </Card>
    </Page>
  );
}
