"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import {
  Eye,
  Pencil,
  Trash2,
  Globe,
  GlobeLock,
  Copy,
  Check,
  Users,
  MoreVertical,
} from "lucide-react";
import type { Invitation } from "@/types";
import {
  deleteInvitation,
  publishInvitation,
  unpublishInvitation,
} from "@/app/actions/invitation";

interface InvitationCardProps {
  invitation: Invitation;
  onUpdate: () => void;
}

export default function InvitationCard({
  invitation,
  onUpdate,
}: InvitationCardProps) {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isPublished = invitation.status === "published";

  const coupleNames = `${invitation.data.groomName} & ${invitation.data.brideName}`;

  const formattedDate = (() => {
    try {
      return format(parseISO(invitation.data.eventDate), "d MMM yyyy", {
        locale: ru,
      });
    } catch {
      return invitation.data.eventDate;
    }
  })();

  function handleCopyLink() {
    const url = `${window.location.origin}/invite/${invitation.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleTogglePublish() {
    startTransition(async () => {
      if (isPublished) {
        await unpublishInvitation(invitation.id);
      } else {
        await publishInvitation(invitation.id);
      }
      onUpdate();
    });
    setMenuOpen(false);
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    startTransition(async () => {
      await deleteInvitation(invitation.id);
      onUpdate();
    });
    setMenuOpen(false);
    setConfirmDelete(false);
  }

  return (
    <div className="group relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-apple-gray-dark">
            {coupleNames}
          </h3>
          <p className="mt-0.5 text-sm text-apple-gray">{formattedDate}</p>
        </div>

        <div className="relative ml-2 flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-1.5 text-apple-gray transition hover:bg-apple-gray-light hover:text-apple-gray-dark"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => {
                  setMenuOpen(false);
                  setConfirmDelete(false);
                }}
              />
              <div className="absolute right-0 top-8 z-20 w-48 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                <button
                  onClick={handleTogglePublish}
                  disabled={isPending}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-apple-gray-dark transition hover:bg-apple-gray-light disabled:opacity-50"
                >
                  {isPublished ? (
                    <>
                      <GlobeLock className="h-4 w-4" /> Снять с публикации
                    </>
                  ) : (
                    <>
                      <Globe className="h-4 w-4" /> Опубликовать
                    </>
                  )}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  {confirmDelete ? "Точно удалить?" : "Удалить"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isPublished
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPublished ? "bg-green-500" : "bg-amber-500"
            }`}
          />
          {isPublished ? "Опубликовано" : "Черновик"}
        </span>
        <span className="text-xs text-apple-gray">
          /invite/{invitation.slug}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {isPublished && (
          <Link
            href={`/invite/${invitation.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-apple-gray-dark transition hover:bg-apple-gray-light"
          >
            <Eye className="h-3.5 w-3.5" />
            Открыть
          </Link>
        )}
        <Link
          href={`/dashboard/edit/${invitation.id}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-apple-gray-dark transition hover:bg-apple-gray-light"
        >
          <Pencil className="h-3.5 w-3.5" />
          Редактировать
        </Link>
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-apple-gray-dark transition hover:bg-apple-gray-light"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Скопировано" : "Копировать"}
        </button>
        <Link
          href={`/dashboard/invitations/${invitation.id}/rsvps`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-apple-gray-dark transition hover:bg-apple-gray-light"
        >
          <Users className="h-3.5 w-3.5" />
          Ответы
        </Link>
      </div>
    </div>
  );
}
