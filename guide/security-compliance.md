# Security & Compliance

ImpactMEL is designed for organizations handling sensitive beneficiary data, financial information, and donor-restricted program data. This page describes the security architecture, data handling practices, and compliance posture.

---

## Authentication

### Cookie-based JWT

ImpactMEL uses **HttpOnly, Secure, SameSite cookies** to transmit session tokens — not localStorage.

```
Login → Backend validates credentials
     → Signs JWT (HS256, 7-day expiry)
     → Sets HttpOnly cookie (browser only, not readable by JavaScript)
     → All subsequent requests carry cookie automatically
```

This eliminates the most common web attack vector: XSS scripts stealing tokens from localStorage.

### Google OAuth

Organizations can enable Sign in with Google. The OAuth flow redirects through Google, exchanges the authorization code server-side, and sets the same HttpOnly cookie. No passwords are stored for OAuth users.

### Token expiry

Tokens expire after 7 days. There is no silent refresh that extends this indefinitely — users re-authenticate periodically. Admins can revoke access instantly by removing a member from the organization.

---

## Authorization

### Role-based access control

Every request is validated against the user's role within the organization. Four roles are supported:

| Role | Access |
|---|---|
| `org_admin` | Full access: members, settings, all programs and data |
| `me_officer` | Create and manage indicators, forms, reporting periods, reports |
| `reporter` | Submit data against assigned indicators for current periods |
| `viewer` | Read-only access to approved data and published reports |

Roles are assigned per organization. A user can belong to multiple organizations with different roles in each.

### Organization isolation

**All data is scoped to the organization**. Every API query filters by `orgId` derived from the authenticated user's JWT. There is no mechanism for users to access data from another organization — not even by constructing a request manually.

This was verified through a systematic audit of all list endpoints in the backend. Each service method that returns data joins through the organization chain (`project → program → org`) before executing.

### Public report access

Reports can be shared via a public link. Public report access is:
- Read-only
- Scoped to a single report
- Controlled by the organization admin (can be revoked)
- Requires no account

Public endpoints are explicitly separated from authenticated endpoints and cannot traverse to other data.

---

## Infrastructure

### Hosting

ImpactMEL is deployed on cloud infrastructure with the following characteristics:

- API servers in a private subnet, not directly internet-accessible
- PostgreSQL database separate from application servers
- All traffic over HTTPS (TLS 1.2+)
- Database backups on a daily schedule with point-in-time recovery

### Database

PostgreSQL 16 is used as the primary data store. Key practices:

- UUID primary keys (not sequential integers, which would allow enumeration)
- Parameterized queries via TypeORM (no raw string concatenation in SQL)
- No sensitive fields in plaintext (passwords hashed with bcrypt)
- `settingsJson` fields for flexible metadata (no schema changes required for org-level customization)

### Secrets management

Environment variables are used for all secrets (`JWT_SECRET`, `SMTP_PASS`, `DB_PASSWORD`, etc.). No secrets are committed to source control. Production environment variables are injected via the deployment platform.

---

## Email security

Transactional emails (invitations, password resets, notifications) are sent via authenticated SMTP (Zoho Mail, port 465, SMTPS).

- Sender domain: `impactmel.com`
- SPF and DKIM records configured on the sending domain
- Password reset links expire after 1 hour
- Invite tokens expire after 7 days

---

## Data handling

### Beneficiary data

ImpactMEL stores aggregated indicator values, not personally identifiable information about beneficiaries by default. If an organization uses the form builder to collect individual-level data, that data is stored within the organization's tenant and is not accessible to ImpactMEL staff or other organizations.

### Data residency

All data is stored in the region selected at deployment. For organizations with data residency requirements, dedicated deployment options are available — contact **support@impactmel.com**.

### Data export

Organizations can export their data at any time:
- Reports as PDF
- Indicator data via the API
- Full data export on request (no lock-in)

### Data retention

Data is retained for the duration of the organization's subscription. On account closure, data is retained for 30 days and then deleted upon written request.

---

## Compliance posture

ImpactMEL is not yet certified against formal compliance frameworks (SOC 2, ISO 27001). The architecture and practices described above are aligned with the requirements of these frameworks and formal certification is on the roadmap.

### GDPR

For organizations based in or processing data of people in the EU:

- ImpactMEL acts as a **data processor** on behalf of your organization (the data controller)
- A Data Processing Agreement (DPA) is available on request
- Data subject access and deletion requests can be fulfilled via the API or by contacting support

### Responsible disclosure

If you discover a security vulnerability in ImpactMEL, please report it responsibly to **security@impactmel.com**. We commit to acknowledging reports within 48 hours and providing a timeline for resolution.

---

::: tip Questions?
For security-related questions or to request a DPA, contact **security@impactmel.com**.
:::
