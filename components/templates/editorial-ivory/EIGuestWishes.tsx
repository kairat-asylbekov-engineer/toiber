"use client";

import { useEffect, useRef } from "react";
import type { RSVP } from "@/types";

interface EIGuestWishesProps {
  rsvps: RSVP[];
}

export default function EIGuestWishes({ rsvps }: EIGuestWishesProps) {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const wishes = rsvps.filter((r) => r.comment && r.comment.trim().length > 0);

  if (wishes.length === 0) return null;

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
      <div style={{ maxWidth: "58rem", margin: "0 auto" }}>
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
            От гостей
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
            Пожелания
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

        {/* Wish cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 18rem), 1fr))",
            gap: "1px",
            backgroundColor: "var(--ei-border)",
            border: "1px solid var(--ei-border)",
          }}
        >
          {wishes.map((wish) => (
            <div
              key={wish.id}
              style={{
                padding: "1.75rem 1.5rem",
                backgroundColor: "var(--ei-bg)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Opening mark */}
              <span
                aria-hidden
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--ei-accent)",
                  opacity: 0.2,
                  lineHeight: 0.9,
                  display: "block",
                }}
              >
                &ldquo;
              </span>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "var(--ei-text)",
                  lineHeight: 1.7,
                  margin: 0,
                  marginTop: "-0.5rem",
                }}
              >
                {wish.comment}
              </p>
              <p
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ei-accent)",
                  fontWeight: 500,
                  margin: 0,
                  marginTop: "auto",
                  opacity: 0.75,
                }}
              >
                — {wish.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
