"use client";

import { useEffect, useRef } from "react";

interface EIGiftInfoProps {
  giftInfo: string;
}

export default function EIGiftInfo({ giftInfo }: EIGiftInfoProps) {
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

  if (!giftInfo) return null;

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
      <div
        style={{
          maxWidth: "36rem",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Gift icon */}
        <svg
          aria-hidden
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ei-accent)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.7, marginBottom: "1.25rem" }}
        >
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>

        <p
          style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--ei-accent)",
            marginBottom: "0.85rem",
            fontWeight: 500,
          }}
        >
          Пожелания
        </p>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 300,
            color: "var(--ei-text)",
            margin: "0 0 0",
            lineHeight: 1.15,
          }}
        >
          Подарки
        </h2>

        <div
          aria-hidden
          style={{
            width: "2rem",
            height: "1px",
            backgroundColor: "var(--ei-accent)",
            opacity: 0.35,
            margin: "1.25rem auto 1.75rem",
          }}
        />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
            fontWeight: 400,
            color: "var(--ei-muted)",
            lineHeight: 1.75,
            whiteSpace: "pre-line",
          }}
        >
          {giftInfo}
        </p>
      </div>
    </section>
  );
}
