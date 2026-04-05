"use client";

import { useState, useTransition, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Upload,
  X,
  Image as ImageIcon,
  Sparkles,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import type { InvitationData, Invitation } from "@/types";
import { createInvitation, updateInvitation, uploadImage } from "@/app/actions/invitation";
import LivePreview from "./LivePreview";

interface InvitationFormProps {
  existing?: Invitation | null;
}

const STEPS = [
  { id: 1, label: "Шаблон" },
  { id: 2, label: "Данные" },
  { id: 3, label: "Фото" },
  { id: 4, label: "Ссылка" },
];

const defaultData: InvitationData = {
  groomName: "",
  brideName: "",
  eventDate: "",
  eventTime: "",
  location: "",
  locationUrl: "",
  description: "",
  galleryImages: [],
  giftInfo: "",
  heroImageUrl: "",
};

export default function InvitationForm({ existing }: InvitationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(existing ? 2 : 1);
  const [templateId, setTemplateId] = useState(existing?.template_id ?? "elegant-wedding");
  const [data, setData] = useState<InvitationData>(existing?.data ?? defaultData);
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!existing;

  const updateField = useCallback(
    <K extends keyof InvitationData>(key: K, value: InvitationData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  async function handleImageUpload(
    file: File,
    target: "hero" | "gallery"
  ) {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImage(formData);

    if (result.error) {
      setError(result.error);
      setUploading(false);
      return;
    }

    if (result.url) {
      if (target === "hero") {
        updateField("heroImageUrl", result.url);
      } else {
        setData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, result.url!],
        }));
      }
    }

    setUploading(false);
  }

  function removeGalleryImage(idx: number) {
    setData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== idx),
    }));
  }

  function generateSlugFromNames() {
    const base = `${data.groomName}-${data.brideName}`
      .toLowerCase()
      .replace(/[^a-z0-9а-яё-]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(base);
  }

  function canProceed(): boolean {
    if (step === 1) return !!templateId;
    if (step === 2) {
      return !!(
        data.groomName.trim() &&
        data.brideName.trim() &&
        data.eventDate &&
        data.eventTime &&
        data.location.trim()
      );
    }
    return true;
  }

  function handleNext() {
    if (step < 4) setStep(step + 1);
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  function handleSubmit() {
    setError(null);

    startTransition(async () => {
      if (isEdit && existing) {
        const result = await updateInvitation(existing.id, data, slug || undefined);
        if (result.error) {
          setError(result.error);
          return;
        }
        router.push("/dashboard");
        router.refresh();
      } else {
        const result = await createInvitation(data, templateId, slug);
        if (result.error) {
          setError(result.error);
          return;
        }
        router.push("/dashboard");
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 min-w-0">
        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-1">
          {STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                if (s.id <= step || (s.id === step + 1 && canProceed())) {
                  setStep(s.id);
                }
              }}
              className="flex items-center gap-1"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  s.id === step
                    ? "bg-apple-gray-dark text-white"
                    : s.id < step
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-apple-gray"
                }`}
              >
                {s.id < step ? <Check className="h-4 w-4" /> : s.id}
              </span>
              <span
                className={`hidden text-xs font-medium sm:inline ${
                  s.id === step ? "text-apple-gray-dark" : "text-apple-gray"
                }`}
              >
                {s.label}
              </span>
              {s.id < STEPS.length && (
                <span className="mx-2 h-px w-6 bg-gray-200 sm:w-10" />
              )}
            </button>
          ))}
        </div>

        {/* Step 1: Template */}
        {step === 1 && (
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold text-apple-gray-dark">
              Выберите шаблон
            </h2>
            <p className="mb-6 text-sm text-apple-gray">
              Выберите стиль своего приглашения
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <button
                onClick={() => setTemplateId("elegant-wedding")}
                className={`group relative overflow-hidden rounded-xl border-2 p-4 text-left transition ${
                  templateId === "elegant-wedding"
                    ? "border-apple-gray-dark shadow-md"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-stone-100 to-stone-200">
                  <Sparkles className="h-8 w-8 text-stone-400" />
                </div>
                <h3 className="text-sm font-semibold text-apple-gray-dark">
                  Elegant Wedding
                </h3>
                <p className="mt-0.5 text-xs text-apple-gray">
                  Классический элегантный дизайн
                </p>
                {templateId === "elegant-wedding" && (
                  <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-apple-gray-dark">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setTemplateId("editorial-ivory")}
                className={`group relative overflow-hidden rounded-xl border-2 p-4 text-left transition ${
                  templateId === "editorial-ivory"
                    ? "border-[#B85C4A] shadow-md"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-[#FAF8F5] to-[#F0EBE3]">
                  <span className="font-serif text-2xl tracking-wide text-[#B85C4A]">E&nbsp;I</span>
                </div>
                <h3 className="text-sm font-semibold text-apple-gray-dark">
                  Editorial Ivory
                </h3>
                <p className="mt-0.5 text-xs text-apple-gray">
                  Редакционный стиль, кремовая палитра
                </p>
                {templateId === "editorial-ivory" && (
                  <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#B85C4A]">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Data */}
        {step === 2 && (
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold text-apple-gray-dark">
              Заполните данные
            </h2>
            <p className="mb-6 text-sm text-apple-gray">
              Эти данные будут отображаться на приглашении
            </p>

            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                    Имя жениха <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.groomName}
                    onChange={(e) => updateField("groomName", e.target.value)}
                    placeholder="Азамат"
                    className="w-full rounded-lg border border-gray-200 bg-apple-gray-light px-4 py-2.5 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                    Имя невесты <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.brideName}
                    onChange={(e) => updateField("brideName", e.target.value)}
                    placeholder="Алина"
                    className="w-full rounded-lg border border-gray-200 bg-apple-gray-light px-4 py-2.5 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                    Дата события <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={data.eventDate}
                    onChange={(e) => updateField("eventDate", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-apple-gray-light px-4 py-2.5 text-sm text-apple-gray-dark focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                    Время <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    value={data.eventTime}
                    onChange={(e) => updateField("eventTime", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-apple-gray-light px-4 py-2.5 text-sm text-apple-gray-dark focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                  Место проведения <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Ресторан «Легенда», Алматы"
                  className="w-full rounded-lg border border-gray-200 bg-apple-gray-light px-4 py-2.5 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                  Ссылка на карту
                </label>
                <input
                  type="url"
                  value={data.locationUrl}
                  onChange={(e) => updateField("locationUrl", e.target.value)}
                  placeholder="https://maps.google.com/..."
                  className="w-full rounded-lg border border-gray-200 bg-apple-gray-light px-4 py-2.5 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                  Описание
                </label>
                <textarea
                  value={data.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                  placeholder="Дорогие друзья и родные! Мы рады пригласить вас..."
                  className="w-full resize-none rounded-lg border border-gray-200 bg-apple-gray-light px-4 py-2.5 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                  Информация о подарках
                </label>
                <textarea
                  value={data.giftInfo}
                  onChange={(e) => updateField("giftInfo", e.target.value)}
                  rows={2}
                  placeholder="Лучший подарок — ваше присутствие! Но если хотите..."
                  className="w-full resize-none rounded-lg border border-gray-200 bg-apple-gray-light px-4 py-2.5 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                />
              </div>

              {templateId === "editorial-ivory" && (
                <>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                      Дресс-код
                    </label>
                    <input
                      type="text"
                      value={data.dresscode ?? ""}
                      onChange={(e) => updateField("dresscode", e.target.value)}
                      placeholder="Нежные пастельные тона"
                      className="w-full rounded-lg border border-gray-200 bg-apple-gray-light px-4 py-2.5 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                    />
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className="text-sm font-medium text-apple-gray-dark">
                        Расписание дня
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          updateField("schedule", [
                            ...(data.schedule ?? []),
                            { time: "", title: "" },
                          ])
                        }
                        className="flex items-center gap-1 rounded-lg bg-apple-gray-light px-2.5 py-1.5 text-xs font-medium text-apple-gray-dark transition hover:bg-gray-200"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Добавить
                      </button>
                    </div>

                    {(data.schedule ?? []).length === 0 ? (
                      <p className="rounded-lg border border-dashed border-gray-200 py-4 text-center text-xs text-apple-gray">
                        Нажмите «Добавить», чтобы составить программу дня
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {(data.schedule ?? []).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="time"
                              value={item.time}
                              onChange={(e) => {
                                const next = [...(data.schedule ?? [])];
                                next[idx] = { ...next[idx], time: e.target.value };
                                updateField("schedule", next);
                              }}
                              className="w-28 flex-shrink-0 rounded-lg border border-gray-200 bg-apple-gray-light px-3 py-2 text-sm text-apple-gray-dark focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                            />
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const next = [...(data.schedule ?? [])];
                                next[idx] = { ...next[idx], title: e.target.value };
                                updateField("schedule", next);
                              }}
                              placeholder="Церемония"
                              className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-apple-gray-light px-3 py-2 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = (data.schedule ?? []).filter((_, i) => i !== idx);
                                updateField("schedule", next);
                              }}
                              className="flex-shrink-0 rounded-lg p-2 text-apple-gray transition hover:bg-red-50 hover:text-red-500"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Images */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-lg font-semibold text-apple-gray-dark">
                Главное фото
              </h2>
              <p className="mb-4 text-sm text-apple-gray">
                Фоновое изображение на обложке приглашения
              </p>

              {data.heroImageUrl ? (
                <div className="group relative overflow-hidden rounded-lg">
                  <img
                    src={data.heroImageUrl}
                    alt="Главное фото"
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                    <button
                      onClick={() => heroInputRef.current?.click()}
                      className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-apple-gray-dark shadow"
                    >
                      Заменить
                    </button>
                    <button
                      onClick={() => updateField("heroImageUrl", "")}
                      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => heroInputRef.current?.click()}
                  disabled={uploading}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 py-12 text-apple-gray transition hover:border-gray-300 hover:text-apple-gray-dark disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <Upload className="h-8 w-8" />
                  )}
                  <span className="text-sm font-medium">
                    {uploading ? "Загрузка..." : "Нажмите, чтобы загрузить"}
                  </span>
                  <span className="text-xs">JPEG, PNG, WebP • до 5 МБ</span>
                </button>
              )}

              <input
                ref={heroInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, "hero");
                  e.target.value = "";
                }}
              />
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-lg font-semibold text-apple-gray-dark">
                Галерея
              </h2>
              <p className="mb-4 text-sm text-apple-gray">
                Дополнительные фото для раздела «Наша история»
              </p>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {data.galleryImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={src}
                      alt={`Фото ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => removeGalleryImage(idx)}
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={uploading}
                  className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-gray-200 text-apple-gray transition hover:border-gray-300 hover:text-apple-gray-dark disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ImageIcon className="h-5 w-5" />
                  )}
                  <span className="text-[10px] font-medium">Добавить</span>
                </button>
              </div>

              <input
                ref={galleryInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = e.target.files;
                  if (!files) return;
                  for (let i = 0; i < files.length; i++) {
                    await handleImageUpload(files[i], "gallery");
                  }
                  e.target.value = "";
                }}
              />
            </div>
          </div>
        )}

        {/* Step 4: Slug */}
        {step === 4 && (
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold text-apple-gray-dark">
              Адрес приглашения
            </h2>
            <p className="mb-6 text-sm text-apple-gray">
              Этот адрес гости будут использовать для доступа к приглашению
            </p>

            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-apple-gray-dark">
                Ссылка
              </label>
              <div className="flex items-center gap-0 overflow-hidden rounded-lg border border-gray-200">
                <span className="flex-shrink-0 bg-apple-gray-light px-3 py-2.5 text-sm text-apple-gray">
                  {typeof window !== "undefined"
                    ? window.location.origin
                    : "https://toiber.kz"}
                  /invite/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="azamat-alina"
                  className="min-w-0 flex-1 border-0 bg-white px-3 py-2.5 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={generateSlugFromNames}
              disabled={!data.groomName || !data.brideName}
              className="mb-6 text-sm font-medium text-apple-gray-dark underline underline-offset-2 transition hover:text-apple-black disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
            >
              Сгенерировать из имён
            </button>

            <div className="rounded-lg bg-apple-gray-light p-4">
              <h3 className="mb-2 text-sm font-medium text-apple-gray-dark">
                Итого
              </h3>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-apple-gray">Шаблон</dt>
                  <dd className="font-medium text-apple-gray-dark">
                    {templateId === "editorial-ivory" ? "Editorial Ivory" : "Elegant Wedding"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-apple-gray">Пара</dt>
                  <dd className="font-medium text-apple-gray-dark">
                    {data.groomName || "—"} & {data.brideName || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-apple-gray">Дата</dt>
                  <dd className="font-medium text-apple-gray-dark">
                    {data.eventDate || "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-apple-gray">Фото</dt>
                  <dd className="font-medium text-apple-gray-dark">
                    {data.heroImageUrl ? "1 обложка" : "Нет обложки"}
                    {data.galleryImages.length > 0 &&
                      ` + ${data.galleryImages.length} в галерее`}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-apple-gray transition hover:text-apple-gray-dark disabled:invisible"
          >
            <ChevronLeft className="h-4 w-4" />
            Назад
          </button>

          {/* Mobile preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-lg bg-apple-gray-light px-3 py-2 text-xs font-medium text-apple-gray-dark transition hover:bg-gray-200 lg:hidden"
          >
            {showPreview ? "Скрыть превью" : "Предпросмотр"}
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-1.5 rounded-lg bg-apple-gray-dark px-5 py-2.5 text-sm font-medium text-white transition hover:bg-apple-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Далее
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="flex items-center gap-2 rounded-lg bg-apple-gray-dark px-5 py-2.5 text-sm font-medium text-white transition hover:bg-apple-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Сохранить" : "Создать приглашение"}
            </button>
          )}
        </div>
      </div>

      {/* Live preview (desktop) */}
      <div className={`w-full lg:w-96 xl:w-[420px] flex-shrink-0 ${showPreview ? "block" : "hidden lg:block"}`}>
        <div className="sticky top-6">
          <LivePreview data={data} templateId={templateId} />
        </div>
      </div>
    </div>
  );
}
