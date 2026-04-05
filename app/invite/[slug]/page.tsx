import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { createClient } from "@/lib/supabase/server";
import type { Invitation, RSVP } from "@/types";
import ElegantWedding from "@/components/templates/ElegantWedding";
import EditorialIvory from "@/components/templates/EditorialIvory";

interface PageProps {
  params: { slug: string };
}

async function getInvitation(slug: string): Promise<Invitation | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data as Invitation;
}

async function getRsvps(invitationId: string): Promise<RSVP[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as RSVP[];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const invitation = await getInvitation(params.slug);

  if (!invitation) {
    return { title: "Приглашение не найдено" };
  }

  const { groomName, brideName, eventDate } = invitation.data;

  let formattedDate = eventDate;
  try {
    formattedDate = format(parseISO(eventDate), "d MMMM yyyy", { locale: ru });
  } catch {
    /* keep raw string */
  }

  const title = `${groomName} & ${brideName} — Приглашение на свадьбу`;
  const description = `Приглашаем вас на нашу свадьбу ${formattedDate}. Подтвердите присутствие онлайн!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(invitation.data.heroImageUrl && {
        images: [
          {
            url: invitation.data.heroImageUrl,
            width: 1200,
            height: 630,
            alt: `${groomName} & ${brideName}`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(invitation.data.heroImageUrl && {
        images: [invitation.data.heroImageUrl],
      }),
    },
  };
}

export default async function InvitePage({ params }: PageProps) {
  const invitation = await getInvitation(params.slug);

  if (!invitation) {
    notFound();
  }

  const rsvps = await getRsvps(invitation.id);

  const props = { data: invitation.data, invitationId: invitation.id, rsvps };

  switch (invitation.template_id) {
    case "editorial-ivory":
      return <EditorialIvory {...props} />;
    case "elegant-wedding":
    default:
      return <ElegantWedding {...props} />;
  }
}
