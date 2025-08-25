// lib/supaClient.ts
export async function exchangeCodeForSession(code: string) {
  const STATIC_ACCESS_TOKEN = import.meta.env.VITE_FUNCTION_ACCESS_TOKEN;

  try {
    const res = await fetch(import.meta.env.VITE_SUPABASE_FUNCTION_URL as string, {
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
