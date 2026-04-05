"use client";

import { useState, useTransition } from "react";
import { submitRSVP } from "@/app/actions/rsvp";
import { Send, CheckCircle } from "lucide-react";

interface RSVPFormProps {
  invitationId: string;
}

export default function RSVPForm({ invitationId }: RSVPFormProps) {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await submitRSVP(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    });
  }

  if (submitted) {
    return (
      <section id="rsvp" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-3 font-serif text-3xl font-light text-stone-800">
            Спасибо!
          </h2>
          <p className="text-stone-500">
            Ваш ответ получен. Будем рады видеть вас!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-md">
        <div className="mb-10 text-center">
          <h2 className="mb-4 font-serif text-3xl font-light text-stone-800 md:text-4xl">
            Подтвердите присутствие
          </h2>
          <div className="mx-auto mb-6 h-px w-16 bg-stone-300" />
          <p className="text-stone-500">
            Пожалуйста, сообщите нам, сможете ли вы прийти
          </p>
        </div>

        <form action={handleSubmit} className="space-y-5">
          <input type="hidden" name="invitationId" value={invitationId} />

          <div>
            <label
              htmlFor="rsvp-name"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              Ваше имя
            </label>
            <input
              id="rsvp-name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-400 transition focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
              placeholder="Имя и фамилия"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-700">
              Вы придёте?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="yes"
                  defaultChecked
                  className="peer sr-only"
                />
                <div className="rounded-lg border border-stone-200 px-4 py-3 text-center transition peer-checked:border-stone-800 peer-checked:bg-stone-800 peer-checked:text-white group-hover:border-stone-300">
                  Да, приду
                </div>
              </label>
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="no"
                  className="peer sr-only"
                />
                <div className="rounded-lg border border-stone-200 px-4 py-3 text-center transition peer-checked:border-stone-800 peer-checked:bg-stone-800 peer-checked:text-white group-hover:border-stone-300">
                  Не смогу
                </div>
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="rsvp-comment"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              Пожелание{" "}
              <span className="font-normal text-stone-400">(необязательно)</span>
            </label>
            <textarea
              id="rsvp-comment"
              name="comment"
              rows={3}
              className="w-full resize-none rounded-lg border border-stone-200 bg-white px-4 py-3 text-stone-800 placeholder:text-stone-400 transition focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
              placeholder="Напишите пожелание молодожёнам..."
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-800 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-50"
          >
            {isPending ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isPending ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </section>
  );
}
