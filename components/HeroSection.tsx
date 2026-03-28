"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
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
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Subtle radial gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(120,119,198,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto flex max-w-landing flex-col items-center text-center">
        {/* Badge */}
        <div className="animate-on-scroll mb-6">
          <span className="inline-block rounded-full border border-apple-gray/20 bg-apple-gray-light px-4 py-1.5 text-xs font-medium tracking-wide text-apple-gray">
            Онлайн-приглашения нового поколения
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-on-scroll mb-6 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.08] tracking-tight text-apple-gray-dark">
          Создайте стильное
          <br />
          приглашение за{" "}
          <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
            5 минут
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-on-scroll mb-10 max-w-xl text-lg leading-relaxed text-apple-gray md:text-xl">
          Без дизайнера. Без кода.
          <br className="hidden sm:block" />
          Выберите шаблон и отправьте ссылку гостям.
        </p>

        {/* CTAs */}
        <div className="animate-on-scroll flex flex-col gap-4 sm:flex-row sm:gap-5">
          <a
            href="#cta"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-apple-black px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
            href="#templates"
            className="inline-flex items-center justify-center rounded-full border border-apple-gray/30 bg-white px-8 py-3.5 text-base font-medium text-apple-gray-dark transition-all duration-300 hover:border-apple-gray/60 hover:shadow-lg"
          >
            Посмотреть демо
          </a>
        </div>

        {/* Invitation mockup preview */}
        <div className="animate-on-scroll mt-16 w-full max-w-3xl sm:mt-20">
          <div className="relative rounded-2xl bg-gradient-to-b from-white to-apple-gray-light p-2 shadow-2xl ring-1 ring-black/5 sm:rounded-3xl sm:p-3">
            {/* Browser-like chrome */}
            <div className="mb-2 flex items-center gap-1.5 px-3 py-2 sm:mb-3 sm:px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-3 flex-1 rounded-md bg-apple-gray-light px-3 py-1 text-center">
                <span className="text-[11px] text-apple-gray">
                  toiber.kz/invite/preview
                </span>
              </div>
            </div>

            {/* Invitation card */}
            <div className="relative overflow-hidden rounded-xl bg-white sm:rounded-2xl">
              <div className="relative flex flex-col items-center px-6 py-12 sm:px-10 sm:py-16">
                {/* Decorative elements */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.06),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.06),transparent_50%)]" />

                <div className="absolute left-6 top-6 text-apple-gray/20 sm:left-10 sm:top-10">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M20 2L23.09 13.91L35 17L23.09 20.09L20 32L16.91 20.09L5 17L16.91 13.91L20 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="absolute bottom-6 right-6 text-apple-gray/20 sm:bottom-10 sm:right-10">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M20 2L23.09 13.91L35 17L23.09 20.09L20 32L16.91 20.09L5 17L16.91 13.91L20 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <span className="relative mb-3 text-xs uppercase tracking-[0.25em] text-apple-gray">
                  Приглашение
                </span>
                <h3 className="relative mb-2 text-2xl font-semibold text-apple-gray-dark sm:text-3xl">
                  Айгуль & Даурен
                </h3>
                <div className="relative mb-6 h-px w-12 bg-gradient-to-r from-transparent via-apple-gray/40 to-transparent" />
                <p className="relative mb-1 text-sm text-apple-gray">
                  Приглашают вас на свадьбу
                </p>
                <p className="relative text-lg font-medium text-apple-gray-dark">
                  15 июня 2026, 18:00
                </p>
                <p className="relative mt-1 text-sm text-apple-gray">
                  ресторан «Алтын», Алматы
                </p>

                <div className="relative mt-8 flex gap-3">
                  <span className="rounded-full bg-apple-black px-5 py-2 text-sm font-medium text-white">
                    Принять
                  </span>
                  <span className="rounded-full border border-apple-gray/30 px-5 py-2 text-sm font-medium text-apple-gray-dark">
                    Не смогу
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating reflection */}
          <div className="mx-auto mt-1 h-16 w-[90%] rounded-3xl bg-gradient-to-b from-black/[0.03] to-transparent blur-xl" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-apple-gray/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </section>
  );
}
