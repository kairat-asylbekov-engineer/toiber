"use client";

import { useEffect, useRef } from "react";

interface EIDresscodeSectionProps {
  dresscode: string;
}

export default function EIDresscodeSection({ dresscode }: EIDresscodeSectionProps) {
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

  if (!dresscode) return null;

  return (
    <section
      ref={sectionRef}
      className="ei-section"
      style={{
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
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
        {/* Hanger icon */}
        <svg
          aria-hidden
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ei-accent)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.7, marginBottom: "1.25rem" }}
        >
          <path d="M20.38 18H3.62a1 1 0 0 1-.61-1.78l8.02-5.82a1 1 0 0 0 0-1.6L9.5 7.5" />
          <path d="M12 3a2 2 0 0 1 2 2v.5a2 2 0 0 1-2 2" />
          <circle cx="12" cy="3" r="1" />
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
          Стиль вечера
        </p>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 300,
            color: "var(--ei-text)",
            margin: "0 0 1.5rem",
            lineHeight: 1.15,
          }}
        >
          Дресс-код
        </h2>

        <div
          aria-hidden
          style={{
            width: "2rem",
            height: "1px",
            backgroundColor: "var(--ei-accent)",
            opacity: 0.35,
            margin: "0 auto 1.75rem",
          }}
        />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--ei-muted)",
            lineHeight: 1.7,
            whiteSpace: "pre-line",
          }}
        >
          {dresscode}
        </p>
      </div>
    </section>
  );
}
