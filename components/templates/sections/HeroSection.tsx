import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  eventDate: string;
  heroImageUrl: string;
}

export default function HeroSection({
  groomName,
  brideName,
  eventDate,
  heroImageUrl,
}: HeroSectionProps) {
  const formattedDate = (() => {
    try {
      return format(parseISO(eventDate), "d MMMM yyyy", { locale: ru });
    } catch {
      return eventDate;
    }
  })();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: heroImageUrl
            ? `url(${heroImageUrl})`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <p className="mb-4 font-serif text-lg tracking-[0.3em] uppercase opacity-90 md:text-xl">
          Приглашение на свадьбу
        </p>

        <h1 className="mb-2 font-serif text-5xl font-light leading-tight md:text-7xl lg:text-8xl">
          {groomName}
        </h1>

        <div className="my-4 flex items-center gap-4">
          <span className="h-px w-12 bg-white/60 md:w-20" />
          <span className="font-serif text-2xl italic text-white/80 md:text-3xl">
            &
          </span>
          <span className="h-px w-12 bg-white/60 md:w-20" />
        </div>

        <h1 className="mb-8 font-serif text-5xl font-light leading-tight md:text-7xl lg:text-8xl">
          {brideName}
        </h1>

        <p className="text-lg tracking-widest opacity-90 md:text-xl">
          {formattedDate}
        </p>

        <div className="absolute bottom-10 animate-bounce">
          <svg
            className="h-6 w-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
