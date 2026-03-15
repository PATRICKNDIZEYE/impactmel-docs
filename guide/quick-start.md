# Quick Start

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| pnpm | ≥ 8 |
| PostgreSQL | ≥ 14 |
| Git | any |

## 1. Clone

```bash
git clone https://github.com/impactmel/impactmel.git
cd impactmel
```

The monorepo has three packages:

```
impactmel/
├── frontend/     # Next.js 14 app  (port 3000)
├── main/         # NestJS API      (port 3001)
└── web/          # Landing page    (Next.js)
```

## 2. Backend

```bash
cd main
cp .env.example .env        # fill in DATABASE_URL, JWT_SECRET, etc.
pnpm install
pnpm run migration:run      # run all TypeORM migrations
pnpm run start:dev          # hot-reload dev server
```

Swagger docs: [http://localhost:3001/api](http://localhost:3001/api)

## 3. Frontend

```bash
cd frontend
cp .env.local.example .env.local
pnpm install
pnpm dev                    # → http://localhost:3000
```

## 4. Create your first org

1. Go to `http://localhost:3000/register`
2. Create an account
3. The org setup modal appears on first login
4. Fill in organization name and code
5. You land on the dashboard

## 5. Seed sample data (optional)

```bash
cd main
pnpm run seed              # creates sample programs, projects, indicators
```
