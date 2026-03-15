# Donors

## Overview

The Donors module maintains a registry of all funding organizations. Donors are linked to programs (many-to-many) and their details are used in report cover pages and financial summaries.

---

## Data Structure

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| orgId | uuid | Owner org |
| name | string | Full donor name |
| code | string | Short abbreviation (e.g. "USAID", "GIZ") |
| type | enum | Donor classification |
| country | string | Donor country of origin |
| website | string | Optional URL |
| contactName | string | Primary contact |
| contactEmail | string | Contact email |
| notes | text | Internal notes |

### Donor Types

| Type | Examples |
|---|---|
| `bilateral` | USAID, FCDO, GIZ, AFD |
| `multilateral` | UNICEF, WHO, World Bank, EU |
| `private` | Private foundations, corporations |
| `ngo` | International NGO sub-grants |
| `government` | Host government funding |
| `other` | Any other source |

---

## Managing Donors

### Via UI

Navigate to **Settings** → **Donors & Funders**.

Features:
- Search/filter by name or type
- Add new donors with the **+ New Donor** button
- Edit or delete from the action menu in the table
- Type badges with color coding

### Via API

```http
# List donors
GET /orgs/:orgId/donors

# Create donor
POST /orgs/:orgId/donors
{
  "name": "United States Agency for International Development",
  "code": "USAID",
  "type": "bilateral",
  "country": "United States",
  "contactName": "John Smith",
  "contactEmail": "jsmith@usaid.gov"
}

# Update
PATCH /orgs/:orgId/donors/:id
{ "contactEmail": "new@usaid.gov" }

# Delete
DELETE /orgs/:orgId/donors/:id
```

---

## Linking Donors to Programs

Donors are associated at the **program** level (not project level), since a program typically represents a single funding agreement.

```http
POST /orgs/:orgId/programs
{
  "name": "WASH for All",
  "donorIds": ["uuid-usaid", "uuid-giz"]
}
```

Or update later:

```http
PATCH /orgs/:orgId/programs/:id
{ "donorIds": ["uuid-usaid", "uuid-giz", "uuid-new"] }
```

### Inline Donor Creation

In the **New Program** form, the Donor Combobox allows you to type a new donor name — if it doesn't exist in the registry, a prompt appears to create it on the spot. The new donor is saved and automatically linked to the program.

---

## Donors in Reports

When a report is assembled, the donor's name and logo appear on the **cover page**. If a program has multiple donors, all are listed.

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId/donors` | List donors |
| POST | `/orgs/:orgId/donors` | Create donor |
| GET | `/orgs/:orgId/donors/:id` | Get donor |
| PATCH | `/orgs/:orgId/donors/:id` | Update donor |
| DELETE | `/orgs/:orgId/donors/:id` | Delete donor |
