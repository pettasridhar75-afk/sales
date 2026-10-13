'use client';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ChartType, SalesRecord } from '@/types/sales';
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const PIE_COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e', '#64748b', '#a3e635', '#ec4899', '#0ea5e9', '#f97316', '#14b8a6'];
export function SalesChart({ data, type }: { data: SalesRecord[]; type: ChartType }) {
  const chartData = type === 'pie' ? data.map(item => ({ name: item.month, sales: item.sales })) : data;
  if (data.length === 0) return <div className="flex h-[320px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">No months match this sales threshold.</div>;
  return <div className="h-[320px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      {type === 'bar' ? <BarChart data={chartData} margin={{ top: 10, right: 8, left: 4, bottom: 4 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }}/><YAxis tickFormatter={v => `$${Number(v) / 1000}k`} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }}/><Tooltip formatter={(v) => money(Number(v))}/><Bar dataKey="sales" name="Sales" fill="#4f46e5" radius={[6, 6, 0, 0]} maxBarSize={36}/></BarChart>
      : type === 'line' ? <LineChart data={chartData} margin={{ top: 10, right: 12, left: 4, bottom: 4 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }}/><YAxis tickFormatter={v => `$${Number(v) / 1000}k`} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }}/><Tooltip formatter={(v) => money(Number(v))}/><Line type="monotone" dataKey="sales" name="Sales" stroke="#4f46e5" strokeWidth={3} dot={{ r: 3, fill: '#4f46e5' }} activeDot={{ r: 6 }}/></LineChart>
      : <PieChart><Tooltip formatter={(v) => money(Number(v))}/><Legend verticalAlign="bottom" height={36}/><Pie data={chartData} dataKey="sales" nameKey="name" cx="50%" cy="45%" innerRadius={60} outerRadius={100} paddingAngle={2} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>{chartData.map((entry, index) => <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]}/>)}</Pie></PieChart>}
    </ResponsiveContainer>
  </div>;
}
