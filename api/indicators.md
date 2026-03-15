# Indicators API

## Indicator Definitions

### List indicators

```http
GET /orgs/:orgId/indicators
```

Optional query params:
- `?resultNodeId=uuid` — filter by result node
- `?projectId=uuid` — only indicators linked to a project

**Response**

```json
[
  {
    "id": "uuid",
    "name": "# of people with access to clean water",
    "code": "WASH-01",
    "unit": "people",
    "aggregationMethod": "sum",
    "resultNodeId": "uuid",
    "isFormula": false,
    "createdAt": "2025-01-15T10:00:00Z"
  }
]
```

---

### Create indicator

```http
POST /orgs/:orgId/indicators
```

**Body**

```json
{
  "name": "# of people with access to clean water",
  "code": "WASH-01",
  "unit": "people",
  "aggregationMethod": "sum",
  "description": "Cumulative count of individuals who gained access to improved water sources.",
  "dataSource": "Beneficiary registration + household survey",
  "resultNodeId": "uuid"
}
```

**Aggregation methods:** `sum` | `average` | `latest` | `min` | `max`

---

### Create formula indicator

```http
POST /orgs/:orgId/indicators
```

```json
{
  "name": "% households with safe water access",
  "code": "WASH-PCT-01",
  "unit": "%",
  "aggregationMethod": "latest",
  "isFormula": true,
  "formula": "WASH-01 / WASH-TOTAL * 100"
}
```

Formula syntax uses indicator `code` values as variables. Evaluated at report generation time.

---

### Update indicator

```http
PATCH /orgs/:orgId/indicators/:id
```

**Body** — any subset of indicator fields.

---

### Delete indicator

```http
DELETE /orgs/:orgId/indicators/:id
```

Cannot delete if there are existing `IndicatorReport` records.

---

## Linking Indicators to Projects

### Link indicator

```http
POST /orgs/:orgId/projects/:projectId/indicators
```

```json
{
  "indicatorId": "uuid",
  "target": 5000,
  "baseline": 0,
  "baselineYear": 2024
}
```

---

### Unlink indicator

```http
DELETE /orgs/:orgId/projects/:projectId/indicators/:indicatorId
```

---

## Indicator Reports (Values)

### List reports for a project

```http
GET /orgs/:orgId/projects/:projectId/indicator-reports
```

Query params:
- `?periodId=uuid` — filter by reporting period
- `?status=approved` — filter by status (`draft`, `submitted`, `approved`, `rejected`)
- `?indicatorId=uuid` — filter by indicator

---

### Submit a value

```http
POST /orgs/:orgId/projects/:projectId/indicator-reports
```

```json
{
  "indicatorId": "uuid",
  "reportingPeriodId": "uuid",
  "value": 4250,
  "target": 5000,
  "narrative": "Training sessions completed in 5 sectors. Some delays due to rains.",
  "disaggregatedValues": {
    "Female": 2100,
    "Male": 2150
  }
}
```

---

### Update a report

```http
PATCH /orgs/:orgId/indicator-reports/:id
```

Can only update if status is `draft` or `rejected`.

---

### Approve a report

```http
PATCH /orgs/:orgId/indicator-reports/:id/approve
```

**Required role:** `me_officer` or `org_admin`

```json
{ "comment": "Values verified against field registers." }
```

---

### Reject a report

```http
PATCH /orgs/:orgId/indicator-reports/:id/reject
```

```json
{ "comment": "Value appears inflated — please verify with field data." }
```

Reporter is notified and can edit and resubmit.

---

## Disaggregations

### Add disaggregation to indicator

```http
POST /orgs/:orgId/indicators/:id/disaggregations
```

```json
{
  "name": "Sex",
  "categories": ["Female", "Male", "Non-binary"]
}
```

### List disaggregations

```http
GET /orgs/:orgId/indicators/:id/disaggregations
```
