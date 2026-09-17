---
title: Projects
chapter: 6
roles:
  - reporter
  - me_officer
  - org_admin
---

# Projects

A **project** is where the work happens. It sits inside a programme and holds the activities, indicators, figures, budget and documents.

Each project has its own dates, budget and currency, team, locations, results framework, reporting periods and indicators with their own targets.

---

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/06-create-project.mp4" title="06 · Create a project" duration="60s" />
  <VideoEmbed src="/videos/07-project-workspace-tour.mp4" title="07 · Inside a project workspace" duration="28s" />
  <VideoEmbed src="/videos/08-manage-project-team.mp4" title="08 · Manage the project team" duration="22s" />
</div>

## Finding a project

Three ways:

1. **Programmes** in the top bar, then expand a programme and click a project.
2. A programme's own page, which lists its projects with their indicators.
3. **⌘K**, then type the project's name.

---

<!-- roles: me_officer, org_admin -->

## Creating a project

Click **New Project** from the Programmes page, or **Add Project** on a programme's row to have the programme pre-chosen. You can also use **New** ▾ → **New project** in the top bar.

The page is headed **Create a Project**. It is one scrolling form in five parts, not a wizard.

Three fields are required: **Program**, **Project Name** and **Project Manager**.

### Basic Information

| Field | Required | What it is for |
|---|---|---|
| **Program** | Yes | Which programme it belongs to |
| **Status** | Yes | Planning, Active, On Hold, Completed or Cancelled. Starts as Planning |
| **Project Name** | Yes | The full name |
| **Project Code** | | A short reference used in reports |
| **Description** | | What the project is |
| **Objective Statement** | | What the project is trying to achieve |

### Implementation

**Mechanism**, **Sector**, **Sub-sector** and **Target Population**.

### Timeline

**Start Date** and **End Date**.

### Financial

**Total Budget** and **Currency**.

### Team

**Project Manager** — required — and **Team Members**, a searchable list you can tick several names in.

Click **Create Project**.

{{figure:new-project-form}}

::: tip The team list is what a reporter can see
A reporter only sees the projects they are on. Add them here, or later from the project's Team tab.
:::

<!-- /roles -->

---

## The project page

{{figure:project-hero}}

### The four figures at the top

| Tile | What it shows |
|---|---|
| **Progress** | Overall progress, as a percentage |
| **Indicators** | How many the project holds |
| **Team** | How many people are on it |
| **Activities** | How many are logged |

Below them, a bar labelled **Overall Progress**.

<!-- roles: me_officer, org_admin -->

**Edit** and **Duplicate** sit in the header. Duplicate is covered below.

<!-- /roles -->

### Seven shortcuts

A row of tiles takes you to the screens you use most: **Activities**, **Collect Data**, **Submissions**, **Charts**, **PITT Report**, **Performance Review** (*Judge what was achieved*) and **Risks**.

### Four tabs

| Tab | What is in it |
|---|---|
| **Overview** | Project details, team members, cross-cutting themes and the description |
| **Indicators & Targets** | The project's indicators, with a **New Indicator** button |
| **Results Framework** | The results tree |
| **Team** | Who is on the project |

**Project Details** on the Overview tab lists status, programme, donor, sector, currency, budget, start, end and manager.

---

## The left rail

The rail down the left is where the rest of a project lives. It is much longer than the tabs.

| Item | What it is for |
|---|---|
| **Program Details** | Back to this page |
| **New Indicator** | Define an indicator |
| **Reporting Periods** | The periods each indicator reports against |
| **Activities** | The work plan |
| **Budget** | Budget lines, planned against actual |
| **Collect Data** | Enter a figure, or share a public collection link |
| **Submissions** | This project's reported figures |
| **Progress Reports** | Enter figures indicator by indicator for a period |
| **PITT Report** | This project's performance tracking table |
| **Performance Review** | Judge whether each result was achieved |
| **Risks** | The project's risk register |
| **Narratives** | Written answers per period |
| **Locations** | Where the project works |
| **Documents** | The project's document shelf |
| **Result Framework** | The framework builder |
| **Stakeholders** | Who has an interest in it |
| **Evaluations** | Evaluations of the project |

<!-- roles: reporter -->

Some of these are closed to reporters: **Result Framework**, **Budget** and **New Indicator**. They will not appear in your rail.

<!-- /roles -->

---

## Managing the team

Open the **Team** tab.

- **Add member** adds someone already in your organisation.
- **Remove** takes them off.
- **Manage** on the Overview tab opens **Manage Team Members**, which also has **Invite New Member** for someone who is not in the organisation yet. **Save Team** confirms.

---

## Reporting periods

Open **Reporting Periods** in the project's rail. The page is headed **Reporting Periods**, with the project name beneath.

Periods here are **per indicator**. Each indicator is an expandable card with its own list of periods.

{{figure:project-periods}}

Four figures across the top: **Indicators**, **Total Periods**, **Open**, and either **Overdue** or **Due Soon**.

<!-- roles: me_officer, org_admin -->

### Generating a year of periods

1. Expand the indicator.
2. Click **Quick Generate**.
3. Set the **Year**.
4. Click **4 Quarters** or **12 Months**.

Existing periods are skipped, so you can run it twice safely. Generated periods are named *Q1 2026* or *Jan 2026*.

### Adding one period by hand

1. Click **Add Period**.
2. Fill in **Period Key** (for example *Q1 2026*), **Start Date**, **End Date** and, if you want a deadline, **Due Date**.
3. Click **Save Period**.

### Closing a period on one indicator

Hover the period row and use the close icon. The confirmation says *Closing prevents new submissions for this period*, and the button is **Yes, Close**. The open icon reverses it.

Rows carry badges: **Open**, **Closed**, **Overdue** and **Due Soon**.

::: tip Two levels of period, two jobs
The periods here belong to one indicator. The org-wide calendar in **Settings → Reporting Periods** is what [Period sign-off](/user-manual/period-sign-off) closes. Set the org calendar up first so the two line up.
:::

<!-- /roles -->

---

<!-- roles: me_officer, org_admin -->

## Starting a project from an existing one

Click **Duplicate** in the project header. The dialog is headed **Start a project from this one**.

Set the **Name**, the **Programme**, and when it **Starts** and **Ends**. Then choose what comes across under **Also bring across**:

- Locations and partner organisations
- Team members
- Target groups
- Stakeholders
- Open risks, without their review history
- Narrative questions

Click **Create project**.

Figures and targets are never copied. The new project starts empty.

{{figure:project-duplicate}}

<!-- /roles -->

---

## Where to go next

- [Results framework](/user-manual/results-framework) — build the logic first
- [Indicators](/user-manual/indicators) — then define what you will measure
- [Entering data](/user-manual/data-entry) — then report against it
