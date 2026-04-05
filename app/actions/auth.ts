"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInWithMagicLink(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || typeof email !== "string") {
    return { error: "Введите email адрес" };
  }

  const headersList = headers();
  const origin = headersList.get("origin") || headersList.get("referer") || "";
  const baseUrl = origin.replace(/\/$/, "");

  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/auth/callback`,
      },
    });

    if (error) {
      return { error: error.message };
    }
  } catch (err) {
    console.error("[auth] signInWithOtp network error:", err);
    return { error: "Не удалось подключиться к серверу авторизации. Попробуйте позже." };
  }

  return { success: true };
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}
