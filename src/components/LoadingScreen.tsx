import { motion } from "framer-motion";
import { useTheme } from "styled-components";

export default function LoadingScreen() {
  const theme = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start", // top alignment
        justifyContent: "center",
        background: theme.background,
        paddingTop: "10vh", // relative to screen height
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: "rgba(255,255,255,0.1)",
          padding: "2rem 3rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          minWidth: "60vw",
          maxWidth: "90vw", // prevent overflowing on small screens
        }}
      >
        {/* Animated Bouncing Dots */}
        <div style={{ display: "flex", gap: "0.5rem"}}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: ["0%", "-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.2,
              }}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: theme.textColor,
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <p style={{ color: theme.textColor, marginTop: "1rem" }}>
          Authenticating...
        </p>
      </motion.div>
    </div>
  );
}