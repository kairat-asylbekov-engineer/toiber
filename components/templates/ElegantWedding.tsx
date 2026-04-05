import type { InvitationData, RSVP } from "@/types";
import HeroSection from "./sections/HeroSection";
import CountdownTimer from "./sections/CountdownTimer";
import EventDetails from "./sections/EventDetails";
import Gallery from "./sections/Gallery";
import GiftInfo from "./sections/GiftInfo";
import GuestWishes from "./sections/GuestWishes";
import RSVPForm from "./sections/RSVPForm";

interface ElegantWeddingProps {
  data: InvitationData;
  invitationId: string;
  rsvps: RSVP[];
}

export default function ElegantWedding({
  data,
  invitationId,
  rsvps,
}: ElegantWeddingProps) {
  return (
    <main className="min-h-screen bg-white font-serif">
      <HeroSection
        groomName={data.groomName}
        brideName={data.brideName}
        eventDate={data.eventDate}
        heroImageUrl={data.heroImageUrl}
      />

      <CountdownTimer
        eventDate={data.eventDate}
        eventTime={data.eventTime}
      />

      <EventDetails
        eventDate={data.eventDate}
        eventTime={data.eventTime}
        location={data.location}
        locationUrl={data.locationUrl}
        description={data.description}
      />

      <Gallery images={data.galleryImages} />

      <GiftInfo giftInfo={data.giftInfo} />

      <GuestWishes rsvps={rsvps} />

      <RSVPForm invitationId={invitationId} />

      <footer className="border-t border-stone-100 px-6 py-10 text-center">
        <p className="text-xs tracking-widest text-stone-400">
          Создано с любовью на{" "}
          <a
            href="/"
            className="underline underline-offset-2 transition hover:text-stone-600"
          >
            ToiBer
          </a>
        </p>
      </footer>
    </main>
  );
}
