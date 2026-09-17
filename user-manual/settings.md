---
title: Settings and administration
chapter: 18
roles:
  - me_officer
  - org_admin
---

# Settings and administration

Settings is where the organisation, its people, and the reference data everything else depends on are managed.

Open it from your avatar → **Admin Console**, or press **⌘K** and type *Settings*.

---

## The eleven pages

The rail down the left holds eleven pages. Not all of them are open to every role.

| Page | What it is for | Who |
|---|---|---|
| **Organization** | Name, code, logo, country, currency, progress thresholds | M&E officer reads, org admin saves |
| **Members** | Who has access, and their roles | Owner or Admin |
| **Donors & Funders** | The donor registry | Org admin |
| **Reporting Periods** | The org-wide reporting calendar | M&E officer, org admin |
| **Disaggregations** | The dimensions figures are broken down by | M&E officer, org admin |
| **Units** | Units of measurement | M&E officer, org admin |
| **Roles & permissions** | Custom roles | Org admin |
| **Integrations** | Connections to external systems | Org admin |
| **Notifications** | What you are notified about | M&E officer, org admin |
| **Export Data** | Bulk export as a spreadsheet | M&E officer, org admin |
| **Audit Log** | Who changed what | Org admin |

A page your role cannot reach does not appear in the rail.

---

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/67-org-profile.mp4" title="67 · Organization profile and branding" duration="13s" />
  <VideoEmbed src="/videos/62-org-reporting-periods.mp4" title="62 · Manage organization reporting periods" duration="17s" />
  <VideoEmbed src="/videos/63-units-settings.mp4" title="63 · Manage units of measurement" duration="15s" />
  <VideoEmbed src="/videos/64-calendar.mp4" title="64 · The M&E calendar: never miss a deadline" duration="18s" />
  <VideoEmbed src="/videos/65-notifications.mp4" title="65 · Notifications and the activity log" duration="17s" />
</div>

## Organization

Headed **Organization**: *Update your organization name, code, logo, contact details, and default currency.*

One card, **Organization profile**. What is in it appears in the header and can be used in reports.

| Field | Notes |
|---|---|
| **Organization name** | |
| **Organization code** | |
| **Country (ISO-2)** | Two letters — RW, UG, KE |
| **Website** | |
| **Contact email** | |
| **Default currency** | Three letters — USD, RWF, EUR |

{{figure:settings-organization}}

### When progress is on track

The most important two fields on this page, and the easiest to miss.

- **On track from (% of target)**
- **At risk from (% of target)**

These set the bands behind every **On Track**, **At Risk** and **Off Track** label in ImpactMEL — the dashboard, the indicator register, a programme's page, an assembled report. The default is 90 and 70.

The at-risk figure must be above zero and below the on-track figure.

### Logo

**Upload new logo** or **Replace**. The current one is shown next to it.

Click **Save changes**.

<!-- roles: me_officer -->

::: warning An M&E officer can read this page but not save it
Saving the organisation profile needs organisation-level write access. Ask an org admin.
:::

<!-- /roles -->

---

<!-- roles: org_admin -->

## Members

Headed **Organization members**: *Manage who has access to this organization and their roles.*

{{figure:settings-members}}

### Invite by email

*Send a secure invite link or auto-add if the email already exists.*

Enter their **Email**, choose a **Role**, and click **Invite**. One of three things happens, and the page tells you which:

- They already had an account, so they are now a member. Nothing else to do.
- An invitation was created but this workspace cannot send email — copy the link from **Pending invites** and send it yourself.
- An invitation was sent. It expires in seven days; invite them again to send it a second time.

::: warning This Role dropdown is Member, Admin or Owner
It sets the membership level, which governs who can manage the team. The four ImpactMEL roles are attached separately, below. See [Roles and permissions](/user-manual/roles-permissions).
:::

### The members table

**Search members…** finds a person. Each row shows the user, their membership level as a dropdown, their attached roles, and a remove button.

- Change the membership level with the dropdown.
- Attach an ImpactMEL role with **Add role…**. The **×** on a role chip removes it.
- **Remove** takes them out of the organisation. The confirmation names them: *They will lose access.*

Your own row cannot be edited. It says so: *Your account — another administrator changes or removes it.*

Removing someone does not delete their work. Figures they entered stay.

### Pending invites

Each pending invitation shows the email and the level, with **Copy link** and **Revoke**.

---

## Donors & Funders

Headed **Donors & Funders**: *Manage your organization's donor/funder registry.*

The table lists **Name**, **Type**, **Country**, **Contact** and **Status**. **Search donors...** filters it.

### Adding a donor

Click **Add Donor**. The modal is **Add New Donor**.

| Field | Required |
|---|---|
| **Name** | Yes |
| **Abbreviation** | |
| **Type** | |
| **Country** | |
| **Website** | |
| **Email** | |
| **Phone** | |
| **Notes** | |
| **Active donor** | Tick to keep it in use |

**Type** is one of **Bilateral**, **Multilateral**, **Foundation**, **Government**, **Private Sector**, **NGO** or **Other**.

Click **Add Donor**. Editing uses the same form, with **Save Changes**.

::: tip Set donors up before programmes
A programme's donor field reads this registry. Filling it in first keeps names consistent. You can still create one inline from the programme form.
:::

<!-- /roles -->

---

## Reporting Periods

Headed **Reporting Periods**: *Org-wide periods that projects report against.*

These are the periods [Period sign-off](/user-manual/period-sign-off) closes and locks. They are not the same as the per-indicator periods inside a project.

The page splits into **Open** and **Closed / Locked**.

{{figure:settings-reporting-periods}}

