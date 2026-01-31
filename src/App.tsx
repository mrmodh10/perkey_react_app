import { Routes, Route } from "react-router-dom";
import InstagramLogin from "./pages/InstagramLogin";
import VerifiedScreen from "./components/VerifiedScreen";
import HomeScreen from "./pages/HomeScreen";
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyle } from "./styles/GlobalStyle";
import FacebookLogin from "./pages/FacebookLogin";
import TikTokLogin from "./pages/TiktokLogin";
import DeepLinkReturnScreen from "./pages/DeepLinkReturnScreen";

export default function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/instagramLogin" element={<InstagramLogin />} />
        <Route path="/facebookLogin" element={<FacebookLogin />} />
        <Route path="/tiktokLogin" element={<TikTokLogin />} />
        <Route path="/verified" element={<VerifiedScreen />} />

        {/* ✅ Deep link test route */}
    <Route path="/deeplink-test" element={<DeepLinkReturnScreen />} />
      </Routes>
    </ThemeProvider>
  );
}
