"use client";

import { useState } from "react";
import type { InvitationData, RSVP } from "@/types";
import ElegantWedding from "@/components/templates/ElegantWedding";
import EditorialIvory from "@/components/templates/EditorialIvory";
import { Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react";

interface LivePreviewProps {
  data: InvitationData;
  templateId?: string;
}

const emptyRsvps: RSVP[] = [];
const PREVIEW_ID = "preview";

function TemplateRenderer({
  data,
  templateId,
}: {
  data: InvitationData;
  templateId?: string;
}) {
  const props = { data, invitationId: PREVIEW_ID, rsvps: emptyRsvps };
  switch (templateId) {
    case "editorial-ivory":
      return <EditorialIvory {...props} />;
    case "elegant-wedding":
    default:
      return <ElegantWedding {...props} />;
  }
}

export default function LivePreview({ data, templateId }: LivePreviewProps) {
  const [visible, setVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full bg-apple-gray-dark px-4 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-apple-black lg:hidden"
      >
        <Eye className="h-4 w-4" />
        Предпросмотр
      </button>
    );
  }

  if (expanded) {
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/90 px-4 py-3 backdrop-blur-sm">
          <span className="text-sm font-medium text-apple-gray-dark">
            Предпросмотр
          </span>
          <button
            onClick={() => setExpanded(false)}
            className="flex items-center gap-1.5 rounded-lg bg-apple-gray-light px-3 py-1.5 text-xs font-medium text-apple-gray-dark transition hover:bg-gray-200"
          >
            <Minimize2 className="h-3.5 w-3.5" />
            Свернуть
          </button>
        </div>
        <TemplateRenderer data={data} templateId={templateId} />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <span className="text-sm font-medium text-apple-gray-dark">
          Предпросмотр
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded(true)}
            className="rounded-lg p-1.5 text-apple-gray transition hover:bg-apple-gray-light hover:text-apple-gray-dark"
            title="На весь экран"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setVisible(false)}
            className="rounded-lg p-1.5 text-apple-gray transition hover:bg-apple-gray-light hover:text-apple-gray-dark lg:hidden"
            title="Скрыть"
          >
            <EyeOff className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative h-[600px] overflow-hidden lg:h-[calc(100vh-12rem)]">
        <div
          className="absolute inset-0 origin-top-left overflow-auto"
          style={{
            transform: "scale(0.35)",
            width: "285.7%",
            height: "285.7%",
          }}
        >
          <TemplateRenderer data={data} templateId={templateId} />
        </div>
      </div>
    </div>
  );
}
