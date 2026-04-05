"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

interface EIHeroSectionProps {
  groomName: string;
  brideName: string;
  eventDate: string;
  location: string;
  heroImageUrl: string;
}

export default function EIHeroSection({
  groomName,
  brideName,
  eventDate,
  location,
  heroImageUrl,
}: EIHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const formattedDate = (() => {
    try {
      return format(parseISO(eventDate), "d MMMM yyyy", { locale: ru });
    } catch {
      return eventDate;
    }
  })();

  // Trigger the mount animation by adding the visible class after paint
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      el.classList.add("ei-hero--visible");
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .ei-hero {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .ei-hero--visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .ei-hero {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        .ei-hero__names {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .ei-hero__meta {
          font-family: 'Jost', system-ui, sans-serif;
        }

        .ei-hero__divider-line {
          flex: 1;
          height: 1px;
          background-color: var(--ei-accent);
          opacity: 0.4;
        }

        .ei-hero__divider-diamond {
          width: 6px;
          height: 6px;
          background-color: var(--ei-accent);
          transform: rotate(45deg);
          opacity: 0.5;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ei-hero"
        style={{
          backgroundColor: "var(--ei-bg)",
          color: "var(--ei-text)",
          minHeight: "100svh",
          display: "grid",
          gridTemplateColumns: "1fr",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Photo panel — decorative side stripe on md+ */}
        {heroImageUrl && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
          >
            <Image
              src={heroImageUrl}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
            {/* Ivory gradient overlay so text stays readable */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, var(--ei-bg) 0%, var(--ei-bg) 40%, rgba(250,248,245,0.85) 65%, rgba(250,248,245,0.4) 100%)",
              }}
            />
          </div>
        )}

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "clamp(3rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
            maxWidth: "56rem",
          }}
        >
          {/* Eyebrow label */}
          <p
            className="ei-hero__meta"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--ei-accent)",
              marginBottom: "2.5rem",
              fontWeight: 500,
            }}
          >
            Приглашение на свадьбу
          </p>

          {/* Names */}
          <h1
            className="ei-hero__names"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {groomName}
          </h1>

          {/* Divider with ampersand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "1.25rem 0",
              width: "clamp(12rem, 30vw, 22rem)",
            }}
          >
            <span className="ei-hero__divider-line" />
            <span
              className="ei-hero__names"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontStyle: "italic",
                color: "var(--ei-accent)",
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              &amp;
            </span>
            <span className="ei-hero__divider-line" />
          </div>

          <h1
            className="ei-hero__names"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {brideName}
          </h1>

          {/* Date + location row */}
          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <span
              className="ei-hero__divider-diamond"
              aria-hidden
            />
            <p
              className="ei-hero__meta"
              style={{
                fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ei-muted)",
                fontWeight: 300,
                margin: 0,
              }}
            >
              {formattedDate}
            </p>
            {location && (
              <>
                <span
                  style={{
                    width: "1px",
                    height: "1em",
                    backgroundColor: "var(--ei-border)",
                    display: "inline-block",
                    opacity: 0.8,
                  }}
                  aria-hidden
                />
                <p
                  className="ei-hero__meta"
                  style={{
                    fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ei-muted)",
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {location}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span
            className="ei-hero__meta"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--ei-muted)",
              opacity: 0.6,
            }}
          >
            scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            style={{ color: "var(--ei-accent)", opacity: 0.5 }}
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle cx="8" cy="7" r="2" fill="currentColor" />
          </svg>
        </div>
      </section>
    </>
  );
}
