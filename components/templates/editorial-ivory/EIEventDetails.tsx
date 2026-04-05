"use client";

import { useEffect, useRef } from "react";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

interface EIEventDetailsProps {
  eventDate: string;
  eventTime: string;
  location: string;
  locationUrl: string;
}

function EIDetailCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.85rem",
        padding: "2rem 1.5rem",
        border: "1px solid var(--ei-border)",
        borderRadius: "2px",
        backgroundColor: "rgba(250,248,245,0.6)",
      }}
    >
      <div
        style={{
          width: "2.5rem",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ei-accent)",
          opacity: 0.8,
        }}
      >
        {icon}
      </div>
      <p
        style={{
          fontFamily: "'Jost', system-ui, sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--ei-muted)",
          fontWeight: 500,
          margin: 0,
        }}
      >
        {label}
      </p>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          fontWeight: 400,
          color: "var(--ei-text)",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function EIEventDetails({
  eventDate,
  eventTime,
  location,
  locationUrl,
}: EIEventDetailsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const formattedDate = (() => {
    try {
      return format(parseISO(eventDate), "d MMMM yyyy, EEEE", { locale: ru });
    } catch {
      return eventDate;
    }
  })();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ei-section--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ei-section"
      style={{
        padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
        backgroundColor: "var(--ei-bg)",
        borderTop: "1px solid var(--ei-border)",
      }}
    >
      <div style={{ maxWidth: "50rem", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--ei-accent)",
              marginBottom: "1rem",
              fontWeight: 500,
            }}
          >
            Когда и где
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 300,
              color: "var(--ei-text)",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Детали торжества
          </h2>
          <div
            aria-hidden
            style={{
              width: "2rem",
              height: "1px",
              backgroundColor: "var(--ei-accent)",
              opacity: 0.4,
              margin: "1.25rem auto 0",
            }}
          />
        </div>

        {/* Detail cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
            gap: "1px",
            backgroundColor: "var(--ei-border)",
            border: "1px solid var(--ei-border)",
          }}
        >
          <EIDetailCard
            label="Дата"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          >
            {formattedDate}
          </EIDetailCard>

          <EIDetailCard
            label="Время"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15.5 15.5" />
              </svg>
            }
          >
            {eventTime}
          </EIDetailCard>

          <EIDetailCard
            label="Место"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            }
          >
            {location}
          </EIDetailCard>
        </div>

        {/* Map button */}
        {locationUrl && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <a
              href={locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ei-accent)",
                textDecoration: "none",
                borderBottom: "1px solid currentColor",
                paddingBottom: "0.15rem",
                opacity: 0.85,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              Открыть на карте
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
