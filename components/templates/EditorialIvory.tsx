import type { InvitationData, RSVP } from "@/types";
import EIHeroSection from "./editorial-ivory/EIHeroSection";
import EICountdown from "./editorial-ivory/EICountdown";
import EIInvitationText from "./editorial-ivory/EIInvitationText";
import EIEventDetails from "./editorial-ivory/EIEventDetails";
import EIScheduleSection from "./editorial-ivory/EIScheduleSection";
import EIDresscodeSection from "./editorial-ivory/EIDresscodeSection";
import EIGallery from "./editorial-ivory/EIGallery";
import EIGiftInfo from "./editorial-ivory/EIGiftInfo";
import EIGuestWishes from "./editorial-ivory/EIGuestWishes";
import EIRSVPForm from "./editorial-ivory/EIRSVPForm";

interface EditorialIvoryProps {
  data: InvitationData;
  invitationId: string;
  rsvps: RSVP[];
}

export default function EditorialIvory({
  data,
  invitationId,
  rsvps,
}: EditorialIvoryProps) {
  return (
    <div
      style={
        {
          "--ei-bg": "#FAF8F5",
          "--ei-text": "#2C2A26",
          "--ei-muted": "#6B6560",
          "--ei-accent": "#B85C4A",
          "--ei-border": "rgba(0,0,0,0.06)",
        } as React.CSSProperties
      }
    >
      <main>
        <EIHeroSection
          groomName={data.groomName}
          brideName={data.brideName}
          eventDate={data.eventDate}
          location={data.location}
          heroImageUrl={data.heroImageUrl}
        />

        <EICountdown eventDate={data.eventDate} eventTime={data.eventTime} />

        <EIInvitationText description={data.description} />

        <EIEventDetails
          eventDate={data.eventDate}
          eventTime={data.eventTime}
          location={data.location}
          locationUrl={data.locationUrl}
        />

        {data.schedule && data.schedule.length > 0 && (
          <EIScheduleSection schedule={data.schedule} />
        )}

        {data.dresscode && <EIDresscodeSection dresscode={data.dresscode} />}

        <EIGallery images={data.galleryImages} />

        <EIGiftInfo giftInfo={data.giftInfo} />

        <EIGuestWishes rsvps={rsvps} />

        <EIRSVPForm invitationId={invitationId} />

        <footer
          style={{
            borderTop: "1px solid var(--ei-border)",
            padding: "2.5rem clamp(1.5rem, 5vw, 4rem)",
            textAlign: "center",
            backgroundColor: "var(--ei-bg)",
          }}
        >
          <p
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ei-muted)",
              opacity: 0.6,
              margin: 0,
            }}
          >
            Создано с любовью на{" "}
            <a
              href="/"
              style={{
                color: "var(--ei-accent)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                transition: "opacity 0.2s",
                opacity: 0.85,
              }}
            >
              ToiBer
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
