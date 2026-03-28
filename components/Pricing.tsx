"use client";

import { useEffect, useRef } from "react";

const plans = [
  {
    name: "Бесплатно",
    price: "0",
    currency: "₸",
    period: "",
    description: "Для тех, кто хочет попробовать",
    features: [
      "1 приглашение",
      "3 базовых шаблона",
      "RSVP до 30 гостей",
      "Ссылка для отправки",
      "Мобильная версия",
    ],
    cta: "Начать бесплатно",
    highlighted: false,
  },
  {
    name: "Стандарт",
    price: "2 990",
    currency: "₸",
    period: "разовая оплата",
    description: "Всё для идеального события",
    features: [
      "1 приглашение",
      "Все шаблоны",
      "RSVP без ограничений",
      "Галерея фотографий",
      "Таймер обратного отсчёта",
      "Локация и карта",
      "Пожелания гостей",
    ],
    cta: "Выбрать Стандарт",
    highlighted: true,
  },
  {
    name: "Премиум",
    price: "5 990",
    currency: "₸",
    period: "разовая оплата",
    description: "Максимум возможностей",
    features: [
      "До 3 приглашений",
      "Все шаблоны + эксклюзивные",
      "RSVP без ограничений",
      "Галерея + видео",
      "Таймер обратного отсчёта",
      "Локация и карта",
      "Подарки и вишлист",
      "Пожелания гостей",
      "Приоритетная поддержка",
    ],
    cta: "Выбрать Премиум",
    highlighted: false,
  },
];

export default function Pricing() {
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
    <section ref={sectionRef} id="pricing" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-landing">
        <div className="animate-on-scroll mb-4 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-apple-gray">
            Тарифы
          </span>
        </div>

        <h2 className="animate-on-scroll mb-6 text-center text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-apple-gray-dark">
          Выберите подходящий план
        </h2>

        <p className="animate-on-scroll mx-auto mb-16 max-w-xl text-center text-lg leading-relaxed text-apple-gray md:mb-20">
          Начните бесплатно или выберите план с расширенными возможностями для
          вашего события.
        </p>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`animate-on-scroll relative flex flex-col rounded-2xl p-8 transition-all duration-500 lg:p-10 ${
                plan.highlighted
                  ? "scale-[1.02] border-2 border-apple-gray-dark bg-white shadow-xl md:scale-105"
                  : "border border-black/[0.06] bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-apple-gray-dark px-4 py-1 text-xs font-medium text-white">
                  Популярный
                </span>
              )}

              <h3 className="mb-2 text-xl font-semibold tracking-tight text-apple-gray-dark">
                {plan.name}
              </h3>
              <p className="mb-6 text-sm text-apple-gray">{plan.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-semibold tracking-tight text-apple-gray-dark">
                  {plan.price}
                </span>
                <span className="ml-1 text-lg text-apple-gray">
                  {plan.currency}
                </span>
                {plan.period && (
                  <p className="mt-1 text-xs text-apple-gray">{plan.period}</p>
                )}
              </div>

              <ul className="mb-10 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-apple-gray-dark"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-apple-gray-dark">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-apple-black text-white hover:scale-105 hover:shadow-lg"
                    : "border border-apple-gray/30 text-apple-gray-dark hover:border-apple-gray-dark hover:bg-apple-gray-dark hover:text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
