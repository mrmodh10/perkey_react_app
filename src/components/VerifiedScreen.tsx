import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

export default function VerifiedScreen() {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      // Example: redirect to home
      navigate("/", { replace: true });

      // If you want to close tab instead:
      // window.close();
    }
  }, [countdown, navigate]);

  return (
    <div 
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.background,
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        }}
      >

        {/* Checkmark Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 1rem",
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
            strokeWidth="4"
            viewBox="0 0 24 24"
            style={{ width: "40px", height: "40px" }}
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "#111",
            marginBottom: "0.5rem",
          }}
        >
          Instagram Login Complete
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "#444",
            lineHeight: 1.5,
          }}
        >
          Your Instagram account is now securely connected.
        </p>

        {/* Countdown text */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            marginBottom: "1rem",
            color: "#555",
          }}
        >
          This screen will automatically close in{" "}
          <strong>{countdown}</strong> seconds
        </p>
      </motion.div>
    </div>
  );
}
