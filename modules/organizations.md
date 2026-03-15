# Organizations

## Overview

An **Organization** is the top-level tenant in ImpactMEL. All data — programs, projects, indicators, reports — belongs to exactly one organization. There is no cross-org data sharing.

## Data Structure

| Field | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| name | string | Display name (e.g. "Save The Future Rwanda") |
| code | string | Short slug (e.g. "STF-RW") — unique |
| logoUrl | string | Optional logo image URL |
| createdAt | timestamp | |

## First-Time Setup

When a new user registers, they are prompted to create their organization:

1. User registers or logs in for the first time
2. No `organizationId` in JWT → org setup modal appears
3. User enters org name and code
4. Backend creates the org, creates an `OrgMember` record with role `org_admin`
5. JWT is refreshed with the new `organizationId`
6. User lands on `/org/:orgId/dashboard`

## Members & Roles

Each user-org relationship is stored in `org_members`:

| Role | Description |
|---|---|
| `org_admin` | Full control: manage members, settings, programs |
| `me_officer` | Manage M&E: indicators, periods, approve reports |
| `reporter` | Submit data for assigned projects |
| `viewer` | Read-only dashboards and reports |

### Invite a member

```http
POST /orgs/:orgId/members
{ "email": "colleague@example.org", "role": "me_officer" }
```

An invitation email is sent. On acceptance, the user is added to the org.

### Update role

```http
PATCH /orgs/:orgId/members/:userId
{ "role": "org_admin" }
```

### Remove member

```http
DELETE /orgs/:orgId/members/:userId
```

## Settings

Org-level settings are accessible at `/org/:orgId/settings`:

- **General** — name, code, logo
- **Members** — invite, change roles, remove
- **Donors & Funders** — manage donor registry
- **Billing** — (future) subscription management

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId` | Get org details |
| PATCH | `/orgs/:orgId` | Update org name/code/logo |
| GET | `/orgs/:orgId/members` | List members |
| POST | `/orgs/:orgId/members` | Invite member |
| PATCH | `/orgs/:orgId/members/:userId` | Change member role |
| DELETE | `/orgs/:orgId/members/:userId` | Remove member |
