"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <section className="bg-stone-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center font-serif text-3xl font-light text-stone-800 md:text-4xl">
          Наша история
        </h2>
        <div className="mx-auto mb-12 h-px w-16 bg-stone-300" />

        <div className="columns-2 gap-4 md:columns-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightboxIdx(i)}
              className="group mb-4 block w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            >
              <Image
                src={src}
                alt={`Фото ${i + 1}`}
                width={600}
                height={800}
                className="w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute right-4 top-4 z-50 text-white/80 transition hover:text-white"
          >
            <X className="h-8 w-8" />
          </button>

          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIdx]}
              alt={`Фото ${lightboxIdx + 1}`}
              width={1200}
              height={1600}
              className="max-h-[90vh] w-auto rounded object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx(
                    (lightboxIdx - 1 + images.length) % images.length
                  );
                }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((lightboxIdx + 1) % images.length);
                }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
