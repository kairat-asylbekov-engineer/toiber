"use client";

import { useEffect, useRef } from "react";

interface EIInvitationTextProps {
  description: string;
}

export default function EIInvitationText({ description }: EIInvitationTextProps) {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!description) return null;

  return (
    <section
      ref={sectionRef}
      className="ei-section"
      style={{
        padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
        textAlign: "center",
        backgroundColor: "var(--ei-bg)",
      }}
    >
      <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
        {/* Decorative opening quote */}
        <p
          aria-hidden
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--ei-accent)",
            opacity: 0.25,
            lineHeight: 0.8,
            marginBottom: "1rem",
            display: "block",
          }}
        >
          &ldquo;
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.75,
            color: "var(--ei-text)",
            whiteSpace: "pre-line",
          }}
        >
          {description}
        </p>

        {/* Decorative closing ornament */}
        <div
          aria-hidden
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginTop: "2.5rem",
          }}
        >
          <span
            style={{
              display: "block",
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--ei-accent)",
              opacity: 0.3,
            }}
          />
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="var(--ei-accent)"
            style={{ opacity: 0.4 }}
          >
            <polygon points="5,0 6.5,3.5 10,5 6.5,6.5 5,10 3.5,6.5 0,5 3.5,3.5" />
          </svg>
          <span
            style={{
              display: "block",
              width: "2.5rem",
              height: "1px",
              backgroundColor: "var(--ei-accent)",
              opacity: 0.3,
            }}
          />
        </div>
      </div>
    </section>
  );
}
