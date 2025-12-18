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
  background: linear-gradient(135deg, #000000, #111111);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 👈 FIX */
  padding-top: 64px;       /* 👈 Center-top positioning */
  padding-left: 16px;
  padding-right: 16px;
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
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
`;

/* ✅ Inline SVG — NO CORS, NO broken icon */
const TikTokLogo = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="10" fill="#000000" />
    <path
      d="M30.5 14.2c1.6 1.2 3.4 1.8 5.2 1.8v4.6c-2 0-4-.5-5.8-1.5v8.7
         c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c.4 0 .9 0 1.3.1v4.8
         c-.4-.1-.8-.2-1.3-.2-2.3 0-4.2 1.9-4.2 4.2
         0 2.3 1.9 4.2 4.2 4.2s4.2-1.9 4.2-4.2V10h5.4
         c.3 1.6 1.2 3 2.4 4.2z"
      fill="#25F4EE"
    />
    <path
      d="M28.5 12.2c1.6 1.2 3.4 1.8 5.2 1.8v4.6
         c-2 0-4-.5-5.8-1.5v8.7
         c0 5-4 9-9 9-2 0-3.9-.7-5.4-1.9
         1.6 1.6 3.7 2.5 6 2.5
         5 0 9-4 9-9V12.2z"
      fill="#FE2C55"
    />
  </svg>
);

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #111111;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 28px;
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
    if (!code) {
      setStatus({
        state: "error",
        error: "Missing authorization code from TikTok.",
      });
      return;
    }

    async function run() {
      setStatus({ state: "loading" });
      try {
        const data = await exchangeCodeForSession(code);

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
      } catch (err) {
        setStatus({
          state: "error",
          error: "Unexpected error during TikTok login.",
        });
      }
    }

    run();
  }, [code]);

  return (
    <Page>
      <Card>
        <LogoWrapper>
          <TikTokLogo />
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
              Verifying your TikTok account and securely linking it
            </Subtitle>
            <Loader />
          </>
        )}
      </Card>
    </Page>
  );
}
