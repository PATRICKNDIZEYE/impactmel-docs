# Authentication

## Overview

ImpactMEL supports two authentication methods:
- **Email / Password** — standard credential login with bcrypt hashing
- **Google OAuth 2.0** — one-click sign-in via Google

Both methods result in a **JWT stored in an HttpOnly cookie** — tokens are never exposed to JavaScript.

---

## Email Authentication

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "jane@example.org",
  "password": "SecurePass123!",
  "firstName": "Jane",
  "lastName": "Doe"
}
```

Response: `201 Created` with user object. Cookie is set.

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "jane@example.org",
  "password": "SecurePass123!"
}
```

Response: `200 OK` with user object. HttpOnly JWT cookie set.

### Forgot Password

```http
POST /auth/forgot-password
{ "email": "jane@example.org" }
```

Sends a reset email with a time-limited link. The link contains a single-use token.

```http
POST /auth/reset-password
{ "token": "...", "password": "NewSecurePass456!" }
```

---

## Google OAuth

1. Redirect the user to `/auth/google`
2. User authenticates with Google
3. Google redirects to `/auth/google/callback`
4. Backend creates/finds user, sets HttpOnly cookie
5. Backend redirects to `FRONTEND_URL/auth/callback?user={...encoded...}`
6. Frontend parses user data, fetches org list, redirects to dashboard

### Frontend callback handler (`/auth/callback`)

```ts
// Reads user from URL params (NOT the token — that's in the HttpOnly cookie)
const user = JSON.parse(decodeURIComponent(searchParams.get('user')))
authService.saveUserData(user)
const orgs = await authService.getOrganizations()
router.replace(`/org/${orgs[0].id}/dashboard`)
```

---

## Logout

```http
POST /auth/logout
```

Clears the HttpOnly cookie. Frontend should clear local user state.

---

## Frontend Auth Service (`lib/auth.ts`)

```ts
// Save display data (not token — cookie handles auth)
authService.saveUserData(user)

// Get current user from local storage
authService.getCurrentUser()

// Check if logged in (presence of user data)
authService.isAuthenticated()

// Clear session
authService.logout()
```

---

## JWT Structure

```json
{
  "sub": "uuid",
  "email": "jane@example.org",
  "organizationId": "uuid",
  "role": "me_officer",
  "iat": 1700000000,
  "exp": 1700604800
}
```

Default expiry: **7 days** (`JWT_EXPIRY` env var).

---

## Guards

All non-public controllers use `JwtAuthGuard`:

```ts
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('programs')
export class ProgramsController { ... }
```

Role-specific endpoints add `RolesGuard`:

```ts
@Roles('org_admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete(':id')
remove(...) { ... }
```
