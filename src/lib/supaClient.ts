// lib/supaClient.ts
export async function exchangeCodeForSession(code: string) {
  const STATIC_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3c2Npd25zbHdrc3V2cmZ6cGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMDA4NzEsImV4cCI6MjA3MDY3Njg3MX0.nPyhD2_VyQt2YTesO77S-55QBAAcKfdoQLXobuPpozs";

  try {
    const res = await fetch("https://lwsciwnslwksuvrfzpca.supabase.co/functions/v1/instagram-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${STATIC_ACCESS_TOKEN}`, // static token
      },
      body: JSON.stringify({ code }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { ok: false, message: errorData.error || "Request failed" };
    }

    const data = await res.json();
    return { ok: true, ...data };
  } catch (err: unknown) {
    return { ok: false, message: (err as Error).message };
  }
}
