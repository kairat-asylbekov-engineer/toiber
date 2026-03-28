import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const siteTitle = "ToiBer — Создайте онлайн-приглашение за 5 минут";
const siteDescription =
  "Создайте стильное онлайн-приглашение без дизайнера и без кода. Выберите шаблон, заполните данные и отправьте ссылку гостям.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "онлайн приглашение",
    "приглашение на свадьбу",
    "приглашение на день рождения",
    "электронное приглашение",
    "ToiBer",
    "RSVP",
    "шаблон приглашения",
  ],
  authors: [{ name: "ToiBer" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "ru_RU",
    siteName: "ToiBer",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ToiBer",
  description: siteDescription,
  brand: { "@type": "Brand", name: "ToiBer" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "KZT",
    lowPrice: "0",
    offerCount: "3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
