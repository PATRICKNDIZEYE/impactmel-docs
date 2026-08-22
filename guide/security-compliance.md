# Security & Compliance

ImpactMEL is built for organizations that handle sensitive beneficiary data, financial information, and donor-restricted program data. This page explains, in plain language, how your data is protected and what your IT reviewers and donors will want to know.

---

## Signing in safely

- Sessions use **secure, browser-managed cookies** that scripts on a page can never read — the design that closes off the most common web attack on session tokens.
- **Sign in with Google** is available; ImpactMEL stores no password for Google-signed accounts.
- Sessions expire after seven days, so access always re-confirms itself. An administrator can also revoke any member instantly by removing them from the organization.

---

## Who can see and do what

Every action is checked against the member's role in your organization:

| Role | Access |
|---|---|
| **Org admin** | Full access: members, settings, all programs and data |
| **M&E officer** | Create and manage indicators, forms, reporting periods, and reports |
| **Reporter** | Submit data against assigned indicators for open periods |
| **Viewer** | Read-only access to approved data and published reports |

Roles are assigned per organization, and a person can hold different roles in different organizations.

### Your organization's data is isolated

Every piece of data belongs to exactly one organization, and every request is confined to the requester's own organization. There is no way for a user — even a deliberately crafted request — to reach another organization's programs, indicators, or beneficiaries. This isolation is systematically verified across the platform.

### Public report links

Reports you choose to share by link are read-only, scoped to that single report, and revocable at any time by your admin. Recipients need no account — and a shared link can never lead onward to anything else in your workspace.

---

## How your data is protected

- **Encrypted in transit** — all traffic runs over HTTPS.
- **Separated infrastructure** — application servers are not directly internet-accessible, and the database lives apart from them.
- **Daily backups with point-in-time recovery**, so an incident never means losing your program history.
- **Non-guessable identifiers** throughout, so records cannot be discovered by counting upward through IDs.
- **Approval trail** — every submission carries who entered it, who reviewed it, and when; approved records cannot be silently edited.

---

## Your data is yours

- Export your organization's data — programs, indicators, submissions, participants — whenever you need it, from **Settings → Export**.
- ImpactMEL does not sell or share customer or beneficiary data.
- On contract end, your data is returned on request and then removed from our systems.

For organization-hosted deployments, all data lives on **your** servers under your policies from day one.

---

## What to send your donor or IT reviewer

Most due-diligence questionnaires are covered by four statements:

1. Data is isolated per organization, encrypted in transit, and backed up daily with point-in-time recovery.
2. Access is role-based, revocable instantly, and every data change carries an audit trail.
3. Data is exportable by the customer at any time and is never sold or shared.
4. An organization-hosted option exists for data-sovereignty requirements.

Need a formal security summary or a Data Processing Agreement for a proposal? [Contact us](https://impactmel.com/contact) — we provide both.
