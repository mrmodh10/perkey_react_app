import { Routes, Route } from "react-router-dom";
import InstagramLogin from "./pages/InstagramLogin";
import VerifiedScreen from "./components/VerifiedScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InstagramLogin />} />
      <Route path="/verified" element={<VerifiedScreen />} />
    </Routes>
  );
}
