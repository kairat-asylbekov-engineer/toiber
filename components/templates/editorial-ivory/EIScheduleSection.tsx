"use client";

import { useEffect, useRef } from "react";

interface EIScheduleSectionProps {
  schedule: { time: string; title: string }[];
}

export default function EIScheduleSection({ schedule }: EIScheduleSectionProps) {
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

  if (!schedule || schedule.length === 0) return null;

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
      <div style={{ maxWidth: "36rem", margin: "0 auto" }}>
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
            Программа
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
            Расписание дня
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

        {/* Timeline */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {schedule.map((item, i) => (
            <li
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "5rem 1px 1fr",
                gap: "0 1.25rem",
                alignItems: "start",
                marginBottom: i < schedule.length - 1 ? "0" : "0",
              }}
            >
              {/* Time */}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.05rem",
                  fontWeight: 400,
                  color: "var(--ei-accent)",
                  textAlign: "right",
                  paddingTop: "0.1rem",
                  letterSpacing: "0.02em",
                }}
              >
                {item.time}
              </span>

              {/* Vertical line + dot */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "var(--ei-accent)",
                    opacity: 0.6,
                    flexShrink: 0,
                    marginTop: "0.35rem",
                    zIndex: 1,
                  }}
                />
                {i < schedule.length - 1 && (
                  <div
                    aria-hidden
                    style={{
                      width: "1px",
                      flexGrow: 1,
                      minHeight: "2.5rem",
                      backgroundColor: "var(--ei-accent)",
                      opacity: 0.15,
                    }}
                  />
                )}
              </div>

              {/* Title */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1rem, 2vw, 1.15rem)",
                  fontWeight: 400,
                  color: "var(--ei-text)",
                  margin: 0,
                  paddingTop: "0.05rem",
                  paddingBottom: i < schedule.length - 1 ? "1.75rem" : "0",
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
