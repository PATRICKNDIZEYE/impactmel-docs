---
title: Activities and participants
chapter: 13
roles:
  - reporter
  - me_officer
  - org_admin
---

# Activities and participants

**Activities** are the work your team does — training sessions, community meetings, site visits, construction. **Participants** are the people who attend.

Recording both gives you an auditable log of what was done and who was reached, and lets you link that work to the outputs in your results framework.

---

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/66-participants.mp4" title="66 · The participant registry" duration="23s" />
</div>

## Activities

Open the project, then **Activities** in the left rail. The page is headed **Activities**, with the line *Plan and track field activities, workshops, and events.*

{{figure:activities-list}}

Each card shows a status chip — **Planned**, **In Progress**, **Completed** or **Cancelled** — its dates, how many participants are registered, its budget, and how many sub-activities it has. Sub-activities are nested under their parent and tagged **Sub-activity**.

### Logging an activity

Click **New Activity**. The page is headed **New Activity**. Only **Activity Name** is required.

{{figure:new-activity}}

#### Basic Information

| Field | Required | What it is for |
|---|---|---|
| **Activity Name** | Yes | A clear title |
| **Activity Code** | | A short reference |
| **Activity Type** | | Training, Meeting, Distribution, Assessment, Campaign, Construction or Other |
| **Status** | | Planned, In Progress, Completed or Cancelled |
| **Description** | | Method, materials, anything else |

#### Schedule

**Planned Start Date**, **Planned End Date**, **Venue**, and **Location (admin unit + GPS pin)**.

#### Participants & Budget

**Target Total**, **Target Female**, **Target Male**, **Target Youth** and **Budget Planned**. These are what you expect, not what happened.

#### Management

**Responsible Person**, and **Parent Activity** — leave it as *None — top-level activity*, or choose a parent to make this a sub-activity.

Click **Create Activity**.

Dates can be in the past or the future. Activities sort chronologically.

---

## An activity's page

Click any activity.

{{figure:activity-detail}}

The header carries chips for **Schedule**, **Venue**, **Registered** and **Linked Indicators**, with buttons for **Participants**, **Edit** and **Delete**.

Four cards read the activity at a glance: **Attendance**, **Budget Burn**, **Indicator Coverage** and **Sub-activity Flow**.

Below them:

| Panel | What it does |
|---|---|
| **Activity Intelligence** | What the figures add up to |
| **Indicators** | **New** creates one; **Link Existing** attaches one that exists. Each linked indicator can be unlinked |
| **Sub-activities** | **Add Sub-activity** |
| **Participant Targets** | Total, female, male and youth targets |
| **Budget & Attendance Pulse** | Planned against actual |
| **Linked Output** | **Link Output** attaches the output in the results framework this activity delivers; **Unlink** removes it |
| **Participation Composition** | Who actually came |

::: tip Link the output
An activity linked to an output is what makes the output card in the results framework show **N activities**. Without the link, the framework cannot show what is delivering the result.
:::

---

## Attendance

Click **Participants** on an activity. The page is headed **Participants**, with the line *Manage registrations and attendance for this activity.*

Four figures: **Total**, **Registered**, **Attended** and **Absent**.

The table has columns for Name, Gender, Phone, National ID, Status and an action. **Status** is a dropdown on each row — set it to **Registered**, **Attended** or **Absent**. The bin icon unregisters someone added by mistake.

{{figure:activity-participants}}

### Registering someone

Click **Register Participant**. The dialog has two modes.

**Select Existing** searches the registry by name, phone or national ID. Type at least two characters. Click **Add** on the row. Someone already registered is shown as such.

**Create New** registers a new person and adds them in one step: First Name, Last Name, Gender, Phone, Email, National ID, Date of Birth, **Location**, and checkboxes for **Person with disability** and **Household head**. Click **Create and Register**.

::: tip Search before you create
Searching the registry first is what stops the same person existing three times under slightly different spellings.
:::

---

## The participant registry

Reach it with **⌘K**, then type *Participants*. The page is headed **Participants**, with the line *Registry of all participants across activities.*

It is org-wide, not per project. Columns: Name, Gender, Phone, Location, National ID and **Household**, which counts household members. Twenty-five to a page, with **Previous** and **Next**.

Two filters: a search box for name, phone, national ID or district, and a gender dropdown.

### Registering a participant

Click **New Participant**, or use **New** ▾ → **New participant** in the top bar. The page is headed **Register Participant**.

{{figure:participant-register-new}}

| Section | Fields |
|---|---|
| **Personal Information** | First Name (required), Last Name (required), Gender, Date of Birth, Phone, Email, National ID |
| **Location** | The location picker |
| **Additional Info** | **Person with disability**, **Household head** |
| **Household Members** | See below |

Click **Register Participant**.

### Household members

Where you work at household level, register the family alongside the participant.

1. Click **Add Member**.
2. Each block is headed **Member 1**, **Member 2** and so on. Fill in First Name, Last Name, Gender, Date of Birth, **Relationship** (Spouse, Child, Parent, Sibling or Other), and tick **Person with disability** if it applies.
3. The bin icon removes a member.

Only members with both a first and last name are saved.

---

## Exporting participants

Go to **Settings → Export Data**, tick **Participants**, and click **Export Now**. You get a single org-wide sheet with Name, Gender, Age, Phone, Location and Status.

To export the activities themselves, tick **Activities** in the same place. That gives you one sheet per project with the activity, its status, dates, participant count, location and remarks.

---

## Common questions

**Can one person attend several activities?**
Yes. Register them once in the registry, then add them to each activity with **Select Existing**.

**What if I got someone's details wrong?**
Open them in the registry and edit them. The correction follows them everywhere.

**Can I import a participant list from a spreadsheet?**
Not into the participant registry. Register people one at a time, or collect them through a [form](/user-manual/forms) with a **Participant** field.

**Can an activity's attendance become an indicator figure?**
Not directly. Link the indicator to the activity so the connection is recorded, then report the figure through [Progress Reports](/user-manual/data-entry).

---

## Where to go next

- [Results framework](/user-manual/results-framework) — the outputs activities deliver
- [Forms](/user-manual/forms) — collecting attendance in the field
- [Entering data](/user-manual/data-entry) — turning what happened into a reported figure
