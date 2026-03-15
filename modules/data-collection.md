# Data Collection

## Overview

The Data Collection module lets you build custom forms, deploy them as shareable public links, and automatically route submissions into indicator reports. No spreadsheets, no email attachments — field staff fill in a URL on their phone and the data appears in the dashboard.

---

## Forms

### Form Data Structure

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| orgId | uuid | Owner org |
| projectId | uuid | Linked project |
| indicatorId | uuid | Optional — auto-populate indicator report |
| reportingPeriodId | uuid | Which period submissions count toward |
| title | string | Form title shown to respondents |
| description | text | Instructions |
| publicToken | uuid | URL-safe share token |
| isPublished | boolean | Whether form is accepting responses |
| closesAt | timestamp | Optional auto-close date |

### Form Fields

| Type | Description |
|---|---|
| `text` | Short text answer |
| `textarea` | Long text / paragraph |
| `number` | Numeric input |
| `select` | Single choice from options |
| `multi_select` | Multiple choices |
| `date` | Date picker |
| `boolean` | Yes / No |
| `location` | GPS coordinates or text location |
| `file` | File upload (PDF, photo) |

### Conditional Logic

Fields can be shown or hidden based on previous answers:

```json
{
  "type": "select",
  "label": "Do you have a handwashing station?",
  "key": "has_station",
  "options": ["Yes", "No"]
},
{
  "type": "text",
  "label": "Describe the station",
  "key": "station_description",
  "showIf": { "field": "has_station", "equals": "Yes" }
}
```

---

## Building a Form

### Via the UI

1. Navigate to **Data Collection** in the sidebar
2. Click **New Form**
3. Add fields using the drag-and-drop builder
4. Set conditional rules using the **Logic** panel
5. Link to a project, indicator, and reporting period
6. Click **Publish** to generate the public link

### Via API

```http
POST /orgs/:orgId/forms
{
  "title": "WASH Household Survey",
  "projectId": "uuid",
  "indicatorId": "uuid",
  "reportingPeriodId": "uuid",
  "fields": [
    { "type": "text", "label": "Household name", "key": "hh_name", "required": true },
    { "type": "number", "label": "# of members", "key": "hh_members", "required": true },
    { "type": "select", "label": "Water source", "key": "water_source",
      "options": ["Piped", "Borehole", "River", "Other"] }
  ]
}
```

---

## Sharing a Form

Once published, the form is accessible at:

```
https://app.impactmel.com/form/:publicToken
```

No login required. The respondent fills in the form and clicks **Submit**.

You can:
- Copy the link from **Data Collection** → form row → **Share**
- Generate a QR code (from the share dialog)
- Reset the token to invalidate old links

---

## Submissions

Each submission creates a `FormSubmission` with `FormAnswer` records for each field.

### View submissions

```http
GET /orgs/:orgId/forms/:id/submissions
```

Returns all submissions with answers, timestamps, and optional geolocation.

### Auto-populate indicator report

If the form is linked to an `indicatorId`:
1. On submission, the service checks `Form.indicatorId` and `Form.reportingPeriodId`
2. Finds or creates an `IndicatorReport` for this project + indicator + period
3. Increments the value by `1` (count-based) or extracts a specific field value
4. The indicator report status stays `draft` until an M&E officer reviews it

---

## Public Form Page

The public form page (`/form/:token`) is:
- Fully responsive (mobile-first)
- No login required
- Branding shows "Powered by ImpactMEL"
- Submission confirmation shows a thank-you message

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId/forms` | List forms |
| POST | `/orgs/:orgId/forms` | Create form |
| GET | `/orgs/:orgId/forms/:id` | Get form with fields |
| PATCH | `/orgs/:orgId/forms/:id` | Update form |
| DELETE | `/orgs/:orgId/forms/:id` | Delete form |
| POST | `/orgs/:orgId/forms/:id/publish` | Publish form |
| POST | `/orgs/:orgId/forms/:id/unpublish` | Unpublish form |
| GET | `/orgs/:orgId/forms/:id/submissions` | List submissions |
| GET | `/forms/public/:token` | Load public form (no auth) |
| POST | `/forms/public/:token/submit` | Submit response (no auth) |
