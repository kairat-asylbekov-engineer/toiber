const FOOTER_LINKS = [
  {
    heading: "Продукт",
    links: [
      { label: "Шаблоны", href: "#templates" },
      { label: "Возможности", href: "#features" },
      { label: "Тарифы", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Компания",
    links: [
      { label: "О нас", href: "#" },
      { label: "Блог", href: "#" },
      { label: "Контакты", href: "#" },
    ],
  },
  {
    heading: "Поддержка",
    links: [
      { label: "Помощь", href: "#" },
      { label: "Политика конфиденциальности", href: "#" },
      { label: "Условия использования", href: "#" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-apple-gray-dark px-6 pt-16 pb-8 text-white/60">
      <div className="mx-auto max-w-landing">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand column */}
          <div>
            <a
              href="#"
              className="text-xl font-semibold text-white transition-opacity duration-200 hover:opacity-80"
            >
              ToiBer
            </a>
            <p className="mt-3 text-sm leading-relaxed">
              Создавайте стильные онлайн-приглашения за&nbsp;минуты — без
              дизайнера и&nbsp;без кода.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                {group.heading}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-center text-xs">
            &copy; {currentYear} ToiBer. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
