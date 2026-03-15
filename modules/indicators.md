# Indicators

## Overview

Indicators are the measurement units of the M&E system. An indicator **definition** is created once at the org level, then **linked** to one or more projects with project-specific targets. Values are recorded in `IndicatorReport` records — one per indicator, per project, per reporting period.

```
Indicator (definition, org-level)
  └── ProjectIndicator (linked to project, has target)
       └── IndicatorReport (value for a specific period)
```

---

## Indicator Definition

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| orgId | uuid | Owner org |
| name | string | Full name: "% of HHs with safe water access" |
| code | string | Short code: "WASH-01" |
| unit | string | Unit of measurement: `people`, `%`, `HHs`, `USD` |
| aggregationMethod | enum | How to combine values across periods |
| description | text | Definition and measurement notes |
| dataSource | string | Where data comes from |
| resultNodeId | uuid | Linked Output/Outcome (optional) |
| isFormula | boolean | Is this computed from other indicators? |
| formula | string | Expression if isFormula = true |

---

## Aggregation Methods

When generating reports over a date range, ImpactMEL aggregates indicator values across reporting periods using the indicator's `aggregationMethod`:

| Method | Use case | Example |
|---|---|---|
| `sum` | Countable outputs | Total # of people trained |
| `average` | Rates and percentages | % of HHs with handwashing stations |
| `latest` | Stock indicators | # of functioning water points |
| `min` | Worst-case tracking | Minimum coverage across sites |
| `max` | Peak achievement | Maximum beneficiaries reached in one period |

---

## Disaggregations

Indicators can have multiple disaggregation dimensions (e.g., sex, age group, location):

```http
POST /orgs/:orgId/indicators/:id/disaggregations
{
  "name": "Sex",
  "categories": ["Female", "Male", "Non-binary"]
}
```

When reporters submit `IndicatorReport` values, they can provide values per disaggregation category. The system automatically sums them as the total.

---

## Formula Indicators

Formula indicators derive their value from other indicators using an expression:

```
formula = "WASH-01 / WASH-02 * 100"
```

The system evaluates the formula at report-generation time, pulling in the aggregated values for each referenced indicator code.

---

## Indicator Reports (Values)

### Create / Update a value

```http
POST /orgs/:orgId/projects/:projectId/indicator-reports
{
  "indicatorId": "uuid",
  "reportingPeriodId": "uuid",
  "value": 4250,
  "target": 5000,
  "narrative": "Training sessions completed in all 5 sectors.",
  "disaggregatedValues": {
    "Female": 2100,
    "Male": 2150
  }
}
```

### Status lifecycle

```
draft → submitted → approved
                  → rejected → (edit & resubmit)
```

- **Reporter** submits a draft
- **M&E Officer** reviews and approves or rejects with a comment
- Only `approved` and `submitted` reports are included in assembled donor reports

---

## Progress Scoring

ImpactMEL automatically computes a **progress score** for each indicator:

```
score = (actual_value / cumulative_target) × 100
```

Displayed as a color-coded badge:
- 🟢 ≥ 90% — On track
- 🟡 70–89% — At risk
- 🔴 < 70% — Off track

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId/indicators` | List org indicators |
| POST | `/orgs/:orgId/indicators` | Create indicator |
| GET | `/orgs/:orgId/indicators/:id` | Get indicator |
| PATCH | `/orgs/:orgId/indicators/:id` | Update indicator |
| DELETE | `/orgs/:orgId/indicators/:id` | Delete indicator |
| POST | `/orgs/:orgId/projects/:projectId/indicators` | Link indicator to project |
| DELETE | `/orgs/:orgId/projects/:projectId/indicators/:indicatorId` | Unlink indicator |
| GET | `/orgs/:orgId/projects/:projectId/indicator-reports` | List reports for project |
| POST | `/orgs/:orgId/projects/:projectId/indicator-reports` | Submit indicator value |
| PATCH | `/orgs/:orgId/indicator-reports/:id` | Update indicator value |
| PATCH | `/orgs/:orgId/indicator-reports/:id/approve` | Approve (M&E Officer) |
| PATCH | `/orgs/:orgId/indicator-reports/:id/reject` | Reject with comment |
