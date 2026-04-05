"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, Inbox } from "lucide-react";
import type { Invitation } from "@/types";
import InvitationCard from "@/components/dashboard/InvitationCard";

interface DashboardClientProps {
  initialInvitations: Invitation[];
}

export default function DashboardClient({
  initialInvitations,
}: DashboardClientProps) {
  const router = useRouter();

  function handleUpdate() {
    router.refresh();
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-apple-gray-dark lg:text-2xl">
            Мои приглашения
          </h1>
          <p className="mt-0.5 text-sm text-apple-gray">
            {initialInvitations.length === 0
              ? "У вас ещё нет приглашений"
              : `Всего: ${initialInvitations.length}`}
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 rounded-lg bg-apple-gray-dark px-4 py-2.5 text-sm font-medium text-white transition hover:bg-apple-black"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Создать</span>
        </Link>
      </div>

      {initialInvitations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 py-20 text-center shadow-sm">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-apple-gray-light">
            <Inbox className="h-7 w-7 text-apple-gray" />
          </div>
          <h2 className="mb-2 text-lg font-semibold text-apple-gray-dark">
            Пока пусто
          </h2>
          <p className="mb-6 max-w-sm text-sm text-apple-gray">
            Создайте своё первое приглашение — выберите шаблон, заполните данные
            и поделитесь ссылкой с гостями.
          </p>
          <Link
            href="/dashboard/create"
            className="flex items-center gap-2 rounded-lg bg-apple-gray-dark px-5 py-2.5 text-sm font-medium text-white transition hover:bg-apple-black"
          >
            <PlusCircle className="h-4 w-4" />
            Создать приглашение
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {initialInvitations.map((inv) => (
            <InvitationCard
              key={inv.id}
              invitation={inv}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </>
  );
}
