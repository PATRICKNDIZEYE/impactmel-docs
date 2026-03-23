# Roadmap

ImpactMEL is actively developed. This page covers what is shipped, what is in progress, and what is coming next. Priorities are informed by feedback from early organizations using the platform.

---

## Shipped — v1.0 (March 2026)

The initial production release covers the full M&E lifecycle for a single organization.

### Platform foundation
- Multi-tenant architecture: each organization is fully isolated
- JWT + Google OAuth authentication with HttpOnly cookie sessions
- Role-based access control: `org_admin`, `me_officer`, `reporter`, `viewer`
- Onboarding wizard: complete org setup in under 30 minutes

### Results framework
- Impact → Outcome → Output → Activity hierarchy
- Visual tree editor with drag-and-drop node management
- Indicator linking at any node level

### Indicators & reporting
- Flexible aggregation: sum, average, latest value, min, max
- Disaggregation dimensions: sex, age group, location, custom
- Formula indicators: computed values from other indicators
- Reporting periods: monthly, quarterly, semi-annual, annual cycles
- Progress scoring vs targets with automatic RAG status

### Data collection
- Full form builder with conditional logic
- Shareable public form links (no account required for respondents)
- Submission review workflow: submit → review → approve / return
- Form responses automatically feed indicator reports

### Reporting
- Report templates: reusable structures across programs
- One-click report assembly from approved data
- Public share links for donors (no login required)
- PDF export

### Budget & finance
- Budget lines per project activity or cost category
- Burn rate computation
- Budget summary in dashboard and reports

### Platform
- Real-time dashboard: indicator progress, deadlines, alerts
- Donor CRM: manage funder profiles and link them to programs
- Full REST API with OpenAPI documentation
- Email notifications: invitations, deadlines, approvals, weekly digest
- Scheduled cron reminders

---

## In progress — Q2 2026

### Mobile data collection app
A lightweight React Native companion for offline-capable form submissions. Designed for field staff in areas with intermittent connectivity. Responses sync when back online.

### Sub-grantee portal
Partner organizations can submit data directly into the system without a full ImpactMEL account. A parent organization grants scoped access; partners see only their assigned programs and indicators.

### Advanced report builder
Drag-and-drop report sections: charts, indicator tables, activity summaries, narrative blocks. Supports branded cover pages and custom headers per donor.

---

## Planned — Q3 2026

### AI narrative assistant
Draft indicator narrative text, suggest recommended actions based on indicator performance, and flag anomalies in submitted data. Runs on-platform with no data leaving the tenant.

### Geographic mapping
Plot project locations, participant reach, and indicator results on interactive maps. Supports choropleth views by admin boundary.

### Bulk data import
Upload historical data from Excel or CSV. Map columns to indicators and periods. Useful for organizations migrating from spreadsheet systems.

### Donor portal (self-service)
A dedicated login for donor organizations to track all grants in one place, across multiple implementing partners — without needing access to any one partner's full workspace.

---

## Under consideration

These items are being evaluated based on demand and feasibility:

- **IATI export** — publish to the International Aid Transparency Initiative standard
- **DHIS2 integration** — sync indicator values from DHIS2 for organizations bridging both systems
- **WhatsApp data submission** — lightweight data collection via messaging for populations without smartphones
- **Custom report templates per donor** — USAID PIRS, EU log frame, GIZ results matrix pre-built formats
- **Predictive indicators** — flag indicators at risk of missing targets before the period closes

---

## Feedback

If you represent an organization using ImpactMEL and have a specific requirement not listed here, contact the team at **support@impactmel.com**. Early users directly shape the roadmap.
