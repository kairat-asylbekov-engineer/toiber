"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface EIGalleryProps {
  images: string[];
}

export default function EIGallery({ images }: EIGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ei-section--visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft" && images.length > 1)
        setLightboxIdx((i) => ((i ?? 0) - 1 + images.length) % images.length);
      if (e.key === "ArrowRight" && images.length > 1)
        setLightboxIdx((i) => ((i ?? 0) + 1) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <style>{`
        .ei-gallery__item {
          overflow: hidden;
          display: block;
          width: 100%;
          margin-bottom: 0.75rem;
          border: 1px solid var(--ei-border);
          cursor: zoom-in;
        }
        .ei-gallery__item img {
          transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: block;
          width: 100%;
          height: auto;
        }
        .ei-gallery__item:hover img,
        .ei-gallery__item:focus-visible img {
          transform: scale(1.04);
        }
        .ei-gallery__item:focus-visible {
          outline: 2px solid var(--ei-accent);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ei-gallery__item img { transition: none; }
          .ei-gallery__item:hover img { transform: none; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="ei-section"
        style={{
          padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          backgroundColor: "var(--ei-bg)",
          borderTop: "1px solid var(--ei-border)",
        }}
      >
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--ei-accent)",
                marginBottom: "1rem",
                fontWeight: 500,
              }}
            >
              Фотографии
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 300,
                color: "var(--ei-text)",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Наша история
            </h2>
            <div
              aria-hidden
              style={{
                width: "2rem",
                height: "1px",
                backgroundColor: "var(--ei-accent)",
                opacity: 0.4,
                margin: "1.25rem auto 0",
              }}
            />
          </div>

          {/* Masonry columns grid */}
          <div
            style={{
              columnCount: 2,
              columnGap: "0.75rem",
            }}
            className="ei-gallery-grid"
          >
            <style>{`
              @media (min-width: 768px) {
                .ei-gallery-grid { column-count: 3 !important; }
              }
            `}</style>
            {images.map((src, i) => (
              <button
                key={i}
                className="ei-gallery__item"
                onClick={() => setLightboxIdx(i)}
                aria-label={`Открыть фото ${i + 1}`}
                style={{
                  background: "none",
                  border: "1px solid var(--ei-border)",
                  padding: 0,
                }}
              >
                <Image
                  src={src}
                  alt={`Фото ${i + 1}`}
                  width={600}
                  height={800}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          onClick={() => setLightboxIdx(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.92)",
            padding: "1rem",
          }}
        >
          {/* Close */}
          <button
            aria-label="Закрыть"
            onClick={() => setLightboxIdx(null)}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.7)",
              padding: "0.5rem",
              lineHeight: 1,
              transition: "color 0.2s",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxHeight: "90vh",
              maxWidth: "90vw",
            }}
          >
            <Image
              src={images[lightboxIdx]}
              alt={`Фото ${lightboxIdx + 1}`}
              width={1200}
              height={1600}
              priority
              style={{
                maxHeight: "90vh",
                width: "auto",
                borderRadius: "1px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                aria-label="Предыдущее фото"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((lightboxIdx - 1 + images.length) % images.length);
                }}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "50%",
                  padding: "0.75rem",
                  cursor: "pointer",
                  color: "white",
                  backdropFilter: "blur(4px)",
                  transition: "background 0.2s",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                aria-label="Следующее фото"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((lightboxIdx + 1) % images.length);
                }}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "50%",
                  padding: "0.75rem",
                  cursor: "pointer",
                  color: "white",
                  backdropFilter: "blur(4px)",
                  transition: "background 0.2s",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
