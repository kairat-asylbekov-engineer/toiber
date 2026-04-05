import { Gift } from "lucide-react";

interface GiftInfoProps {
  giftInfo: string;
}

export default function GiftInfo({ giftInfo }: GiftInfoProps) {
  if (!giftInfo) return null;

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
          <Gift className="h-7 w-7 text-stone-500" />
        </div>

        <h2 className="mb-4 font-serif text-3xl font-light text-stone-800 md:text-4xl">
          Подарки
        </h2>
        <div className="mx-auto mb-10 h-px w-16 bg-stone-300" />

        <p className="whitespace-pre-line font-serif text-lg leading-relaxed text-stone-600">
          {giftInfo}
        </p>
      </div>
    </section>
  );
}
