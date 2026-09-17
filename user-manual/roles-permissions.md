---
title: Roles and permissions
chapter: 17
roles:
  - viewer
  - reporter
  - me_officer
  - org_admin
---

# Roles and permissions

ImpactMEL decides what you can see and do from your **role**. There are four, and every account has exactly one.

---

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/60-invite-member.mp4" title="60 · Invite a team member" duration="19s" />
  <VideoEmbed src="/videos/61-roles-permissions.mp4" title="61 · Roles: who can do what" duration="78s" />
</div>

## Two layers, and why that matters

This trips people up, so it is worth stating plainly. Each person carries **two** things.

| Layer | What it controls | Where it is set |
|---|---|---|
| **Membership level** — Owner, Admin or Member | Who can invite colleagues, change levels and remove people | Settings → Members, the dropdown next to each person |
| **Role** — org admin, M&E officer, reporter or viewer | Which sections and actions they get | Settings → Members, attached per person |

Managing the team is governed by the **membership level**. Everything else in this chapter is governed by the **role**.

<!-- TODO: the old manual said the invite dialog offers Org Admin / M&E Officer / Reporter / Viewer. It does not — it offers Member / Admin / Owner, and the four roles are attached afterwards from the members table. I have documented what the code does, but two role vocabularies in one screen is the single thing most likely to be got wrong in training. Worth fixing in the product rather than explained in the manual. -->

::: warning The invite dropdown offers Member, Admin and Owner
When you invite someone, the **Role** dropdown on the invite form lists **Member**, **Admin** and **Owner** — that is the membership level, not one of the four roles below. Attach their role afterwards, from the members table.
:::

---

## The four roles

### Org admin
Every permission in the system, now and in future. Typically a country director or operations manager.

### M&E officer
Designs the results framework, defines indicators, reviews and approves figures, closes periods, assembles reports, builds forms and dashboards.

**What an M&E officer cannot reach:** the donor registry, the audit log, integrations, roles and permissions, and saving changes to the organisation profile. All four need organisation-level write access, which only an org admin has.

### Reporter
Enters figures for the projects they are assigned to, and registers participants.

A reporter has nine permissions. They can read programmes, projects, indicators, forms and reference data, read and write submissions, read notifications and read risks. **That is all.** They cannot approve anything, close a period, edit the results framework, see a budget, or reach Settings.

### Viewer
Reads. Eight permissions, all read-only: programmes, projects, indicators, results, dashboards, reports, notifications and risks.

A viewer cannot enter a figure, approve one, or open Submissions or Forms at all.

---

## Which sections each role can reach

| Section | Org admin | M&E officer | Reporter | Viewer |
|---|---|---|---|---|
| Overview (dashboard) | ✅ | ✅ | ✅ | ✅ |
| Statistics | ✅ | ✅ | ✅ | ✅ |
| Programmes and projects | ✅ | ✅ | 🔒 | ❌ |
| Submissions | ✅ | ✅ | ✅ | ❌ |
| Review | ✅ | ✅ | 👁 | ❌ |
| Period sign-off | ✅ | ✅ | 👁 | ❌ |
| Reports, indicator register, tracking table | ✅ | ✅ | ❌ | ✅ |
| Visualization | ✅ | ✅ | ❌ | ✅ |
| Risks | ✅ | ✅ | ✅ | ✅ |
| AI Insights | ✅ | ✅ | ❌ | ❌ |
| Geographic Map | ✅ | ✅ | ❌ | ✅ |
| Data Hub | ✅ | ✅ | ❌ | ❌ |
| Forms | ✅ | ✅ | 👁 | ❌ |
| Calendar | ✅ | ✅ | ❌ | ❌ |
| Participants | ✅ | ✅ | ✅ | ❌ |
| Dashboards (custom) | ✅ | ✅ | ❌ | ✅ |
| Users | ✅ | ✅ | ❌ | ❌ |
| Settings | ✅ | ✅ | ❌ | ❌ |
| Notifications and Profile | ✅ | ✅ | ✅ | ✅ |

✅ can reach and act · 👁 can read but not act · 🔒 assigned projects only · ❌ not in their navigation

A section a role cannot reach does not appear in their top bar at all. Following a link to one bounces you back to the dashboard.

---

## Which actions each role can take

### Structure

| Action | Org admin | M&E officer | Reporter | Viewer |
|---|---|---|---|---|
| Create or edit a programme | ✅ | ✅ | ❌ | ❌ |
| Create or edit a project | ✅ | ✅ | ❌ | ❌ |
| Build the results framework | ✅ | ✅ | ❌ | ❌ |
| Create or edit an indicator | ✅ | ✅ | ❌ | ❌ |
| Reuse an indicator in another project | ✅ | ✅ | ❌ | ❌ |
| See a project's budget | ✅ | ✅ | ❌ | ❌ |

