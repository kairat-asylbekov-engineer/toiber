import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface EventDetailsProps {
  eventDate: string;
  eventTime: string;
  location: string;
  locationUrl: string;
  description: string;
}

export default function EventDetails({
  eventDate,
  eventTime,
  location,
  locationUrl,
  description,
}: EventDetailsProps) {
  const formattedDate = (() => {
    try {
      return format(parseISO(eventDate), "d MMMM yyyy, EEEE", { locale: ru });
    } catch {
      return eventDate;
    }
  })();

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 font-serif text-3xl font-light text-stone-800 md:text-4xl">
          Детали торжества
        </h2>
        <div className="mx-auto mb-12 h-px w-16 bg-stone-300" />

        {description && (
          <p className="mb-14 font-serif text-lg leading-relaxed text-stone-600 md:text-xl">
            {description}
          </p>
        )}

        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
              <CalendarDays className="h-6 w-6 text-stone-500" />
            </div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-stone-400">
              Дата
            </h3>
            <p className="font-serif text-lg text-stone-700">{formattedDate}</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
              <Clock className="h-6 w-6 text-stone-500" />
            </div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-stone-400">
              Время
            </h3>
            <p className="font-serif text-lg text-stone-700">{eventTime}</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
              <MapPin className="h-6 w-6 text-stone-500" />
            </div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-stone-400">
              Место
            </h3>
            {locationUrl ? (
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-lg text-stone-700 underline decoration-stone-300 underline-offset-4 transition hover:text-stone-900 hover:decoration-stone-500"
              >
                {location}
              </a>
            ) : (
              <p className="font-serif text-lg text-stone-700">{location}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
