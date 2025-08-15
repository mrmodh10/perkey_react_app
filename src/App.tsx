import { Routes, Route } from "react-router-dom";
import InstagramLogin from "./pages/InstagramLogin";
import VerifiedScreen from "./components/VerifiedScreen";
import HomeScreen from "./pages/HomeScreen";
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyle } from "./styles/GlobalStyle";

export default function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/instagramLogin" element={<InstagramLogin />} />
        <Route path="/verified" element={<VerifiedScreen />} />
      </Routes>
    </ThemeProvider>
  );
}
