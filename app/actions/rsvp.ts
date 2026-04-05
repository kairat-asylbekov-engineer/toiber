"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitRSVP(formData: FormData) {
  const invitationId = formData.get("invitationId") as string;
  const name = (formData.get("name") as string)?.trim();
  const status = formData.get("status") as string;
  const comment = (formData.get("comment") as string)?.trim() || null;

  if (!invitationId) {
    return { error: "Приглашение не найдено" };
  }

  if (!name || name.length < 2) {
    return { error: "Пожалуйста, укажите ваше имя" };
  }

  if (status !== "yes" && status !== "no") {
    return { error: "Пожалуйста, выберите ваш ответ" };
  }

  const supabase = createClient();

  const { error } = await supabase.from("rsvps").insert({
    invitation_id: invitationId,
    name,
    status,
    comment,
  });

  if (error) {
    return { error: "Не удалось отправить ответ. Попробуйте ещё раз." };
  }

  return { success: true };
}
