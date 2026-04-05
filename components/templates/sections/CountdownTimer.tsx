"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  eventDate: string;
  eventTime: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(eventDate: string, eventTime: string): TimeLeft | null {
  const target = new Date(`${eventDate}T${eventTime || "12:00"}`);
  const diff = target.getTime() - Date.now();

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-4xl font-light tabular-nums md:text-6xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-xs tracking-[0.2em] uppercase text-stone-500 md:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  eventDate,
  eventTime,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft(eventDate, eventTime));

    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(eventDate, eventTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate, eventTime]);

  if (!mounted) {
    return (
      <section className="bg-stone-50 px-6 py-20 text-center md:py-28">
        <p className="font-serif text-lg text-stone-400">Загрузка...</p>
      </section>
    );
  }

  if (!timeLeft) {
    return (
      <section className="bg-stone-50 px-6 py-20 text-center md:py-28">
        <p className="font-serif text-2xl text-stone-700">
          Торжество уже началось!
        </p>
      </section>
    );
  }

  return (
    <section className="bg-stone-50 px-6 py-20 text-center md:py-28">
      <p className="mb-10 text-sm tracking-[0.3em] uppercase text-stone-400 md:text-base">
        До торжества осталось
      </p>

      <div className="mx-auto flex max-w-lg items-center justify-center gap-6 text-stone-800 md:gap-10">
        <TimeUnit value={timeLeft.days} label="Дней" />
        <span className="font-serif text-3xl font-light text-stone-300 md:text-5xl">
          :
        </span>
        <TimeUnit value={timeLeft.hours} label="Часов" />
        <span className="font-serif text-3xl font-light text-stone-300 md:text-5xl">
          :
        </span>
        <TimeUnit value={timeLeft.minutes} label="Минут" />
        <span className="font-serif text-3xl font-light text-stone-300 md:text-5xl">
          :
        </span>
        <TimeUnit value={timeLeft.seconds} label="Секунд" />
      </div>
    </section>
  );
}
