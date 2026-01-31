
export default function DeepLinkTest() {
  const deeplinkUrl = "app.perkey.mobile:///deeplink?success=true";

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f6f2fa",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          padding: 24,
          borderRadius: 16,
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Universal Link Test ✅</h2>
        <p style={{ marginTop: 10, color: "#6b7280" }}>
          Tap the button below to open the app.
        </p>

        {/* ✅ BEST METHOD FOR iOS */}
        <a
          href={deeplinkUrl}
          style={{ display: "block", textDecoration: "none" }}
        >
          <button
            style={{
              width: "100%",
              height: 48,
              borderRadius: 12,
              border: "none",
              background: "#111827",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Open Perkey App
          </button>
        </a>
      </div>
    </div>
  );
}
