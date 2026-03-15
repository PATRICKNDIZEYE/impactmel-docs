# Security Model

## Authentication

ImpactMEL uses **JWT tokens stored in HttpOnly cookies** — not localStorage.

```
Login (email/password or Google OAuth)
  → Backend validates credentials
  → Signs JWT with JWT_SECRET (HS256)
  → Sets HttpOnly, Secure, SameSite=None cookie
  → Frontend never touches the token directly
```

HttpOnly cookies cannot be read by JavaScript, eliminating the XSS-to-token-theft attack vector.

### Token Validation

Every protected endpoint is guarded by `JwtAuthGuard` (NestJS Passport guard):

```ts
@UseGuards(JwtAuthGuard)
@Get(':id')
async findOne(@Param('id') id: string, @CurrentUser() user: User) { ... }
```

The `@CurrentUser()` decorator extracts the decoded JWT payload from the request object.

### Google OAuth Flow

```
1. User clicks "Sign in with Google"
2. Frontend → GET /auth/google  (redirects to Google)
3. Google → GET /auth/google/callback?code=...
4. Backend exchanges code for profile
5. Creates/finds user in DB
6. Sets HttpOnly cookie with JWT
7. Redirects to /auth/callback?user={...encoded...}
8. Frontend reads user data from URL params (not the token)
9. Frontend redirects to /org/:orgId/dashboard
```

---

## Authorization (RBAC)

### Roles

| Role | Scope | Can do |
|---|---|---|
| `org_admin` | Organization | Everything: manage members, settings, create programs |
| `me_officer` | Organization | Manage indicators, reporting periods, approve reports |
| `reporter` | Project | Submit indicator reports and form data |
| `viewer` | Organization | Read-only access to dashboards and reports |

### Enforcement

Authorization is enforced in **two layers**:

1. **Guard-level** — `RolesGuard` rejects requests if the user's role doesn't meet the minimum for the endpoint:

```ts
@Roles('me_officer', 'org_admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Post('reporting-periods')
create(@Body() dto: CreateReportingPeriodDto) { ... }
```

2. **Service-level** — every service method takes `orgId` and scopes all queries:

```ts
async findAll(orgId: string) {
  return this.repo.find({ where: { orgId } });
}
```

There is no reliance on the frontend to enforce permissions — the backend is the source of truth.

---

## Multi-Org Isolation

Each organization's data is isolated by `org_id` columns on every table. Even if an attacker has a valid JWT from Org A, they cannot access Org B's data because:

- The `orgId` is extracted from route params (not the token)
- But the service validates that the requesting user **belongs to** that org before responding
- Every DB query includes `WHERE org_id = $1`

---

## Public Endpoints

Some endpoints are intentionally unauthenticated:

| Endpoint | Purpose |
|---|---|
| `GET /auth/google` | Initiate OAuth |
| `GET /auth/google/callback` | OAuth callback |
| `POST /auth/login` | Email login |
| `POST /auth/register` | New account |
| `POST /auth/forgot-password` | Password reset request |
| `GET /reports/share/:token` | Read public shared report |
| `GET /forms/public/:token` | Load public form |
| `POST /forms/public/:token/submit` | Submit form response |

Public report and form endpoints are rate-limited and token-scoped — no org data leaks without an explicit share token.

---

## Password Security

- Passwords hashed with **bcrypt** (cost factor 12)
- Password reset uses single-use time-limited tokens (emailed)
- No plaintext passwords ever stored or logged

---

## CORS Policy

```ts
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true,   // required for cookie-based auth
});
```

In production, `FRONTEND_URL` = `https://app.impactmel.com` — only this origin can make credentialed requests.

---

## Security Checklist for Deployment

- [ ] `JWT_SECRET` is cryptographically random, ≥ 32 chars
- [ ] Cookies have `Secure` flag (HTTPS only)
- [ ] `SameSite=None` + `Secure` for cross-subdomain cookie sharing
- [ ] `COOKIE_DOMAIN` set to `.impactmel.com` (with leading dot)
- [ ] CORS restricted to production frontend URL
- [ ] Rate limiting enabled (NestJS Throttler)
- [ ] PostgreSQL user has least-privilege (no DROP, no schema changes)
- [ ] Environment variables not committed to version control
- [ ] Google OAuth redirect URIs locked to production domains
