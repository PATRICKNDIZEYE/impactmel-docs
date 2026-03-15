# Programs API

## Endpoints

### List programs

```http
GET /orgs/:orgId/programs
```

**Response**

```json
[
  {
    "id": "uuid",
    "name": "WASH for All",
    "description": "...",
    "startDate": "2025-01-01",
    "endDate": "2027-12-31",
    "status": "active",
    "donors": [{ "id": "uuid", "name": "USAID", "code": "USAID" }],
    "projectCount": 3,
    "createdAt": "2025-01-15T10:00:00Z"
  }
]
```

---

### Create program

```http
POST /orgs/:orgId/programs
```

**Body**

```json
{
  "name": "WASH for All",
  "description": "Comprehensive WASH program targeting 50,000 HHs",
  "startDate": "2025-01-01",
  "endDate": "2027-12-31",
  "donorIds": ["uuid-usaid", "uuid-giz"]
}
```

**Required fields:** `name`, `startDate`, `endDate`

**Response:** `201 Created` with the created program object.

---

### Get program

```http
GET /orgs/:orgId/programs/:id
```

**Response**

```json
{
  "id": "uuid",
  "name": "WASH for All",
  "description": "...",
  "startDate": "2025-01-01",
  "endDate": "2027-12-31",
  "status": "active",
  "donors": [...],
  "projects": [
    { "id": "uuid", "name": "Rwanda WASH Phase 1", "status": "active" }
  ]
}
```

---

### Update program

```http
PATCH /orgs/:orgId/programs/:id
```

**Body** — any subset of program fields:

```json
{
  "status": "completed",
  "endDate": "2026-12-31"
}
```

---

### Delete program

```http
DELETE /orgs/:orgId/programs/:id
```

Returns `204 No Content`. Cannot delete a program with active projects.

---

## Projects under a Program

### List projects

```http
GET /orgs/:orgId/programs/:programId/projects
```

### Create project

```http
POST /orgs/:orgId/programs/:programId/projects
```

**Body**

```json
{
  "name": "Rwanda WASH Phase 1",
  "code": "WASH-RW-01",
  "budget": 500000,
  "currency": "USD",
  "startDate": "2025-01-01",
  "endDate": "2026-12-31",
  "location": "Rwanda",
  "status": "active"
}
```

---

## Program-Donor Relationship

### Get program donors

```http
GET /orgs/:orgId/programs/:id/donors
```

### Update program donors

```http
PATCH /orgs/:orgId/programs/:id
{ "donorIds": ["uuid1", "uuid2", "uuid3"] }
```

Sends the **full array** of donor IDs — the backend syncs the relationship (adds new, removes old).
