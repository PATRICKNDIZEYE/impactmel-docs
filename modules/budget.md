# Budget & Finance

## Overview

The Budget module tracks financial performance at the project level. Every project has a total budget, broken into budget lines per activity or cost category. Burn rate is computed automatically and surfaced in the dashboard and reports.

---

## Data Structure

### Budget Line

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| projectId | uuid | Parent project |
| category | string | e.g. "Staff", "Training", "Equipment" |
| description | text | Detailed description |
| plannedAmount | decimal | Budgeted amount |
| actualAmount | decimal | Spent to date |
| currency | varchar | Inherited from project |
| period | string | Which period this line covers |
| updatedAt | timestamp | Last updated |

---

## Project Budget Summary

The project record stores the **total budget** (`budget` field). Budget lines roll up to this total. The system computes:

```
totalPlanned   = SUM(budget_lines.planned_amount)
totalActual    = SUM(budget_lines.actual_amount)
burnRate       = (totalActual / totalPlanned) × 100
remaining      = totalPlanned - totalActual
```

These values appear in:
- The **project detail page** hero stats row
- The **Budget** tab of the project
- The **Budget Summary** section of assembled reports

---

## Currency

Each project has its own currency (`currency` column, ISO 4217). The system does **not** automatically convert between currencies — reports show values in the project's currency.

For multi-currency programs, the program-level summary shows individual project budgets in their native currencies.

---

## Creating Budget Lines

### Via UI

1. Open a project → **Budget** tab
2. Click **+ Add Budget Line**
3. Enter category, planned amount, description
4. Update actual amount as spending occurs

### Via API

```http
POST /orgs/:orgId/projects/:projectId/budget-lines
{
  "category": "Training & Workshops",
  "description": "WASH training for community health workers Q1",
  "plannedAmount": 12500,
  "actualAmount": 9750,
  "period": "Q1 2026"
}
```

### Update actual spending

```http
PATCH /orgs/:orgId/budget-lines/:id
{ "actualAmount": 11200 }
```

---

## Budget in Reports

When a report is assembled, the Budget Summary section is automatically populated:

```
Budget Performance — Q1 2026
────────────────────────────
Total Budget:     $500,000
Expenditure:      $142,300  (28.5%)
Remaining:        $357,700

By Category:
  Staff             $60,000 planned / $58,200 actual
  Training           $15,000 planned / $12,500 actual
  Equipment          $30,000 planned / $28,100 actual
  ...
```

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId/projects/:projectId/budget-lines` | List budget lines |
| POST | `/orgs/:orgId/projects/:projectId/budget-lines` | Create budget line |
| PATCH | `/orgs/:orgId/budget-lines/:id` | Update budget line |
| DELETE | `/orgs/:orgId/budget-lines/:id` | Delete budget line |
| GET | `/orgs/:orgId/projects/:projectId/budget-summary` | Get computed summary |
