# Reports API

## Report Assembly

### List reports

```http
GET /orgs/:orgId/reports
```

Optional query params:
- `?projectId=uuid` — filter by project
- `?status=published` — filter by status (`draft`, `published`)

**Response**

```json
[
  {
    "id": "uuid",
    "title": "Q1 2026 Donor Report — WASH Program",
    "projectId": "uuid",
    "projectName": "Rwanda WASH Phase 1",
    "reportType": "quarterly",
    "startDate": "2026-01-01",
    "endDate": "2026-03-31",
    "status": "published",
    "shareToken": "uuid",
    "shareUrl": "https://app.impactmel.com/r/uuid",
    "createdAt": "2026-04-02T08:00:00Z"
  }
]
```

---

### Create and assemble report

```http
POST /orgs/:orgId/reports
```

**Using reporting periods:**

```json
{
  "title": "Q1 2026 Donor Report",
  "projectId": "uuid",
  "reportType": "quarterly",
  "periodIds": ["uuid-q1-2026"]
}
```

**Using custom date range:**

```json
{
  "title": "FY2025-26 Annual Review",
  "projectId": "uuid",
  "reportType": "annual",
  "startDate": "2025-07-01",
  "endDate": "2026-06-30"
}
```

**Response:** `201 Created` with assembled report including all sections.

The assembly engine:
1. Resolves which `ReportingPeriod` rows overlap the date range
2. Loads `approved` + `submitted` indicator reports in those periods
3. Aggregates values by each indicator's `aggregationMethod`
4. Falls back to date-overlap filter if no period rows found
5. Attaches activities, budget summary, and attachments

---

### Get report

```http
GET /orgs/:orgId/reports/:id
```

**Response** (assembled report with sections)

```json
{
  "id": "uuid",
  "title": "Q1 2026 Donor Report",
  "project": { "id": "uuid", "name": "Rwanda WASH Phase 1", ... },
  "startDate": "2026-01-01",
  "endDate": "2026-03-31",
  "status": "published",
  "sections": {
    "executiveSummary": "...",
    "challengesLessons": "...",
    "indicators": [
      {
        "indicatorName": "# of people with access to clean water",
        "code": "WASH-01",
        "unit": "people",
        "value": 4250,
        "target": 5000,
        "progressPct": 85,
        "status": "at_risk",
        "narrative": "...",
        "resultNode": { "level": "output", "title": "500 water points installed" }
      }
    ],
    "activities": [...],
    "budget": {
      "totalPlanned": 125000,
      "totalActual": 98500,
      "burnRate": 78.8,
      "lines": [...]
    }
  }
}
```

---

### Update report narrative

```http
PATCH /orgs/:orgId/reports/:id
```

```json
{
  "sections": {
    "executiveSummary": "Updated summary text...",
    "challengesLessons": "Key challenge: delayed procurement due to...",
    "recommendations": "Going forward, we recommend..."
  }
}
```

---

### Publish report

```http
PATCH /orgs/:orgId/reports/:id
{ "status": "published" }
```

---

### Delete report

```http
DELETE /orgs/:orgId/reports/:id
```

Returns `204 No Content`. Revoking an active share link also happens automatically.

---

## Share Links

### Generate share link

```http
PATCH /orgs/:orgId/reports/:id/share
```

**Response**

```json
{
  "shareToken": "550e8400-e29b-41d4-a716-446655440000",
  "shareUrl": "https://app.impactmel.com/r/550e8400-e29b-41d4-a716-446655440000"
}
```

---

### Regenerate share link

```http
PATCH /orgs/:orgId/reports/:id/share/regenerate
```

The old token is immediately invalidated.

---

### Revoke share link

```http
DELETE /orgs/:orgId/reports/:id/share
```

Sets `shareToken = null`. All existing public links return `404`.

---

## Public Report (No Auth)

### Get public report

```http
GET /reports/share/:token
```

No authentication required. Returns the same full report object as the authenticated endpoint.

Returns `404` if:
- Token doesn't exist
- Token has been revoked
- Token has expired (if `shareExpiresAt` is set)
