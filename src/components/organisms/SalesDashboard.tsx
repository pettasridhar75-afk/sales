'use client';
import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BadgeDollarSign, CalendarDays, ShoppingCart, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/atoms/MetricCard';
import { SectionTitle } from '@/components/atoms/SectionTitle';
import { ChartSwitcher } from '@/components/molecules/ChartSwitcher';
import { SalesChart } from '@/components/organisms/SalesChart';
import type { ChartType, SalesRecord } from '@/types/sales';
const years = [2024, 2023, 2022];
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
export function SalesDashboard() {
  const [allData, setAllData] = useState<SalesRecord[]>([]);
  const [year, setYear] = useState(2024);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [threshold, setThreshold] = useState('0');
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/sales').then(res => { if (!res.ok) throw new Error('Could not load sales'); return res.json(); }).then(payload => setAllData(payload.data as SalesRecord[])).catch(() => setAllData([])).finally(() => setLoading(false)); }, []);
  const yearData = useMemo(() => allData.filter(item => item.year === year), [allData, year]);
  const filteredData = useMemo(() => { const minimum = Math.max(0, Number(threshold) || 0); return yearData.filter(item => item.sales >= minimum); }, [yearData, threshold]);
  const totalSales = yearData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = yearData.reduce((sum, item) => sum + item.orders, 0);
  const average = yearData.length ? totalSales / yearData.length : 0;
  const previousSales = allData.filter(item => item.year === year - 1).reduce((sum, item) => sum + item.sales, 0);
  const previousYearSales = allData.some(item => item.year === year - 1) ? previousSales : 0;
  const growth = previousYearSales ? ((totalSales - previousYearSales) / previousYearSales) * 100 : null;
  return <div className="space-y-8">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-indigo-600">OVERVIEW / SALES</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Sales dashboard</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Explore yearly performance, compare monthly trends, and filter the data by your own sales threshold.</p></div><div className="flex items-center gap-3"><CalendarDays size={18} className="text-slate-400"/><label htmlFor="year" className="text-sm font-medium text-slate-600">Year</label><select id="year" value={year} onChange={e => setYear(Number(e.target.value))} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div></div>
    {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">Loading sales data…</div> : <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Total sales" value={money(totalSales)} note={`Across ${year} · mock dataset`} icon={BadgeDollarSign}/><MetricCard label="Total orders" value={totalOrders.toLocaleString('en-US')} note="Orders recorded in selected year" icon={ShoppingCart}/><MetricCard label="Average monthly sales" value={money(average)} note="Mean sales per month" icon={TrendingUp}/><MetricCard label="Year-over-year growth" value={growth === null ? '—' : `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`} note={growth === null ? 'Previous year unavailable' : `Compared with ${year - 1}`} icon={growth !== null && growth < 0 ? ArrowDownRight : ArrowUpRight}/></div>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><SectionTitle eyebrow="Monthly performance" title={`Sales in ${year}`} description="Monthly sales totals in US dollars."/><ChartSwitcher value={chartType} onChange={setChartType}/></div><SalesChart data={filteredData} type={chartType}/><div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><div><label htmlFor="threshold" className="block text-sm font-medium text-slate-700">Minimum sales threshold ($)</label><p className="mt-1 text-xs text-slate-500">Only show months at or above this value.</p></div><div className="flex items-center gap-2"><span className="text-sm text-slate-400">$</span><input id="threshold" type="number" min="0" step="500" value={threshold} onChange={e => setThreshold(e.target.value)} className="w-40 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"/><button onClick={() => setThreshold('0')} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Reset</button></div></div><p className="mt-3 text-xs text-slate-400">Showing {filteredData.length} of {yearData.length} months · data is illustrative, not actual company sales.</p></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><SectionTitle eyebrow="Data table" title="Monthly breakdown" description="The same data used by the chart, filtered by your threshold."/><div className="overflow-x-auto"><table className="w-full min-w-[460px] text-left text-sm"><thead><tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400"><th className="pb-3 font-semibold">Month</th><th className="pb-3 text-right font-semibold">Sales</th><th className="pb-3 text-right font-semibold">Orders</th><th className="pb-3 text-right font-semibold">Sales / order</th></tr></thead><tbody>{filteredData.map(item => <tr key={`${item.year}-${item.month}`} className="border-b border-slate-50 last:border-0"><td className="py-3 font-medium text-slate-700">{item.month}</td><td className="py-3 text-right font-semibold text-slate-900">{money(item.sales)}</td><td className="py-3 text-right text-slate-600">{item.orders.toLocaleString('en-US')}</td><td className="py-3 text-right text-slate-600">{money(item.sales / item.orders)}</td></tr>)}</tbody></table></div></section>
    </>}
    <p className="text-center text-xs text-slate-400">SalesScope · Demo dashboard · Built with Next.js, TypeScript, Tailwind CSS and Recharts</p>
  </div>;
}
