
import styled from "styled-components";
import PerkeyLogo from "../assets/perkey-logo.png";

/* -----------------------------------------
   Styled Components
----------------------------------------- */
const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%);
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
  padding: 40px 28px 44px;
  border-radius: 22px;
  text-align: center;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.25s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LogoContainer = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  // background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(109, 40, 217, 0.3);
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;
  color: #1c1e21;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #65676b;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const ButtonLink = styled.a`
  display: block;
  text-decoration: none;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(109, 40, 217, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(109, 40, 217, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* -----------------------------------------
   Component
----------------------------------------- */
export default function Deeplink() {
  const deeplinkUrl = "app.perkey.mobile:///deeplink?success=true";

  return (
    <Page>
      <Card>
        <LogoContainer>
          <Logo src={PerkeyLogo} alt="Perkey" />
        </LogoContainer>

        <Title>Perkey</Title>
        <Subtitle>Tap the button below to open the app</Subtitle>

        <ButtonLink href={deeplinkUrl}>
          <Button>Open Perkey App</Button>
        </ButtonLink>
      </Card>
    </Page>
  );
}
