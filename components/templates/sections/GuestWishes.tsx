import { MessageCircle } from "lucide-react";
import type { RSVP } from "@/types";

interface GuestWishesProps {
  rsvps: RSVP[];
}

export default function GuestWishes({ rsvps }: GuestWishesProps) {
  const wishes = rsvps.filter((r) => r.comment && r.comment.trim().length > 0);

  if (wishes.length === 0) return null;

  return (
    <section className="bg-stone-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <MessageCircle className="h-7 w-7 text-stone-500" />
          </div>
          <h2 className="mb-4 font-serif text-3xl font-light text-stone-800 md:text-4xl">
            Пожелания гостей
          </h2>
          <div className="mx-auto h-px w-16 bg-stone-300" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <p className="mb-4 font-serif text-base leading-relaxed text-stone-600 italic">
                &ldquo;{wish.comment}&rdquo;
              </p>
              <p className="text-sm font-medium text-stone-800">
                — {wish.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
