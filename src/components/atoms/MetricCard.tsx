import type { LucideIcon } from 'lucide-react';
export function MetricCard({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: LucideIcon }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><span className="rounded-xl bg-indigo-50 p-2 text-indigo-600"><Icon size={18} /></span></div><p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-500">{note}</p></article>;
}
