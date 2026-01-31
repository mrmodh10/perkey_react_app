import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { exchangeCodeForSession } from "../lib/handleFacebookLogin";

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
  background: #1877f2;
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

  /* 🔑 Prevent full-height stretching */
  height: auto;
  align-self: flex-start;

  padding: 32px 24px 36px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.15);

  /* Optional subtle entrance animation */
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
  border-radius: 50%;
  background: #1877f2;
  color: #ffffff;
  font-size: 30px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 6px;
  color: #1c1e21;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #65676b;
  margin-bottom: 24px;
`;

const Loader = styled.div`
  width: 36px;
  height: 36px;
  margin: 0 auto;
  border: 4px solid #e4e6eb;
  border-top-color: #1877f2;
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
export default function FacebookLogin() {
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
          error: "Missing authorization code from Facebook.",
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
            error: data.message || "Facebook authorization failed.",
          });
          return;
        }

        /* -----------------------------------------
           🔥 Redirect to Flutter Deep Link
        ----------------------------------------- */
        const deeplinkUrl =
          `app.perkey.mobile:///deeplink` +
          `?success=true` +
          `&authType=762e3897-279d-4d9b-ba86-e89d6c41ca32` +
          `&session_id=${encodeURIComponent(data.session_id)}`;

        window.location.replace(deeplinkUrl);
      } catch (err: unknown) {
        setStatus({
          state: "error",
          error:
            (err as Error)?.message ??
            "Unexpected error during Facebook login.",
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
          <Logo>f</Logo>
        </LogoWrapper>

        {status.state === "error" ? (
          <>
            <Title>Login Failed</Title>
            <ErrorText>{status.error}</ErrorText>
          </>
        ) : (
          <>
            <Title>Connecting to Facebook</Title>
            <Subtitle>
              Verifying your account and linked Instagram profile
            </Subtitle>
            <Loader />
          </>
        )}
      </Card>
    </Page>
  );
}
