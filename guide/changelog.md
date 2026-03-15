# Changelog

All notable changes to ImpactMEL are documented here.

---

## v1.0.0 — 2026-03

Initial production release.

### Core Platform
- Multi-org architecture with role-based access control (org_admin, me_officer, reporter, viewer)
- JWT + Google OAuth authentication with HttpOnly cookie sessions
- Full TypeORM migration system — zero-downtime schema evolution

### Results Framework
- Impact → Outcome → Output → Activity hierarchy
- Visual tree editor in the frontend
- Link indicators to any result node

### Indicators
- Flexible aggregation: sum, average, latest, min, max
- Disaggregation support (sex, age, location)
- Formula indicators (cross-indicator computed values)
- Automated progress scoring vs targets

### Data Collection
- Dynamic form builder with conditional logic
- Shareable public form links (no login required)
- Submissions automatically feed into indicator reports

### Reporting
- Reporting periods with configurable start/end dates
- Custom date-range report generation
- PDF binary export (html2pdf)
- Public shareable report links with regeneration
- Auto-assembled sections: narrative, indicators, budget, attachments

### Budget & Finance
- Budget lines per project
- Burn rate tracking
- Currency support per project

### Donors
- Donor profiles with type classification (bilateral, multilateral, private, etc.)
- Donor linked to multiple programs
- Per-donor reporting timeline configuration

### Activities & Participants
- Activity log per project/output
- Participant registration with household member data
- Aggregation into indicator values

### Infrastructure
- Swagger docs at `/api`
- NestJS modular architecture
- Next.js 14 App Router frontend
- Local search (VitePress)

---

## Roadmap

| Feature | Status |
|---|---|
| Mobile app (React Native) | Planned |
| Advanced analytics dashboards | In progress |
| Webhook integrations | Planned |
| DHIS2 data sync | Planned |
| Bulk import via Excel | Planned |
| Offline data collection | Planned |
