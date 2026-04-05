import Link from "next/link";

export default function InviteNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 font-serif text-5xl font-light text-stone-800">
        404
      </h1>
      <p className="mb-2 text-lg text-stone-600">
        Приглашение не найдено
      </p>
      <p className="mb-8 max-w-md text-stone-400">
        Возможно, ссылка устарела или приглашение ещё не опубликовано.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-stone-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
      >
        На главную
      </Link>
    </main>
  );
}
