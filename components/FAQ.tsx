"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    question: "Сколько времени занимает создание приглашения?",
    answer:
      "Создание приглашения занимает не более 5 минут. Выберите шаблон, заполните информацию о событии и отправьте ссылку гостям — всё просто и быстро.",
  },
  {
    question: "Нужны ли навыки дизайна или программирования?",
    answer:
      "Нет, абсолютно никаких специальных навыков не требуется. Все шаблоны уже готовы — вам остаётся лишь вписать свои данные. Интерфейс интуитивно понятен.",
  },
  {
    question: "Как гости получат приглашение?",
    answer:
      "Вы получите уникальную ссылку, которую можно отправить через любой мессенджер, соцсеть или по электронной почте. Гостям не нужно ничего скачивать — приглашение откроется в браузере.",
  },
  {
    question: "Можно ли отслеживать, кто подтвердил участие?",
    answer:
      "Да, функция RSVP позволяет гостям подтвердить или отклонить участие прямо в приглашении. Все ответы собираются в вашем личном кабинете в реальном времени.",
  },
  {
    question: "Есть ли бесплатный тариф?",
    answer:
      "Да, у нас есть бесплатный тариф, который включает базовые шаблоны и основные функции. Для расширенных возможностей — галереи, таймера, карты — доступны платные тарифы.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className="animate-on-scroll border-b border-black/[0.08]"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left transition-colors duration-200 hover:text-apple-gray-dark/70 md:py-7"
        aria-expanded={isOpen}
      >
        <span className="pr-8 text-lg font-semibold tracking-tight text-apple-gray-dark md:text-xl">
          {question}
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center text-apple-gray transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-base leading-relaxed text-apple-gray md:pb-7 md:pr-16">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      id="faq"
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-landing">
        <div className="animate-on-scroll mb-4 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-apple-gray">
            Вопросы и ответы
          </span>
        </div>

        <h2 className="animate-on-scroll mb-6 text-center text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-apple-gray-dark">
          Частые вопросы
        </h2>

        <p className="animate-on-scroll mx-auto mb-16 max-w-xl text-center text-lg leading-relaxed text-apple-gray md:mb-20">
          Ответы на самые популярные вопросы о ToiBer.
          Не нашли ответ? Напишите нам.
        </p>

        <div className="mx-auto max-w-3xl">
          <div className="border-t border-black/[0.08]">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
