# Security & Compliance

ImpactMEL is not certified against SOC 2 or ISO 27001 yet. This page lists the controls in place today, in the same terms as the **[security overview](https://www.impactmel.com/trust/security-overview)** on impactmel.com. Each can be shown in a session with your IT reviewer present.

ImpactMEL is GDPR compliant and has an appointed Data Protection Officer.

---

## In place today

- Each organisation has its own address and sign-in, and every request is limited to its own data.
- Contracted and self-hosted organisations run in a dedicated instance with their own database, storage and backups.
- HTTPS everywhere.
- Automated backups, with an off-site copy.
- Server access by SSH key only, never passwords.
- Rate limiting on sign-in, and optional Google sign-in.
- Four default roles, with viewers narrowed to the projects they are assigned.
- A full audit trail with the value before every change, and access logs.
- Read-only funder links that expire and can be revoked.
- Your data stays yours, and can be exported at any time.

---

## Signing in

Email and password with address verification, optional Google sign-in, and rate limiting on sign-in attempts. External collaborators are brought in through organisation invitations rather than shared logins, so every audit event has a person behind it.

---

## Who can see and do what

Four roles per organisation by default, each built from a permission set and renameable to your own structure.

| Role | Access |
|---|---|
| **Org admin** | Full access: members, settings, all programmes and data |
| **M&E officer** | Create and manage indicators, forms, reporting periods and reports |
| **Reporter** | Submit data against assigned indicators for open periods |
| **Viewer** | Read-only access, narrowed to the projects they are assigned |

Viewers being narrowed to their projects is how an external reviewer sees one country and not the whole portfolio. See [Roles & Permissions](/user-manual/roles-permissions) for the full matrix.

---

## A record of every change

An audit event records the actor, the entity, the action and the full state before and after the change. Not a note that something was edited: the previous value, kept. Access logs record views alongside it.

---

## Sharing that can be withdrawn

Sharing runs by role, by organisation, by named user or by link. Each share carries a view or export permission, a label, an expiry and can be revoked. A donor link handed out in March does not have to be live in December.

---

## Where your data sits

ImpactMEL runs in two forms. In our cloud, each organisation runs in its own isolated instance, served over HTTPS, with automated backups and an off-site copy. On your own servers, the application brings the same roles, audit trail and sign-in controls, and the database never leaves your infrastructure. See **[hosting and residency](https://www.impactmel.com/trust/hosting-and-residency)**.

Your organisation owns its data in both models and can export it at any time from **Settings → Export Data**.

---

## For your IT reviewer

Send them this page with the security overview, the [hosting and residency](https://www.impactmel.com/trust/hosting-and-residency) page and the [privacy policy](https://www.impactmel.com/privacy). If your procurement team uses a security questionnaire, [send it to us](https://www.impactmel.com/contact) and we will answer it in writing, control by control.
