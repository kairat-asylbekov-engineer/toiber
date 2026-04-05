import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowLeft, Users, CheckCircle, XCircle } from "lucide-react";
import type { Invitation, RSVP } from "@/types";

interface RsvpsPageProps {
  params: { id: string };
}

export const metadata = {
  title: "Ответы гостей — ToiBer",
};

export default async function RsvpsPage({ params }: RsvpsPageProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: invitation } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!invitation) {
    notFound();
  }

  const inv = invitation as Invitation;

  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("*")
    .eq("invitation_id", params.id)
    .order("created_at", { ascending: false });

  const allRsvps = (rsvps as RSVP[]) ?? [];
  const yesCount = allRsvps.filter((r) => r.status === "yes").length;
  const noCount = allRsvps.filter((r) => r.status === "no").length;

  return (
    <>
      <Link
        href="/dashboard"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-apple-gray transition hover:text-apple-gray-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад
      </Link>

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-apple-gray-dark lg:text-2xl">
          Ответы гостей
        </h1>
        <p className="mt-0.5 text-sm text-apple-gray">
          {inv.data.groomName} & {inv.data.brideName}
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-semibold text-apple-gray-dark">
            {allRsvps.length}
          </p>
          <p className="text-xs text-apple-gray">Всего</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-semibold text-apple-gray-dark">
            {yesCount}
          </p>
          <p className="text-xs text-apple-gray">Придут</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-2xl font-semibold text-apple-gray-dark">
            {noCount}
          </p>
          <p className="text-xs text-apple-gray">Не придут</p>
        </div>
      </div>

      {allRsvps.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
          <Users className="mb-3 h-10 w-10 text-apple-gray/40" />
          <p className="text-sm text-apple-gray">
            Ответов пока нет. Поделитесь ссылкой на приглашение с гостями.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-apple-gray-light">
                  <th className="px-4 py-3 font-medium text-apple-gray-dark">
                    Имя
                  </th>
                  <th className="px-4 py-3 font-medium text-apple-gray-dark">
                    Статус
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-apple-gray-dark sm:table-cell">
                    Пожелание
                  </th>
                  <th className="px-4 py-3 font-medium text-apple-gray-dark">
                    Дата
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allRsvps.map((rsvp) => (
                  <tr
                    key={rsvp.id}
                    className="transition hover:bg-apple-gray-light/50"
                  >
                    <td className="px-4 py-3 font-medium text-apple-gray-dark">
                      {rsvp.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          rsvp.status === "yes"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {rsvp.status === "yes" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {rsvp.status === "yes" ? "Придёт" : "Не придёт"}
                      </span>
                    </td>
                    <td className="hidden max-w-xs truncate px-4 py-3 text-apple-gray sm:table-cell">
                      {rsvp.comment || "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-apple-gray">
                      {(() => {
                        try {
                          return format(
                            parseISO(rsvp.created_at),
                            "d MMM, HH:mm",
                            { locale: ru }
                          );
                        } catch {
                          return rsvp.created_at;
                        }
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
