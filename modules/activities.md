# Activities & Participants

## Overview

Activities log the actual work done to achieve project outputs. Participants are the people who attend, benefit from, or are reached by those activities. Participant data can feed directly into indicator values (e.g., "# of people trained").

---

## Activities

### Data Structure

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| projectId | uuid | Parent project |
| outputId | uuid | Linked result framework Output node |
| title | string | Activity title |
| description | text | What was done |
| startDate | date | |
| endDate | date | |
| location | string | Where it happened |
| facilitator | string | Who led it |
| status | enum | `planned`, `in_progress`, `completed`, `cancelled` |

### Create an activity

```http
POST /orgs/:orgId/projects/:projectId/activities
{
  "title": "Community WASH training",
  "outputId": "uuid",
  "startDate": "2026-03-10",
  "endDate": "2026-03-10",
  "location": "Kigali, Gasabo District",
  "facilitator": "Jean Baptiste M.",
  "status": "completed"
}
```

### Activity list (frontend)

Navigate to **Project** → **Activities** tab. Activities are sorted by date, grouped by output node. Each row shows participant count and links to the detail page.

---

## Participants

Participants are individuals registered for a specific activity. Each participant can optionally have household member records (for household-level data collection).

### Participant Data Structure

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| firstName | string | |
| lastName | string | |
| sex | enum | `female`, `male`, `other` |
| dateOfBirth | date | For age disaggregation |
| phone | string | Optional contact |
| nationalId | string | Optional ID number |
| village | string | |
| district | string | |

### ActivityParticipant (join)

| Field | Type | Description |
|---|---|---|
| id | uuid | |
| activityId | uuid | |
| participantId | uuid | |
| role | string | e.g. "attendee", "facilitator" |
| attended | boolean | Confirmed attendance |
| registeredAt | timestamp | |

### Register participants

```http
POST /orgs/:orgId/activities/:activityId/participants
{
  "participants": [
    {
      "firstName": "Amina",
      "lastName": "Uwase",
      "sex": "female",
      "dateOfBirth": "1990-05-15",
      "village": "Nyamirambo",
      "district": "Kigali"
    }
  ]
}
```

---

## Household Members

For household surveys, each participant can have family members registered:

```http
POST /orgs/:orgId/participants/:participantId/household-members
{
  "name": "Emmanuel Uwase",
  "relationship": "son",
  "sex": "male",
  "age": 8
}
```

---

## Aggregating Participant Data into Indicators

After an activity, the system can compute indicator values from participant counts:

1. Go to **Activity** → **Participants**
2. Click **Push to Indicator**
3. Select the indicator and reporting period
4. The system pre-fills the value based on `COUNT(participants)` disaggregated by sex/age

This eliminates manual counting and ensures the indicator value matches the participant register.

---

## API Reference

| Method | Path | Description |
|---|---|---|
| GET | `/orgs/:orgId/projects/:projectId/activities` | List activities |
| POST | `/orgs/:orgId/projects/:projectId/activities` | Create activity |
| GET | `/orgs/:orgId/activities/:id` | Get activity |
| PATCH | `/orgs/:orgId/activities/:id` | Update activity |
| DELETE | `/orgs/:orgId/activities/:id` | Delete activity |
| GET | `/orgs/:orgId/activities/:id/participants` | List participants |
| POST | `/orgs/:orgId/activities/:id/participants` | Register participants |
| DELETE | `/orgs/:orgId/activities/:activityId/participants/:participantId` | Remove participant |
| GET | `/orgs/:orgId/participants/:id` | Get participant |
| PATCH | `/orgs/:orgId/participants/:id` | Update participant |
| POST | `/orgs/:orgId/participants/:id/household-members` | Add household member |
