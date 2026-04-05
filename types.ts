export interface InvitationData {
  groomName: string;
  brideName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  locationUrl: string;
  description: string;
  galleryImages: string[];
  giftInfo: string;
  heroImageUrl: string;
  dresscode?: string;
  schedule?: { time: string; title: string }[];
}

export interface Invitation {
  id: string;
  user_id: string;
  slug: string;
  template_id: string;
  data: InvitationData;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface RSVP {
  id: string;
  invitation_id: string;
  name: string;
  status: "yes" | "no";
  comment: string | null;
  created_at: string;
}