### Reporting and approval

| Action | Org admin | M&E officer | Reporter | Viewer |
|---|---|---|---|---|
| Enter and submit a figure | ✅ | ✅ | 🔒 | ❌ |
| Read all submissions | ✅ | ✅ | 🔒 | ❌ |
| Approve or send a figure back | ✅ | ✅ | ❌ | ❌ |
| Ask a colleague to review | ✅ | ✅ | ❌ | ❌ |
| Judge a result in Performance Review | ✅ | ✅ | ❌ | ❌ |
| Close, lock or reopen a period | ✅ | ✅ | ❌ | ❌ |

### Reporting out

| Action | Org admin | M&E officer | Reporter | Viewer |
|---|---|---|---|---|
| Read a report | ✅ | ✅ | ❌ | ✅ |
| Assemble a report | ✅ | ✅ | ❌ | ❌ |
| Share a report by link | ✅ | ✅ | ❌ | ❌ |
| Export the indicator register | ✅ | ✅ | ❌ | ✅ |
| Build a form | ✅ | ✅ | ❌ | ❌ |
| Build a dashboard | ✅ | ✅ | ❌ | ❌ |

### Administration

| Action | Org admin | M&E officer | Reporter | Viewer |
|---|---|---|---|---|
| Read the organisation profile | ✅ | ✅ | ❌ | ❌ |
| Save changes to it | ✅ | ❌ | ❌ | ❌ |
| Read the members list | ✅ | ✅ | ❌ | ❌ |
| Invite, remove or change a member | ✅ (Owner or Admin) | ❌ | ❌ | ❌ |
| Manage units, disaggregations and the reporting calendar | ✅ | ✅ | ❌ | ❌ |
| Manage the donor registry | ✅ | ❌ | ❌ | ❌ |
| Roles and permissions | ✅ | ❌ | ❌ | ❌ |
| Integrations | ✅ | ❌ | ❌ | ❌ |
| Audit log | ✅ | ❌ | ❌ | ❌ |
| Export data | ✅ | ✅ | ❌ | ❌ |

---

## 🔒 What "assigned projects only" means

A reporter sees the projects whose **team** they are on, and nothing else.

<!-- roles: me_officer, org_admin -->

To assign one:

1. Open the project.
2. Go to the **Team** tab.
3. Click **Add member** and pick them.

<!-- /roles -->

::: warning An empty portfolio is usually an assignment problem
A reporter on no project sees an empty Programmes page and an empty dashboard. Nothing is broken. Add them to a project's team.
:::

---

## Where a role reads but cannot act

Two screens are deliberately readable by a reporter who cannot act on them.

**Review.** A reporter can see the queue, which is how they find out what has been sent back to them and why. The Approve, Send back and Ask someone buttons will not work for them.

**Period sign-off.** A reporter can see what is outstanding in each period and which are still open to report into. Close, Lock and Reopen will not work for them.

---

<!-- roles: org_admin -->

## Custom roles

**Settings → Roles & permissions** lets you build a role of your own.

1. Click **New Role**. Give it a **Role Name** and a **Description**. Click **Create Role**.
2. Select it in the list on the left.
3. Permissions are grouped by what they act on, each group showing how many of its permissions the role has. Use **Select All** or **Clear** on a group, or tick permissions one at a time.
4. **Filter permissions…** narrows the list.

Changes apply immediately to everyone holding that role. The page says so.

**Delete Role** removes it. Anyone holding it loses those permissions at once.

A custom role is attached to a person from **Settings → Members**, using the **Add role…** dropdown on their row. Several can be attached to one person, and the **×** removes one.

::: warning You cannot invent a permission
This page toggles the permissions the system already defines. It does not create new ones.
:::

<!-- /roles -->

---

## Asking for more access

Contact an org admin. A role change takes effect on your next page load.

---

## Getting this right

**Give people the smallest role that lets them work.** Fewer admins means fewer accidents.

**Most M&E staff should be M&E officers, not org admins.** An M&E officer can do all the monitoring and reporting work without being able to change the organisation or read the audit log.

**Give funders and senior management the viewer role** — or, better, just send them a report share link, which needs no account at all.

**Assign reporters to projects, not to everything.** It keeps their screens short and their figures in the right place.

{{figure:members-roles}}

---

## Where to go next

- [Settings and administration](/user-manual/settings) — where members and roles are managed
- [Review and approve](/user-manual/review-and-approve) — the screen the approval permissions govern
- [Getting started](/user-manual/getting-started) — inviting your first colleagues
