"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signInWithMagicLink } from "@/app/actions/auth";
import Link from "next/link";
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react";

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageInner />
    </Suspense>
  );
}

function AuthPageInner() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) {
      setErrorMessage(urlError);
      setStatus("error");
    }
  }, [searchParams]);

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setErrorMessage("");

    const result = await signInWithMagicLink(formData);

    if (result.error) {
      setErrorMessage(result.error);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-apple-gray-light px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-apple-gray transition-colors hover:text-apple-gray-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-semibold text-apple-gray-dark">
              Вход в ToiBer
            </h1>
            <p className="text-sm text-apple-gray">
              Введите email, и мы отправим вам ссылку для входа
            </p>
          </div>

          {status === "sent" ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <h2 className="text-lg font-medium text-apple-gray-dark">
                Письмо отправлено!
              </h2>
              <p className="text-sm text-apple-gray">
                Проверьте почту и перейдите по ссылке для входа. Если письма нет
                — загляните в спам.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm font-medium text-apple-gray-dark underline underline-offset-2 transition-colors hover:text-apple-black"
              >
                Отправить ещё раз
              </button>
            </div>
          ) : (
            <form action={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-apple-gray-dark"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-apple-gray" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-200 bg-apple-gray-light py-2.5 pl-10 pr-4 text-sm text-apple-gray-dark placeholder:text-apple-gray/60 focus:border-apple-gray-dark focus:outline-none focus:ring-1 focus:ring-apple-gray-dark"
                  />
                </div>
              </div>

              {status === "error" && errorMessage && (
                <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-apple-gray-dark px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-apple-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  "Получить ссылку для входа"
                )}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-apple-gray">
          Продолжая, вы соглашаетесь с условиями использования сервиса
        </p>
      </div>
    </div>
  );
}
