# Security and data

<p class="lead">This page summarises the controls in place today, as published in the ImpactMEL trust centre. For the full detail, and for questions from your IT reviewer, see the <a href="https://www.impactmel.com/trust/security-overview">security overview</a> and <a href="https://www.impactmel.com/trust/hosting-and-residency">hosting and residency</a> pages.</p>

## Certification

ImpactMEL is not yet certified against SOC 2 or ISO 27001. The controls below are in place today, and each can be shown in a session with your IT reviewer present.

## Controls in place

- **Separation.** Each organisation has its own address and sign-in, and every request is limited to its own data. Contracted and self-hosted organisations run in a dedicated instance with their own database, storage and backups.
- **HTTPS everywhere.**
- **Backups.** Automated backups, with an off-site copy.
- **Server access** by SSH key only, never passwords.
- **Sign-in.** Email and password with address verification, optional Google sign-in, and rate limiting on sign-in attempts. External collaborators are invited as users, so every action has a person behind it.
- **Role-based access** built from permission sets, with viewers narrowed to the projects they are assigned. See [Roles](/roles/).
- **Audit trail.** Each audit event records who acted, on what, the action, and the full state before and after the change. Access logs record views as well as edits.
- **Sharing that can be withdrawn.** Read-only links can be revoked, and dashboard links expire. See [Sharing dashboards](/manual/sharing-dashboards) and [Reports](/manual/reports#share-a-report).
- **Published reports carry a payload hash**, so a figure quoted to a donor can be reproduced exactly as it stood on the day it was published.

## Your data

- **Ownership.** Your organisation owns its data, in the managed cloud and on your own infrastructure alike.
- **Export.** Your data can be exported at any time. Export is a permission that can be granted separately from viewing.
- **GDPR.** ImpactMEL is GDPR compliant and has an appointed Data Protection Officer. Write to [inquiries@impactmel.com](mailto:inquiries@impactmel.com) to reach them.

## Where your data sits

ImpactMEL runs in two ways:

- **Managed cloud.** We run the infrastructure and apply updates. Each organisation runs in its own isolated instance, served over HTTPS, with automated backups and an off-site copy.
- **On your own servers.** The application runs inside your own infrastructure and the database never leaves it. Use this where residency is written into your funding agreement or national policy.

The application, roles, audit trail and sign-in controls are the same in both. See [hosting and residency](https://www.impactmel.com/trust/hosting-and-residency).

## AI and your data

AI features work from your workspace's own data and are optional. An administrator can switch them off. See [AI features](/manual/ai).
