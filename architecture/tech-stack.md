# Tech Stack

## Backend

| Layer | Technology | Version | Role |
|---|---|---|---|
| Runtime | Node.js | ≥ 18 | JavaScript runtime |
| Framework | NestJS | 10 | Module-based API framework |
| ORM | TypeORM | 0.3 | Database mapping + migrations |
| Database | PostgreSQL | ≥ 14 | Primary data store |
| Auth | Passport.js | — | JWT + Google OAuth strategies |
| Validation | class-validator | — | DTO input validation |
| Docs | Swagger / OpenAPI | — | Auto-generated at `/api` |
| Package manager | pnpm | ≥ 8 | Monorepo-friendly installs |

### NestJS Module Pattern

Every feature is an isolated NestJS module:

```
src/indicators/
├── indicator.entity.ts       TypeORM entity + DB schema
├── indicator.service.ts      Business logic, orgId scoping
├── indicator.controller.ts   HTTP routes, guards, Swagger decorators
├── indicator.module.ts       Module registration
└── dto/
    ├── create-indicator.dto.ts
    └── update-indicator.dto.ts
```

---

## Frontend

| Layer | Technology | Version | Role |
|---|---|---|---|
| Framework | Next.js | 14 | App Router, SSR, file-based routing |
| UI | React | 18 | Component model |
| Styling | Tailwind CSS | 3 | Utility-first CSS |
| Components | shadcn/ui | — | Accessible UI primitives |
| Data fetching | TanStack Query | 5 | Server state, caching, background refetch |
| HTTP client | Axios | — | API calls with interceptors |
| Auth | Custom JWT | — | HttpOnly cookie read by NestJS |
| PDF | html2pdf.js | — | DOM-to-binary PDF export |
| Toasts | Sonner | — | Non-blocking notifications |
| Icons | Lucide React | — | SVG icon library |

### Route Structure

```
/org/[orgId]/dashboard
/org/[orgId]/programs
/org/[orgId]/programs/[id]
/org/[orgId]/projects/[id]
/org/[orgId]/indicators
/org/[orgId]/reports
/org/[orgId]/reports/[id]
/org/[orgId]/data-collection
/org/[orgId]/settings
/r/[token]          ← public shareable report
/form/[token]       ← public data collection form
```

### API Layer (`lib/api/`)

```ts
// lib/api.ts — Axios instance with credentials
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,   // sends HttpOnly cookie
})

// lib/api-helpers.ts — orgId-scoped helpers
export const orgApi = (orgId: string) => ({
  get: (path, config?) => api.get(`/orgs/${orgId}${path}`, config),
  post: (path, data, config?) => api.post(`/orgs/${orgId}${path}`, data, config),
  // ...
})
```

---

## Database

PostgreSQL 16 with:

- **UUID primary keys** — `uuid_generate_v4()` via `uuid-ossp` extension
- **snake_case columns** — enforced via TypeORM `@Column({ name: 'column_name' })`
- **Soft deletes** — `deleted_at` timestamp on sensitive entities
- **Audit timestamps** — `created_at`, `updated_at` on every table via TypeORM `@CreateDateColumn` / `@UpdateDateColumn`

### Migration Strategy

All schema changes are TypeORM migrations — never raw ALTER TABLE in production.

```bash
# Generate a migration from entity changes
pnpm run migration:generate -- src/migrations/AddNewFeature

# Run pending migrations
pnpm run migration:run

# Revert last migration
pnpm run migration:revert
```

---

## Infrastructure

| Component | Dev | Production |
|---|---|---|
| API host | localhost:3001 | api.impactmel.com |
| Frontend | localhost:3000 | app.impactmel.com |
| Database | local PostgreSQL | Managed PostgreSQL (e.g. Neon, RDS) |
| Auth cookies | SameSite=Lax | SameSite=None; Secure; Domain=.impactmel.com |
| CDN | — | Cloudflare |
| Process manager | pnpm run start:dev | PM2 or systemd |
