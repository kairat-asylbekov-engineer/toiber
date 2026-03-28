"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "1",
    title: "Выберите шаблон",
    description:
      "Откройте каталог готовых шаблонов и найдите стиль, который подходит именно вам — от классики до минимализма.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
        />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Заполните данные",
    description:
      "Укажите имена, дату, место и добавьте свой текст — всё через удобный редактор, никакого кода.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Отправьте ссылку",
    description:
      "Получите уникальную ссылку и поделитесь ей с гостями — через мессенджер, соцсети или QR-код.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
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
      id="how-it-works"
      className="bg-apple-gray-light px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-landing">
        <div className="animate-on-scroll mb-4 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-apple-gray">
            Как это работает
          </span>
        </div>

        <h2 className="animate-on-scroll mb-6 text-center text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-apple-gray-dark">
          Три простых шага
        </h2>

        <p className="animate-on-scroll mx-auto mb-16 max-w-xl text-center text-lg leading-relaxed text-apple-gray md:mb-20">
          От идеи до готового приглашения — быстро и без лишних сложностей.
        </p>

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="animate-on-scroll group relative rounded-2xl bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg lg:p-10"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Step number */}
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-apple-gray-dark text-sm font-semibold text-white">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-apple-gray/20 to-transparent" />
              </div>

              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-apple-gray-light text-apple-gray-dark transition-colors duration-300 group-hover:bg-apple-gray-dark group-hover:text-white">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-apple-gray-dark">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-apple-gray">
                {step.description}
              </p>

              {/* Connector line between cards (hidden on last card and mobile) */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-apple-gray/20 md:block lg:-right-5 lg:w-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
