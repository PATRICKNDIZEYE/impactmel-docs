# Reports

## Overview

The Reports module assembles donor-ready reports from your indicator data, narratives, budget summaries, and evidence attachments. Reports can be shared via a public link or exported as a binary PDF — no copy-paste, no email attachments.

```
Project data → Report Assembly → PDF / Public Link → Donor
```

---

## Report Types

| Type | Description |
|---|---|
| `quarterly` | Standard 3-month period report |
| `annual` | Full-year review |
| `ad_hoc` | Custom date range (any start/end) |

All types support the same assembly and sharing features.

---

## Report Sections

An assembled report contains:

| Section | Content |
|---|---|
| **Cover** | Project name, donor, period, org logo |
| **Executive Summary** | Narrative intro (editable) |
| **Progress Against Results** | Indicator values grouped by result node, with traffic-light scoring |
| **Activities** | List of completed activities in the period |
| **Budget Summary** | Spent vs. budgeted, burn rate, budget lines |
| **Challenges & Lessons** | Narrative section (editable) |
| **Attachments** | Linked documents (photos, surveys) |

---

## Creating a Report

### Via UI

1. Navigate to **Reports** in the sidebar
2. Click **New Report**
3. Select the project
4. Choose **report type**:
   - Select from existing reporting periods, **or**
   - Enter a custom start/end date for ad-hoc date range
5. Click **Generate** — the system assembles the report from approved indicator data
6. Edit narrative sections inline
7. Click **Publish** when ready to share

### Via API

```http
POST /orgs/:orgId/reports
{
  "projectId": "uuid",
  "title": "Q1 2026 Donor Report — WASH Program",
  "reportType": "quarterly",
  "periodIds": ["uuid1"],          // OR use custom dates:
  "startDate": "2026-01-01",
  "endDate": "2026-03-31"
}
```

The service:
1. Finds all `ReportingPeriod` records overlapping the date range
2. Loads `approved` and `submitted` `IndicatorReport` records within those periods
3. Aggregates values by each indicator's `aggregationMethod`
4. Fetches activities, budget lines, and attachments
5. Assembles into a structured `Report` object with sections

---

## Sharing a Report

### Generate a share link

```http
PATCH /orgs/:orgId/reports/:id/share
```

Response: `{ "shareToken": "uuid", "shareUrl": "https://app.impactmel.com/r/:token" }`

The link is accessible by **anyone with the URL** — no login required. Donors can bookmark it.

### Regenerate the link

```http
PATCH /orgs/:orgId/reports/:id/share/regenerate
```

Generates a new token. The old URL becomes invalid immediately.

### Revoke sharing

```http
DELETE /orgs/:orgId/reports/:id/share
```

Sets `shareToken = null` — all existing share links return 404.

---

## PDF Export

From the report view page or the public share page, click **Download PDF**.

The PDF is generated client-side using `html2pdf.js`:
- Captures the DOM report layout as a true binary PDF
- Multi-page support with proper breaks
- Org logo and header preserved
- No browser print dialog

---

## Public Report Page (`/r/:token`)

Donors open the share link in any browser:
- Full report rendered in read-only mode
- "Download PDF" button for offline use
- No login required
- Org branding displayed

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId/reports` | List reports |
| POST | `/orgs/:orgId/reports` | Create and assemble report |
| GET | `/orgs/:orgId/reports/:id` | Get report with sections |
| PATCH | `/orgs/:orgId/reports/:id` | Update narrative sections |
| DELETE | `/orgs/:orgId/reports/:id` | Delete report |
| PATCH | `/orgs/:orgId/reports/:id/share` | Generate share link |
| PATCH | `/orgs/:orgId/reports/:id/share/regenerate` | Regenerate share link |
| DELETE | `/orgs/:orgId/reports/:id/share` | Revoke share link |
| GET | `/reports/share/:token` | Get public report (no auth) |
