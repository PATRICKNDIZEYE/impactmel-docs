# Environment Setup

## Backend (`main/.env`)

Copy the example file and fill in every value before starting the server.

```bash
cp main/.env.example main/.env
```

| Variable | Required | Example | Description |
|---|---|---|---|
| `DATABASE_URL` | ✅ | `postgresql://user:pass@localhost:5432/impactmel` | Full PostgreSQL connection string |
| `JWT_SECRET` | ✅ | `a-long-random-string` | Signs all JWT tokens — keep secret, rotate on breach |
| `JWT_EXPIRY` | | `7d` | JWT TTL; defaults to `7d` |
| `PORT` | | `3001` | NestJS listen port |
| `GOOGLE_CLIENT_ID` | ✅ (OAuth) | `123.apps.googleusercontent.com` | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | ✅ (OAuth) | `GOCSPX-...` | Google OAuth app client secret |
| `GOOGLE_CALLBACK_URL` | ✅ (OAuth) | `https://api.impactmel.com/auth/google/callback` | Must match Google Console exactly |
| `FRONTEND_URL` | ✅ | `https://app.impactmel.com` | Used in CORS policy + OAuth redirect |
| `SMTP_HOST` | (email) | `smtp.sendgrid.net` | For password-reset emails |
| `SMTP_PORT` | (email) | `587` | SMTP port |
| `SMTP_USER` | (email) | `apikey` | SMTP username |
| `SMTP_PASS` | (email) | `SG.xxx` | SMTP password or API key |
| `SMTP_FROM` | (email) | `noreply@impactmel.com` | From address |
| `COOKIE_DOMAIN` | | `.impactmel.com` | Shared cookie domain for OAuth |
| `NODE_ENV` | | `production` | `development` \| `production` |

### Minimum local setup

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/impactmel
JWT_SECRET=dev-secret-change-in-production
PORT=3001
FRONTEND_URL=http://localhost:3000
```

---

## Frontend (`frontend/.env.local`)

```bash
cp frontend/.env.local.example frontend/.env.local
```

| Variable | Required | Example | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | `http://localhost:3001` | NestJS backend base URL |
| `NEXT_PUBLIC_APP_URL` | | `http://localhost:3000` | Frontend origin (used in share links) |

### Minimum local setup

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## PostgreSQL

ImpactMEL requires **PostgreSQL ≥ 14**. Extensions used:

- `uuid-ossp` — `uuid_generate_v4()` for primary keys (auto-installed via migration)

### Quick local DB

```bash
# macOS with Homebrew
brew install postgresql@16
brew services start postgresql@16
createdb impactmel
```

```bash
# Docker
docker run -d \
  --name impactmel-db \
  -e POSTGRES_DB=impactmel \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16
```

---

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**
2. Create an OAuth 2.0 Client ID (Web application)
3. Add authorized redirect URIs:
   - Local: `http://localhost:3001/auth/google/callback`
   - Production: `https://api.impactmel.com/auth/google/callback`
4. Copy Client ID and Client Secret into `.env`

::: warning
`GOOGLE_CALLBACK_URL` in `.env` must **exactly** match one of the URIs in Google Console — no trailing slash differences.
:::

---

## Production Checklist

- [ ] `JWT_SECRET` is at least 32 random characters
- [ ] `NODE_ENV=production`
- [ ] `COOKIE_DOMAIN` set to your shared root domain (e.g. `.impactmel.com`)
- [ ] SMTP credentials configured for password-reset flow
- [ ] Google OAuth redirect URIs updated to production URLs
- [ ] PostgreSQL with SSL (`?sslmode=require` in `DATABASE_URL`)
- [ ] Run `pnpm run migration:run` in `main/` after each deploy
