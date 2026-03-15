# System Overview

## High-Level Architecture

ImpactMEL follows a classic three-tier architecture with a clear separation of concerns between the frontend, API, and database.

```
┌─────────────────────────────────────────────────────────┐
│                       Clients                           │
│  Browser (Next.js)    Mobile (future)    Donor (public) │
└────────────┬────────────────┬──────────────┬────────────┘
             │                │              │
             ▼                ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                     NestJS API                          │
│  /auth   /orgs   /programs   /projects   /indicators    │
│  /forms  /reports  /donors   /activities /budget        │
│                                                         │
│  Guards → Services → TypeORM Repositories               │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   PostgreSQL 16                         │
│  Organizations │ Programs │ Projects │ Indicators       │
│  ReportingPeriods │ IndicatorReports │ Forms            │
│  Activities │ Participants │ Budget │ Reports           │
└─────────────────────────────────────────────────────────┘
```

## Request Flow

### Authenticated API request

```
Browser
  → HTTPS request + HttpOnly cookie (JWT)
  → NestJS JwtAuthGuard validates token
  → Controller extracts orgId from params
  → Service enforces orgId scope (every query filters by org)
  → Repository → PostgreSQL
  → Response JSON
```

### Public form submission

```
Field staff (no login)
  → GET /api/forms/public/:token  (load form definition)
  → POST /api/forms/public/:token/submit  (submit answers)
  → FormSubmission saved to DB
  → Linked to IndicatorReport if form is connected to an indicator
```

### Report sharing

```
M&E Officer generates share link
  → PATCH /api/reports/:id/share → generates UUID token
  → Stores token in Report.shareToken column
  → Returns public URL: https://app.impactmel.com/r/:token
Donor opens link (no login)
  → GET /api/reports/share/:token → returns assembled report JSON
  → Frontend renders as read-only parchment document
  → "Download PDF" → html2pdf captures DOM → binary PDF
```

## Monorepo Structure

```
impactmel/
├── main/            NestJS API (port 3001)
│   ├── src/
│   │   ├── auth/
│   │   ├── organizations/
│   │   ├── programs/
│   │   ├── projects/
│   │   ├── indicators/
│   │   ├── reporting-periods/
│   │   ├── indicator-reports/
│   │   ├── results-framework/
│   │   ├── activities/
│   │   ├── participants/
│   │   ├── data-collection/
│   │   ├── reports/
│   │   ├── budget/
│   │   └── donors/
│   └── migrations/
│
├── frontend/        Next.js 14 App Router (port 3000)
│   ├── app/
│   │   ├── org/[orgId]/
│   │   │   ├── dashboard/
│   │   │   ├── programs/
│   │   │   ├── projects/
│   │   │   ├── indicators/
│   │   │   ├── reports/
│   │   │   ├── data-collection/
│   │   │   └── settings/
│   │   ├── r/[token]/    ← public report
│   │   ├── form/[token]/ ← public form
│   │   └── auth/
│   ├── components/
│   └── lib/
│
└── web/             Landing page (Next.js)
```

## Security Boundaries

Every service method accepts `orgId` as its first argument and includes it in **every** database query. There is no way to access another org's data through the API — even if you have a valid JWT from org A, all data is scoped to org A's namespace.

See [Security Model](/architecture/security) for full details.
