import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Invitation } from "@/types";
import InvitationForm from "@/components/dashboard/InvitationForm";

interface EditPageProps {
  params: { id: string };
}

export const metadata = {
  title: "Редактирование — ToiBer",
};

export default async function EditPage({ params }: EditPageProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: invitation } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!invitation) {
    notFound();
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-apple-gray-dark lg:text-2xl">
          Редактирование
        </h1>
        <p className="mt-0.5 text-sm text-apple-gray">
          {(invitation as Invitation).data.groomName} &{" "}
          {(invitation as Invitation).data.brideName}
        </p>
      </div>

      <InvitationForm existing={invitation as Invitation} />
    </>
  );
}
