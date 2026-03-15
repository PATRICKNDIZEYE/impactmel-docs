# Programs & Projects

## Hierarchy

```
Organization
  └── Program  (funded initiative, multi-year)
       └── Project  (implementation unit, single funder/location)
```

A **Program** groups related projects under a common results framework and can span multiple donors. A **Project** is the operational unit — it has a budget, a team, reporting periods, and generates indicator data.

---

## Programs

### Data Structure

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| orgId | uuid | Owner organization |
| name | string | Program title |
| description | text | Full description |
| startDate | date | |
| endDate | date | |
| status | enum | `draft`, `active`, `completed` |
| donors | Donor[] | Associated donors (many-to-many) |

### Create a program

```http
POST /orgs/:orgId/programs
{
  "name": "WASH for All",
  "description": "...",
  "startDate": "2025-01-01",
  "endDate": "2027-12-31",
  "donorIds": ["uuid1", "uuid2"]
}
```

### Frontend

Navigate to **Programs** in the sidebar. Click **New Program** to open the creation form. The form includes a **Donor Combobox** that lets you:
- Select existing donors from your registry
- Type a new donor name to create it inline (auto-creates the donor record)

---

## Projects

### Data Structure

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| programId | uuid | Parent program |
| name | string | Project title |
| code | string | Short identifier (e.g. "WASH-RW-01") |
| budget | decimal | Total budget |
| currency | varchar | ISO 4217 (e.g. "USD", "EUR", "RWF") |
| startDate | date | |
| endDate | date | |
| status | enum | `draft`, `active`, `completed`, `suspended` |
| location | string | Country/region |
| lead | string | Lead implementing partner |

### Create a project

```http
POST /orgs/:orgId/programs/:programId/projects
{
  "name": "Rwanda WASH Phase 1",
  "code": "WASH-RW-01",
  "budget": 500000,
  "currency": "USD",
  "startDate": "2025-01-01",
  "endDate": "2026-12-31"
}
```

### Project Detail Page

The project detail page (`/org/:orgId/projects/:id`) includes:

- **Hero banner** — name, status badge, progress bar (budget burn rate)
- **Stats row** — total budget, spent, remaining, months to end
- **Tabs:**
  - **Overview** — description, team, key dates
  - **Indicators** — linked indicators + latest values
  - **Activities** — activity log
  - **Reports** — assembled reports for this project
  - **Budget** — budget lines and burn rate chart

---

## Linking Indicators to Projects

Indicators are defined org-wide but tracked per project. Linking is done via `ProjectIndicator`:

```http
POST /orgs/:orgId/projects/:projectId/indicators
{ "indicatorId": "uuid", "target": 5000, "baseline": 0 }
```

Once linked, M&E officers can submit `IndicatorReport` records for each reporting period.

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId/programs` | List all programs |
| POST | `/orgs/:orgId/programs` | Create program |
| GET | `/orgs/:orgId/programs/:id` | Get program details |
| PATCH | `/orgs/:orgId/programs/:id` | Update program |
| DELETE | `/orgs/:orgId/programs/:id` | Delete program |
| GET | `/orgs/:orgId/programs/:programId/projects` | List projects in program |
| POST | `/orgs/:orgId/programs/:programId/projects` | Create project |
| GET | `/orgs/:orgId/projects/:id` | Get project details |
| PATCH | `/orgs/:orgId/projects/:id` | Update project |
| DELETE | `/orgs/:orgId/projects/:id` | Delete project |
