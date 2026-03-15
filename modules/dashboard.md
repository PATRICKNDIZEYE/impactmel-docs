# Dashboard

## Overview

The Dashboard is the landing page for each organization. It provides an at-a-glance view of portfolio performance across all programs and projects — without needing to open individual records.

---

## Dashboard Sections

### Portfolio Summary (top cards)

| Card | Metric |
|---|---|
| Active Projects | Count of projects with status = `active` |
| Total Budget | Sum of all project budgets (by currency) |
| Indicators On Track | Count with progress score ≥ 90% |
| Upcoming Deadlines | Reporting period due dates in next 30 days |

### Program Performance

A table or card grid showing each program with:
- Status badge
- Project count
- Total budget vs. spent
- Indicator completion rate

### Recent Activity Feed

Chronological log of events across the org:
- Indicator report submitted
- Report published
- New participant registered
- Period locked
- Member invited

### Indicators at Risk

Filtered list of indicators with progress score < 70%, sorted by largest gap from target. Clicking an indicator navigates to the project detail.

### Upcoming Deadlines

List of reporting period `dueDate` values in the next 30 days, with links to the relevant project.

---

## Project Dashboard

Each project also has its own mini-dashboard on the **Project Detail** page:

- **Hero banner** — project name, status, progress bar (budget burn rate)
- **Stats row** — total budget, spent, remaining, days to end date
- **Tabs** — Overview, Indicators, Activities, Reports, Budget

---

## Org-Level vs. Project-Level

| View | Scope | URL |
|---|---|---|
| Org Dashboard | All programs + projects in the org | `/org/:orgId/dashboard` |
| Program view | All projects in a program | `/org/:orgId/programs/:id` |
| Project detail | Single project, all tabs | `/org/:orgId/projects/:id` |

---

## Data Sources

The dashboard is powered by aggregated API calls:

```
GET /orgs/:orgId/dashboard-summary
  → total projects, budgets, indicator scores

GET /orgs/:orgId/activity-feed
  → recent events across the org

GET /orgs/:orgId/indicators?status=at_risk
  → indicators needing attention
```

Data is cached by TanStack Query with a 60-second stale time — stale data is shown instantly while a background refetch runs.

---

## Role-Based View

| Role | What they see |
|---|---|
| `org_admin` | Full dashboard with admin actions |
| `me_officer` | Full dashboard, can approve indicators |
| `reporter` | Only their assigned projects + submit actions |
| `viewer` | Read-only dashboard, no action buttons |
