import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Invitation } from "@/types";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: invitations } = await supabase
    .from("invitations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return <DashboardClient initialInvitations={(invitations as Invitation[]) ?? []} />;
}
