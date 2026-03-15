# API Overview & Authentication

## Base URL

| Environment | URL |
|---|---|
| Development | `http://localhost:3001` |
| Production | `https://api.impactmel.com` |

## Interactive Docs (Swagger)

The NestJS backend auto-generates OpenAPI documentation at:

```
http://localhost:3001/api
https://api.impactmel.com/api
```

Swagger UI lets you explore all endpoints, view request/response schemas, and test calls directly in the browser.

---

## Authentication

All protected endpoints require a valid session. The API uses **HttpOnly cookie-based JWT authentication**.

### Cookie Auth (browser / frontend)

After login, the backend sets an HttpOnly cookie named `jwt`. The browser sends it automatically on every request.

```ts
// axios must be configured with withCredentials: true
const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
})
```

### Token Auth (API clients / scripts)

For non-browser clients, pass the JWT in the `Authorization` header:

```http
GET /orgs/uuid/programs
Authorization: Bearer <your-jwt-token>
```

Obtain a token by calling `POST /auth/login` and extracting the token from the response body (non-browser mode must request token in body — see auth endpoint docs).

---

## Common Headers

```http
Content-Type: application/json
Authorization: Bearer <token>   (if not using cookies)
```

---

## Response Format

All endpoints return JSON. Successful responses:

```json
// Single resource
{ "id": "uuid", "name": "...", ... }

// Collection
[{ "id": "uuid", ... }, ...]

// Created resource
{ "id": "uuid", ... }  // HTTP 201
```

### Error Responses

```json
{
  "statusCode": 400,
  "message": ["name should not be empty", "startDate must be a date"],
  "error": "Bad Request"
}
```

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

```json
{
  "statusCode": 403,
  "message": "You do not have permission to perform this action"
}
```

```json
{
  "statusCode": 404,
  "message": "Program not found"
}
```

---

## Org-Scoped Endpoints

Almost all endpoints are scoped under `/orgs/:orgId/`. The `:orgId` is the organization's UUID. Your JWT must contain membership in that org or the request returns `403`.

```
/orgs/:orgId/programs
/orgs/:orgId/projects
/orgs/:orgId/indicators
/orgs/:orgId/reports
/orgs/:orgId/donors
/orgs/:orgId/members
```

---

## Pagination

Collection endpoints that can return large datasets support cursor-based pagination:

```http
GET /orgs/:orgId/activities?page=1&limit=20
```

Response includes pagination metadata:

```json
{
  "data": [...],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

---

## Rate Limiting

The API uses NestJS Throttler with default limits:

| Window | Max requests |
|---|---|
| 60 seconds | 100 requests per IP |

Rate limit headers are included in every response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 97
X-RateLimit-Reset: 1700000060
```

Public endpoints (form submit, report share) have separate, more generous limits.

---

## Versioning

The API is currently at **v1** (unversioned URL — all endpoints are v1). A versioning strategy (`/v2/...`) will be introduced before any breaking changes.
