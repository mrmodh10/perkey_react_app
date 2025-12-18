// lib/supaClient.ts
export async function exchangeCodeForSession(code: string) {
  const STATIC_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51eWlzaGpzYnJ0ZW9scGZhb3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyOTIxNDMsImV4cCI6MjA3MDg2ODE0M30.fK8ebypylZppEt9GfPP6daNJ40E-jyTqV9CiFDuJkyw";

  try {
    const res = await fetch("https://nuyishjsbrteolpfaovi.supabase.co/functions/v1/tiktok-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${STATIC_ACCESS_TOKEN}`, // static token
      },
      body: JSON.stringify({ code }),
    });

    console.log("Response status:", res.status);

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
