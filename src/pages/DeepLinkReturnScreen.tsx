import React from "react";
import { useSearchParams } from "react-router-dom";

export default function DeepLinkReturnScreen() {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id") ?? "";

  const handleOpenApp = () => {
    if (!sessionId) {
      alert("Missing session_id in URL");
      return;
    }

    const deeplinkUrl =
      "https://amazing-griffin-5d41ac.netlify.app/deeplink";

    // ✅ Best for iOS universal links
    window.location.href = deeplinkUrl;
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Deep Link Test ✅</h2>

        <p style={styles.subtitle}>
          Session ID:
          <br />
          <span style={styles.sessionText}>
            {sessionId ? sessionId : "Not found"}
          </span>
        </p>

        <button onClick={handleOpenApp} style={styles.button}>
          Open Perkey App
        </button>

        <p style={styles.note}>
          If nothing happens, try opening this page in Safari directly.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f6f2fa",
    padding: "16px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    color: "#111827",
  },
  subtitle: {
    marginTop: "10px",
    marginBottom: "18px",
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: 1.4,
    wordBreak: "break-word",
  },
  sessionText: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#111827",
  },
  button: {
    width: "100%",
    height: "48px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    background: "#111827",
    color: "#ffffff",
  },
  note: {
    marginTop: "12px",
    fontSize: "12px",
    color: "#6b7280",
  },
};
