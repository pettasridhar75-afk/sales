import type { ChartType } from '@/types/sales';
export function ChartSwitcher({ value, onChange }: { value: ChartType; onChange: (value: ChartType) => void }) {
  const options: { value: ChartType; label: string }[] = [{ value: 'bar', label: 'Bar' }, { value: 'line', label: 'Line' }, { value: 'pie', label: 'Pie' }];
  return <div className="inline-flex rounded-xl bg-slate-100 p-1" aria-label="Chart type">{options.map(option => <button key={option.value} onClick={() => onChange(option.value)} className={`rounded-lg px-3 py-2 text-sm font-medium transition ${value === option.value ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>{option.label}</button>)}</div>;
}