### Adding a period

Click **New Period**.

| Field | Required |
|---|---|
| **Period Name** | Yes — for example *Q1 2025* or *FY2025-H1* |
| **Period Type** | Yes — Monthly, Quarterly, Semi-Annual, Annual or Custom |
| **Start Date** | Yes |
| **End Date** | Yes |
| **Submission Due** | |
| **Approval Deadline** | |
| **Fiscal Year** | For example *FY2025* |

Click **Create Period**. It is created **Open**.

::: warning There is no bulk generate here
Each org-wide period is created one at a time. The **Quick Generate** buttons that produce four quarters or twelve months at once are inside a project, on its **Reporting Periods** page.
:::

### Closing and locking

Row actions depend on the state: an **Open** period offers **Close**; a **Closed** one offers **Re-open** and **Lock**; a **Locked** one offers nothing — there is no unlock here.

For the version of this that shows you what is outstanding first, and that demands a written reason when you reopen, use **More → Period sign-off** instead.

### Deleting

Available on any period that is not locked. The confirmation warns that indicator reports linked to it are removed too.

---

## Disaggregations

Headed **Disaggregation Dimensions**: *Define breakdown dimensions for indicators (e.g., Gender, Age Group, Location).*

{{figure:settings-disaggregations}}

### A dimension

Click **Add Dimension**, fill in **Dimension Name** (*Gender*, *Age Group*) and an optional **Code** (*GEN*, *AGE*), and click **Create Dimension**.

### Its values

Expand the dimension to reach **Values**.

- **Add Value** takes a **Value Label** (*Male*, *Female*), a **Code** (*M*, *F*), and optionally a **Link to location**.
- **Bulk add** takes one value per line, with an optional code, and **Add bulk** creates them all.
- Editing a value also exposes its **Order**.
- **Search values…** finds one in a long list.

Linking a value to a location lets a district breakdown appear on the map. The **Search map** toggle will create the location if it does not exist yet.

---

## Units

Headed **Units of measurement**: *Manage units for indicators (e.g. people, %, USD).*

Click **Add unit**, then fill in **Name** (*People*), **Symbol** (*%*) and **Unit type** (*count*, *percentage*). Click **Save**.

**Bulk add** takes one unit per line, as `name, symbol, type`.

The table lists **Name**, **Symbol** and **Type**, with edit and delete on each row.

::: tip Units can also be created where they are needed
The New Indicator form has a **New** button next to the unit dropdown, so nobody has to abandon a form to add a missing unit.
:::

---

## Notifications

Headed **Notification Preferences**: *Choose what to be notified about and how.*

Eight rows, each with an **Email** toggle and an **In-App** toggle:

| Notification | What triggers it |
|---|---|
| **New Submission** | Someone submits a data entry for review |
| **Submission Approved** | Your submission is approved by a reviewer |
| **Submission Rejected** | Your submission is returned for corrections |
| **Indicator Report Approved** | An indicator report you entered is approved |
| **Indicator Report Rejected** | An indicator report you entered is rejected |
| **Report Due Soon** | A reporting deadline is three days away |
| **New Team Member** | Someone joins your organisation |
| **Activity Completed** | An activity is marked as completed |

**Save** is disabled until you change something.

::: warning These preferences live in your browser
The page says so itself. They are stored locally, so they do not follow you to another computer, and email delivery still depends on whether your administrator has email configured.
:::

---

## Export Data

Headed **Export Data**: *Download your organization's data as an Excel or CSV file.*

{{figure:settings-export}}

1. **Project Scope** — tick the projects you want. Leave them all unticked for every project.
2. **What to Export** — tick one or more:

| Data set | What you get |
|---|---|
| **Indicators & Reports** | Every indicator with its latest reported value per period |
| **Activities** | Every activity with status, dates and participant counts |
| **Participants** | Registered participants and household members |
| **Budget Lines** | Budget lines with planned against actual |

3. **Format** — **XLSX** or **CSV**.
4. Click **Export Now**.

The workbook holds one sheet per project per data set, plus a single org-wide Participants sheet. Sheets with no rows are left out.

::: warning CSV holds one sheet
Pick more than one data set and the export switches to Excel automatically. The page tells you.
:::

---

<!-- roles: org_admin -->

## Audit Log

Headed **Audit Log**: *A read-only record of all actions taken in your organization.*

{{figure:settings-audit-log}}

Filter by email, by **Action** (*create*, *update*, *delete*, *login*, *submit*, *approve*, *reject*), by **Entity type**, and between two dates. **Search** applies them; **Clear** resets.

Columns: **Time**, **Actor**, **Action**, **Entity** and **Entity ID**.

Where a change has a before and after, the row expands into two panels — **Before** and **After** — showing exactly what changed.

Fifty entries to a page, with **Previous** and **Next** and a running total.

The log cannot be edited or deleted. There is no download.

---

## Integrations

Headed **Integrations**: *Connect external data sources and services to your organization.*

This page records the connection details for an external system. **Nothing on this page imports or exports any data**, and there is no schedule, no test-connection and no sync.

**Disconnect** marks a connection as disconnected. Anything already imported is untouched.

<!-- /roles -->

---

## Your own account

Your avatar → **Profile** holds your own details and your password. See [Getting started](/user-manual/getting-started#your-own-account).

There is no security page, no list of active sessions, no session timeout and no two-factor authentication.

---

## Where to go next

- [Roles and permissions](/user-manual/roles-permissions) — the four roles, in detail
- [Period sign-off](/user-manual/period-sign-off) — closing the periods set up here
- [Getting started](/user-manual/getting-started) — a sensible order to set all this up
