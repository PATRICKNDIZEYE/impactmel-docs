# Reporting Periods

## Overview

Reporting periods define **when** data is collected for a project. Each period has a start date, end date, and label. Reporters submit indicator values against a specific period. M&E officers can lock a period to prevent further edits once it's reviewed.

---

## Data Structure

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| projectId | uuid | Scoped to a project |
| label | string | e.g. "Q1 2026", "Jan–Mar 2026" |
| startDate | date | Period start |
| endDate | date | Period end |
| isLocked | boolean | Locked periods prevent new submissions |
| dueDate | date | Optional submission deadline |

---

## Typical Period Setup

Quarterly reporting cycle for a 2-year project:

```
Q1 2025  (Jan 1 – Mar 31)
Q2 2025  (Apr 1 – Jun 30)
Q3 2025  (Jul 1 – Sep 30)
Q4 2025  (Oct 1 – Dec 31)
Q1 2026  (Jan 1 – Mar 31)
...
```

---

## Creating Periods

### Via UI

Go to **Project** → **Settings** → **Reporting Periods** → **+ Add Period**.

The system suggests a label based on the dates but you can customize it.

### Via API

```http
POST /orgs/:orgId/projects/:projectId/reporting-periods
{
  "label": "Q1 2026",
  "startDate": "2026-01-01",
  "endDate": "2026-03-31",
  "dueDate": "2026-04-15"
}
```

---

## Locking a Period

Once the review window closes, lock the period to freeze submissions:

```http
PATCH /orgs/:orgId/reporting-periods/:id
{ "isLocked": true }
```

Locked periods:
- Reject new `IndicatorReport` submissions (403 Forbidden)
- Still included in report generation
- Can be unlocked by `org_admin` if corrections are needed

---

## Custom Date Range Reports

When assembling a report, you can specify a custom date range instead of selecting specific periods:

```http
POST /orgs/:orgId/projects/:projectId/reports
{
  "startDate": "2025-07-01",
  "endDate": "2026-06-30",
  "title": "Annual Review FY2025-26"
}
```

The report assembly service:
1. Finds all `ReportingPeriod` records that overlap the date range
2. Collects `approved` and `submitted` indicator reports within those periods
3. If no periods found (ad-hoc dates), falls back to loading all reports and filtering by date overlap in memory
4. Aggregates values by each indicator's `aggregationMethod`

::: tip
This is the key feature that enables donor reports that don't align with your internal quarterly periods — e.g., a donor fiscal year from July to June.
:::

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId/projects/:projectId/reporting-periods` | List periods |
| POST | `/orgs/:orgId/projects/:projectId/reporting-periods` | Create period |
| PATCH | `/orgs/:orgId/reporting-periods/:id` | Update / lock period |
| DELETE | `/orgs/:orgId/reporting-periods/:id` | Delete period (only if no submissions) |
