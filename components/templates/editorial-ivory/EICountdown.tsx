"use client";

import { useEffect, useRef, useState } from "react";

interface EICountdownProps {
  eventDate: string;
  eventTime: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(eventDate: string, eventTime: string): TimeLeft | null {
  const target = new Date(`${eventDate}T${eventTime || "12:00"}`);
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function EITimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 300,
          lineHeight: 1,
          color: "var(--ei-text)",
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.01em",
        }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span
        style={{
          fontFamily: "'Jost', system-ui, sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--ei-muted)",
          fontWeight: 400,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function EICountdown({ eventDate, eventTime }: EICountdownProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft(eventDate, eventTime));
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(eventDate, eventTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate, eventTime]);

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

  return (
    <>
      <style>{`
        .ei-section {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ei-section--visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .ei-section {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ei-section"
        style={{
          backgroundColor: "var(--ei-bg)",
          borderTop: "1px solid var(--ei-border)",
          borderBottom: "1px solid var(--ei-border)",
          padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          textAlign: "center",
        }}
      >
        {!mounted ? (
          <p
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: "0.85rem",
              color: "var(--ei-muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Загрузка...
          </p>
        ) : !timeLeft ? (
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 300,
              color: "var(--ei-text)",
            }}
          >
            Торжество уже началось!
          </p>
        ) : (
          <>
            <p
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--ei-accent)",
                marginBottom: "2.5rem",
                fontWeight: 500,
              }}
            >
              До торжества осталось
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(1rem, 3vw, 2.5rem)",
              }}
            >
              <EITimeUnit value={timeLeft.days} label="Дней" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  color: "var(--ei-accent)",
                  opacity: 0.4,
                  lineHeight: 1,
                  alignSelf: "flex-start",
                  paddingTop: "0.25rem",
                }}
                aria-hidden
              >
                ·
              </span>
              <EITimeUnit value={timeLeft.hours} label="Часов" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  color: "var(--ei-accent)",
                  opacity: 0.4,
                  lineHeight: 1,
                  alignSelf: "flex-start",
                  paddingTop: "0.25rem",
                }}
                aria-hidden
              >
                ·
              </span>
              <EITimeUnit value={timeLeft.minutes} label="Минут" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  color: "var(--ei-accent)",
                  opacity: 0.4,
                  lineHeight: 1,
                  alignSelf: "flex-start",
                  paddingTop: "0.25rem",
                }}
                aria-hidden
              >
                ·
              </span>
              <EITimeUnit value={timeLeft.seconds} label="Секунд" />
            </div>
          </>
        )}
      </section>
    </>
  );
}
