import { motion, type Variants } from "framer-motion";

const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 1, ease: "linear" },
  },
};

export default function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg,#a855f7,#ec4899,#ef4444)",
      }}
    >
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          border: "4px solid rgba(255,255,255,0.9)",
          borderTopColor: "transparent",
          // boxShadow: "0 0 24px rgba(0,0,0,0.15)",
        }}
        aria-label="Loading"
        role="status"
      />
    </div>
  );
}
