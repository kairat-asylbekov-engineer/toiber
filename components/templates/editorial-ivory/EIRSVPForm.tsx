"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { submitRSVP } from "@/app/actions/rsvp";

interface EIRSVPFormProps {
  invitationId: string;
}

export default function EIRSVPForm({ invitationId }: EIRSVPFormProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

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

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await submitRSVP(formData);
      if (result?.error) {
        setError(result.error);
        setShake(true);
        setTimeout(() => setShake(false), 600);
      } else {
        setSubmitted(true);
      }
    });
  }

  return (
    <>
      <style>{`
        @keyframes ei-shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-6px); }
          30%       { transform: translateX(6px); }
          45%       { transform: translateX(-4px); }
          60%       { transform: translateX(4px); }
          75%       { transform: translateX(-2px); }
          90%       { transform: translateX(2px); }
        }
        .ei-rsvp__form--shake {
          animation: ei-shake 0.55s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .ei-rsvp__form--shake { animation: none; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .ei-rsvp__input {
          width: 100%;
          border: 1px solid var(--ei-border);
          background: rgba(250,248,245,0.5);
          padding: 0.85rem 1rem;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.05rem;
          color: var(--ei-text);
          outline: none;
          transition: border-color 0.2s ease;
          border-radius: 0;
          box-sizing: border-box;
        }
        .ei-rsvp__input::placeholder {
          color: var(--ei-muted);
          opacity: 0.55;
        }
        .ei-rsvp__input:focus {
          border-color: var(--ei-accent);
        }

        .ei-rsvp__radio-label {
          cursor: pointer;
          display: block;
        }
        .ei-rsvp__radio-label input { position: absolute; opacity: 0; width: 0; height: 0; }
        .ei-rsvp__radio-box {
          border: 1px solid var(--ei-border);
          padding: 0.8rem 1rem;
          text-align: center;
          font-family: 'Jost', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ei-muted);
          transition: border-color 0.2s, color 0.2s, background-color 0.2s;
        }
        .ei-rsvp__radio-label input:checked + .ei-rsvp__radio-box {
          border-color: var(--ei-accent);
          color: var(--ei-accent);
          background-color: rgba(184, 92, 74, 0.05);
        }
        .ei-rsvp__radio-label:hover .ei-rsvp__radio-box {
          border-color: rgba(184,92,74,0.4);
        }

        .ei-rsvp__btn {
          width: 100%;
          padding: 0.9rem 1rem;
          background-color: var(--ei-accent);
          color: #FAF8F5;
          border: none;
          cursor: pointer;
          font-family: 'Jost', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          transition: opacity 0.2s, transform 0.12s;
          border-radius: 0;
        }
        .ei-rsvp__btn:hover:not(:disabled) { opacity: 0.88; }
        .ei-rsvp__btn:active:not(:disabled) { transform: scale(0.985); }
        .ei-rsvp__btn:disabled { opacity: 0.55; cursor: not-allowed; }
      `}</style>

      <section
        ref={sectionRef}
        id="rsvp"
        className="ei-section"
        style={{
          padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          backgroundColor: "var(--ei-bg)",
          borderTop: "1px solid var(--ei-border)",
        }}
      >
        <div style={{ maxWidth: "28rem", margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
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
              Ответ гостя
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
              {submitted ? "Спасибо!" : "Подтвердите присутствие"}
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

          {submitted ? (
            /* Success state */
            <div style={{ textAlign: "center", paddingTop: "1rem" }}>
              <div
                aria-hidden
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  border: "1px solid var(--ei-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  opacity: 0.7,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ei-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  color: "var(--ei-muted)",
                  lineHeight: 1.6,
                }}
              >
                Ваш ответ получен. Будем рады видеть вас!
              </p>
            </div>
          ) : (
            /* Form */
            <form
              ref={formRef}
              action={handleSubmit}
              className={shake ? "ei-rsvp__form--shake" : ""}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              <input type="hidden" name="invitationId" value={invitationId} />

              {/* Name */}
              <div>
                <label
                  htmlFor="ei-rsvp-name"
                  style={{
                    display: "block",
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--ei-muted)",
                    fontWeight: 500,
                    marginBottom: "0.5rem",
                  }}
                >
                  Ваше имя
                </label>
                <input
                  id="ei-rsvp-name"
                  name="name"
                  type="text"
                  required
                  className="ei-rsvp__input"
                  placeholder="Имя и фамилия"
                />
              </div>

              {/* Attendance */}
              <div>
                <p
                  style={{
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--ei-muted)",
                    fontWeight: 500,
                    marginBottom: "0.5rem",
                  }}
                >
                  Вы придёте?
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <label className="ei-rsvp__radio-label">
                    <input type="radio" name="status" value="yes" defaultChecked />
                    <span className="ei-rsvp__radio-box">Да, приду</span>
                  </label>
                  <label className="ei-rsvp__radio-label">
                    <input type="radio" name="status" value="no" />
                    <span className="ei-rsvp__radio-box">Не смогу</span>
                  </label>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label
                  htmlFor="ei-rsvp-comment"
                  style={{
                    display: "block",
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--ei-muted)",
                    fontWeight: 500,
                    marginBottom: "0.5rem",
                  }}
                >
                  Пожелание{" "}
                  <span style={{ opacity: 0.5, textTransform: "none", letterSpacing: 0, fontStyle: "italic" }}>
                    (необязательно)
                  </span>
                </label>
                <textarea
                  id="ei-rsvp-comment"
                  name="comment"
                  rows={3}
                  className="ei-rsvp__input"
                  placeholder="Напишите пожелание молодожёнам..."
                  style={{ resize: "none" }}
                />
              </div>

              {/* Error message */}
              {error && (
                <p
                  role="alert"
                  style={{
                    fontFamily: "'Jost', system-ui, sans-serif",
                    fontSize: "0.78rem",
                    color: "var(--ei-accent)",
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button type="submit" disabled={isPending} className="ei-rsvp__btn">
                {isPending ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: "0.85rem",
                      height: "0.85rem",
                      borderRadius: "50%",
                      border: "1.5px solid rgba(250,248,245,0.3)",
                      borderTopColor: "#FAF8F5",
                      animation: "spin 0.7s linear infinite",
                      verticalAlign: "middle",
                    }}
                  />
                ) : (
                  "Отправить"
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
