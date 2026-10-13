export function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <div className="mb-5"><div className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">{eyebrow}</div><h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{title}</h2>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}</div>;
}
