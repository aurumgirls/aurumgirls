"use client";

import { useMemo, useState } from "react";
import { Search, ShieldOff, ShieldCheck } from "lucide-react";
import type { PlatformUser, UserRole } from "@/lib/admin-data";

type Row = PlatformUser;

const TABS: { label: string; value: UserRole | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Customers", value: "customer" },
  { label: "Sellers", value: "seller" },
  { label: "Admins", value: "admin" },
];

const ROLE_STYLES: Record<UserRole, string> = {
  customer: "bg-sand text-ink",
  seller: "bg-aurum-soft text-[#6b4a17]",
  admin: "bg-ink text-linen",
};

const STATUS_STYLES: Record<Row["status"], string> = {
  active: "bg-sage text-grove",
  pending: "bg-sand text-ink",
  suspended: "bg-nar-soft text-nar-deep",
};

export default function AdminUsersTable({ users }: { users: PlatformUser[] }) {
  const [rows, setRows] = useState<Row[]>(users);
  const [tab, setTab] = useState<UserRole | "all">("all");
  const [query, setQuery] = useState("");

  const toggleSuspend = (id: string) => {
    setRows((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u))
    );
  };

  const filtered = useMemo(() => {
    return rows.filter((u) => {
      const matchesTab = tab === "all" || u.role === tab;
      const matchesQuery =
        query.trim().length === 0 ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [rows, tab, query]);

  const counts = useMemo(() => {
    return {
      all: rows.length,
      customer: rows.filter((u) => u.role === "customer").length,
      seller: rows.filter((u) => u.role === "seller").length,
      admin: rows.filter((u) => u.role === "admin").length,
    };
  }, [rows]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-pill bg-cream border border-black/10 p-1 shadow-sm w-fit">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`rounded-pill px-4 py-2 text-[13px] font-semibold transition-colors ${
                tab === t.value ? "bg-nar text-white" : "text-ink hover:bg-sand"
              }`}
            >
              {t.label} <span className="opacity-70">({counts[t.value]})</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 sm:max-w-[280px] sm:ml-auto">
          <Search size={15} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email…"
            className="w-full rounded-sm bg-linen border border-black/15 pl-10 pr-3.5 py-2.5 text-[14px] text-ink outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow"
          />
        </div>
      </div>

      <div className="rounded-lg bg-cream border border-black/10 shadow-sm overflow-hidden">
        <div className="hidden lg:grid grid-cols-[2.6fr_1fr_1.4fr_1fr_1fr_0.8fr] gap-3 px-6 py-3 text-[11px] font-bold tracking-[0.08em] uppercase text-stone border-b border-black/10">
          <span>User</span>
          <span>Role</span>
          <span>Joined</span>
          <span>Details</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>
        <div className="divide-y divide-black/10">
          {filtered.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 lg:grid-cols-[2.6fr_1fr_1.4fr_1fr_1fr_0.8fr] gap-3 px-5 sm:px-6 py-4 items-center"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-10 w-10 rounded-pill shrink-0 flex items-center justify-center text-linen font-serif text-[14px]"
                  style={{ background: `linear-gradient(135deg, ${row.swatch[0]}, ${row.swatch[1]})` }}
                >
                  {row.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-medium text-ink truncate">{row.name}</p>
                  <p className="text-[11.5px] text-stone truncate">{row.email}</p>
                </div>
              </div>

              <span className={`inline-flex items-center rounded-pill text-[11px] font-semibold px-2.5 py-1 w-fit capitalize ${ROLE_STYLES[row.role]}`}>
                {row.role}
              </span>

              <span className="text-[13px] text-stone">{row.joined}</span>

              <span className="text-[13px] text-ink">{row.meta}</span>

              <span className={`inline-flex items-center rounded-pill text-[11.5px] font-semibold px-3 py-1 w-fit capitalize ${STATUS_STYLES[row.status]}`}>
                {row.status}
              </span>

              <div className="flex items-center justify-start lg:justify-end">
                {row.role !== "admin" && (
                  <button
                    onClick={() => toggleSuspend(row.id)}
                    className={`h-8 w-8 inline-flex items-center justify-center rounded-pill transition-colors ${
                      row.status === "suspended" ? "bg-olive text-white" : "bg-sand text-ink hover:bg-nar hover:text-white"
                    }`}
                    aria-label={row.status === "suspended" ? `Reinstate ${row.name}` : `Suspend ${row.name}`}
                  >
                    {row.status === "suspended" ? (
                      <ShieldCheck size={13} strokeWidth={1.9} />
                    ) : (
                      <ShieldOff size={13} strokeWidth={1.9} />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-6 py-10 text-center text-[13.5px] text-stone">No users match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
