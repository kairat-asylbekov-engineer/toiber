"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState, useTransition } from "react";

const navItems = [
  { href: "/dashboard", label: "Мои приглашения", icon: LayoutDashboard },
  { href: "/dashboard/create", label: "Создать новое", icon: PlusCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      await signOut();
    });
  }

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg bg-white p-2 shadow-md lg:hidden"
        aria-label="Открыть меню"
      >
        <Menu className="h-5 w-5 text-apple-gray-dark" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-100 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <Link href="/dashboard" className="text-lg font-semibold text-apple-gray-dark">
            ToiBer
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
            aria-label="Закрыть меню"
          >
            <X className="h-5 w-5 text-apple-gray" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-apple-gray-light text-apple-gray-dark"
                    : "text-apple-gray hover:bg-apple-gray-light hover:text-apple-gray-dark"
                }`}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 px-3 py-4">
          <button
            onClick={handleSignOut}
            disabled={isPending}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-apple-gray transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <LogOut className="h-4.5 w-4.5" />
            {isPending ? "Выход..." : "Выйти"}
          </button>
        </div>
      </aside>
    </>
  );
}
