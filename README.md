# SalesScope — Yearly Sales Dashboard

A responsive sales analytics dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Recharts**. It shows monthly sales for 2022, 2023, and 2024, with a custom sales threshold and Bar / Line / Pie chart controls.

> **Data note:** The included data is synthetic demo data created for this project. It is not claimed to be downloaded from Kaggle or to represent a real business. To use real Kaggle data, download a sales dataset from [Kaggle Datasets](https://www.kaggle.com/datasets), normalize it to the shape shown below, and replace `src/lib/data.ts` or update the API route to load it.

## Features

- Year selector for 2022, 2023, and 2024.
- KPI cards: total sales, order count, average monthly sales, and year-over-year growth.
- Interactive Bar, Line, and Pie charts using Recharts.
- Custom minimum-sales threshold with reset control.
- Monthly data table that follows the selected year and threshold.
- Internal `GET /api/sales` Route Handler to serve the demo dataset.
- Atomic Design-inspired component organization: atoms, molecules, and organisms.
- Responsive layout and TypeScript types.

## Tech stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS v4
- Recharts
- Lucide React icons

## Requirements

- Node.js 20.9 or newer recommended for the current Next.js 15 toolchain.
- npm.

## Setup

```bash
# 1. Unzip the project and enter its folder
cd sales-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/dashboard`.

## Production build

```bash
npm run build
npm run start
```

## Project structure

```text
src/
├── app/
│   ├── api/sales/route.ts       # GET endpoint returning demo sales data
│   ├── dashboard/page.tsx       # Dashboard page; mounts the dashboard organism
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Redirects to /dashboard
├── components/
│   ├── atoms/
│   │   ├── MetricCard.tsx
│   │   └── SectionTitle.tsx
│   ├── molecules/
│   │   └── ChartSwitcher.tsx
│   └── organisms/
│       ├── SalesChart.tsx
│       └── SalesDashboard.tsx
├── lib/data.ts                  # Synthetic monthly sales data
└── types/sales.ts               # Shared TypeScript types
```

## Atomic design mapping

- **Atoms:** `MetricCard`, `SectionTitle` — small reusable UI building blocks.
- **Molecules:** `ChartSwitcher` — groups chart selection buttons into one control.
- **Organisms:** `SalesDashboard`, `SalesChart` — larger functional dashboard sections.
- **Page:** `src/app/dashboard/page.tsx` composes the dashboard organism into the route.

## API response format

`GET /api/sales` returns JSON with `source`, `currency`, and `data`. Each record has `month`, `year`, `sales`, and `orders`.

Example record:

```json
{ "month": "Jan", "year": 2024, "sales": 31800, "orders": 301 }
```

The UI fetches the local API endpoint. To integrate a third-party API, update `src/app/api/sales/route.ts` to fetch the provider on the server and keep API keys in environment variables. Never commit secrets; `.env*` is ignored and `.env.example` is safe to commit.

## GitHub setup

Create a new empty repository in your GitHub account named `sales-dashboard` (do not initialize it with a README, since this project already includes one), then run:

```bash
git init
git add .
git commit -m "Build SalesScope sales dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/sales-dashboard.git
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your GitHub username. Check `git status` before committing and never commit `.env` files or access tokens.

## Data source note

For a real-world portfolio version, use a Kaggle sales dataset only after reviewing its license and schema. Keep the source and attribution in this README and ensure the selected dataset contains a date or year/month field and a sales/revenue field. The included figures are mock values for demonstrating the UI and filters.
