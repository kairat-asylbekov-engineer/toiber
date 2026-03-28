"use client";

import { useEffect, useRef } from "react";

const templates = [
  {
    name: "Элегант",
    category: "Свадьба",
    gradient: "from-[#f8e8d4] via-[#f5d5b8] to-[#e8c4a0]",
    accent: "#c49a6c",
    couple: "Алия & Тимур",
    date: "20 июня 2026",
  },
  {
    name: "Минимализм",
    category: "Свадьба",
    gradient: "from-[#e8e8e8] via-[#f0f0f0] to-[#ffffff]",
    accent: "#1d1d1f",
    couple: "Дана & Арман",
    date: "5 июля 2026",
  },
  {
    name: "Лаванда",
    category: "День рождения",
    gradient: "from-[#e8daf5] via-[#d4c4f0] to-[#c4b0e8]",
    accent: "#7c5cbf",
    couple: "Камила",
    date: "12 августа 2026",
  },
  {
    name: "Сакура",
    category: "Свадьба",
    gradient: "from-[#fde8ef] via-[#f8d0df] to-[#f0b8cf]",
    accent: "#d4708a",
    couple: "Аяна & Нурлан",
    date: "3 сентября 2026",
  },
  {
    name: "Изумруд",
    category: "Юбилей",
    gradient: "from-[#d4ede0] via-[#b8e0cc] to-[#98d4b8]",
    accent: "#3d8c64",
    couple: "Семья Ахметовых",
    date: "25 октября 2026",
  },
];

export default function TemplatePreview() {
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
      id="templates"
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-landing">
        <div className="animate-on-scroll mb-4 text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-apple-gray">
            Шаблоны
          </span>
        </div>

        <h2 className="animate-on-scroll mb-6 text-center text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-apple-gray-dark">
          Выберите свой стиль
        </h2>

        <p className="animate-on-scroll mx-auto mb-16 max-w-xl text-center text-lg leading-relaxed text-apple-gray md:mb-20">
          Готовые дизайны для любого события — свадьба, день рождения, юбилей.
          Просто выберите и&nbsp;настройте&nbsp;под&nbsp;себя.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-8">
          {templates.map((template, i) => (
            <div
              key={template.name}
              className="animate-on-scroll group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-black/[0.04] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                {/* Card preview */}
                <div
                  className={`relative flex aspect-[3/4] flex-col items-center justify-center bg-gradient-to-br ${template.gradient} p-6`}
                >
                  {/* Decorative corner flourishes */}
                  <div
                    className="absolute left-4 top-4 opacity-20"
                    style={{ color: template.accent }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L14 9.27L21 12L14 14.73L12 22L10 14.73L3 12L10 9.27L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div
                    className="absolute bottom-4 right-4 opacity-20"
                    style={{ color: template.accent }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L14 9.27L21 12L14 14.73L12 22L10 14.73L3 12L10 9.27L12 2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  {/* Category badge */}
                  <span
                    className="mb-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-widest"
                    style={{
                      color: template.accent,
                      backgroundColor: `${template.accent}15`,
                    }}
                  >
                    {template.category}
                  </span>

                  {/* Invitation content */}
                  <div
                    className="mb-2 h-px w-8 opacity-30"
                    style={{ backgroundColor: template.accent }}
                  />
                  <h3
                    className="mb-1 text-center text-lg font-semibold leading-snug"
                    style={{ color: template.accent }}
                  >
                    {template.couple}
                  </h3>
                  <div
                    className="mb-3 h-px w-8 opacity-30"
                    style={{ backgroundColor: template.accent }}
                  />
                  <p
                    className="text-xs opacity-60"
                    style={{ color: template.accent }}
                  >
                    {template.date}
                  </p>

                  {/* Hover overlay with CTA */}
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/50 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <a
                      href="#cta"
                      className="translate-y-3 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-apple-gray-dark shadow-lg transition-all duration-300 hover:scale-105 group-hover:translate-y-0"
                    >
                      Создать такое же
                    </a>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold text-apple-gray-dark">
                    {template.name}
                  </p>
                  <p className="text-xs text-apple-gray">{template.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
