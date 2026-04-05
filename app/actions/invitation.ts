"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { generateSlug } from "@/lib/utils";
import type { InvitationData } from "@/types";

export async function createInvitation(data: InvitationData, templateId: string, slug: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо войти в систему" };
  }

  const { data: allSlugs } = await supabase
    .from("invitations")
    .select("slug");

  const allSlugList = (allSlugs ?? []).map((inv) => inv.slug);

  let finalSlug = slug.trim();
  if (!finalSlug) {
    finalSlug = generateSlug(data.groomName, data.brideName, allSlugList);
  } else {
    finalSlug = finalSlug
      .toLowerCase()
      .replace(/[^a-z0-9а-яё-]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (allSlugList.includes(finalSlug)) {
      let counter = 2;
      while (allSlugList.includes(`${finalSlug}-${counter}`)) counter++;
      finalSlug = `${finalSlug}-${counter}`;
    }
  }

  const { data: invitation, error } = await supabase
    .from("invitations")
    .insert({
      user_id: user.id,
      slug: finalSlug,
      template_id: templateId,
      data,
      status: "draft",
    })
    .select()
    .single();

  if (error) {
    return { error: "Не удалось создать приглашение: " + error.message };
  }

  return { success: true, invitation };
}

export async function updateInvitation(
  id: string,
  data: InvitationData,
  slug?: string
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо войти в систему" };
  }

  const updatePayload: Record<string, unknown> = {
    data,
    updated_at: new Date().toISOString(),
  };

  if (slug !== undefined) {
    const finalSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9а-яё-]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const { data: conflict } = await supabase
      .from("invitations")
      .select("id")
      .eq("slug", finalSlug)
      .neq("id", id)
      .single();

    if (conflict) {
      return { error: "Этот адрес уже занят" };
    }

    updatePayload.slug = finalSlug;
  }

  const { error } = await supabase
    .from("invitations")
    .update(updatePayload)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Не удалось обновить приглашение: " + error.message };
  }

  return { success: true };
}

export async function deleteInvitation(id: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо войти в систему" };
  }

  const { error } = await supabase
    .from("invitations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Не удалось удалить приглашение" };
  }

  return { success: true };
}

export async function publishInvitation(id: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо войти в систему" };
  }

  const { error } = await supabase
    .from("invitations")
    .update({ status: "published", updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Не удалось опубликовать приглашение" };
  }

  return { success: true };
}

export async function unpublishInvitation(id: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо войти в систему" };
  }

  const { error } = await supabase
    .from("invitations")
    .update({ status: "draft", updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Не удалось снять с публикации" };
  }

  return { success: true };
}

export async function uploadImage(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Необходимо войти в систему" };
  }

  const file = formData.get("file") as File;
  if (!file || !file.size) {
    return { error: "Файл не выбран" };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { error: "Файл слишком большой (максимум 5 МБ)" };
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return { error: "Поддерживаются только JPEG, PNG, WebP и GIF" };
  }

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("invitation-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { error: "Не удалось загрузить файл: " + error.message };
  }

  const { data: urlData } = supabase.storage
    .from("invitation-images")
    .getPublicUrl(fileName);

  return { success: true, url: urlData.publicUrl };
}

export async function getUserInvitations() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getInvitationById(id: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) return null;
  return data;
}
