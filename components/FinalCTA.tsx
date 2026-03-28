"use client";

import { useEffect, useRef } from "react";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    el.querySelectorAll(".animate-on-scroll").forEach((child) =>
      observer.observe(child)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden bg-apple-black px-6 py-24 md:py-32"
    >
      {/* Subtle gradient accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(99,102,241,0.12),transparent_60%),radial-gradient(ellipse_at_80%_50%,rgba(168,85,247,0.1),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-landing text-center">
        <div className="animate-on-scroll mb-6">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/60">
            Начните прямо сейчас
          </span>
        </div>

        <h2 className="animate-on-scroll mb-6 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-white">
          Готовы создать
          <br />
          приглашение?
        </h2>

        <p className="animate-on-scroll mx-auto mb-12 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
          Присоединяйтесь к тысячам пользователей, которые уже создали
          стильные приглашения с ToiBer.
        </p>

        <div className="animate-on-scroll flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
          <a
            href="#hero"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-medium text-apple-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Создать приглашение
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
          >
            Начать бесплатно
          </a>
        </div>
      </div>
    </section>
  );
}
