import { NextResponse } from 'next/server';
import { salesData } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ source: 'mock', currency: 'USD', data: salesData });
}
