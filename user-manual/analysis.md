---
title: Analysis
chapter: 17
roles:
  - viewer
  - reporter
  - me_officer
  - org_admin
---

# Analysis

Everything so far has been about getting figures in and getting them agreed. This chapter is about reading them.

**Analysis** in the top bar holds three pages — **Visualization**, **Risks** and **AI Insights**. **Geographic Map** and **Dashboards** sit elsewhere but belong to the same job, so they are here too. Risks are big enough to have [their own chapter](/user-manual/risks).

None of these pages hold data of their own. They are all views of the figures your team has already reported and had approved, so a chart that looks empty is usually a period nobody has reported yet rather than a chart that is broken.

---

<!-- roles: viewer, me_officer, org_admin -->

## Visualization

**Analysis → Visualization**. Headed **Data Visualization**, with the line *Real-time M&E charts powered by ECharts*.

{{figure:visualization}}

Three figures sit across the top: **Total Projects**, **Target Achievement** and **Active Indicators**.

### Project Charts

A card for each project, with its description and a **Progress** percentage. Click one to open that project's own charts.

### Organization Overview

Six charts underneath, each labelled **(Live Data)** because each is worked out when you open the page rather than stored:

| Chart | What it draws |
|---|---|
| **Overall Progress** | A gauge of the organisation's average progress against target |
| **Quarterly Performance** | Target against actual, one pair per period |
| **Projects by Status** | A pie of projects by their status |
| **Organization Metrics** | The headline counts as a bar chart |
| **Organization Hierarchy** | Programmes and the projects under them |
| **Submission Activity (Last 12 Months)** | How many figures were submitted each month |

**Share** copies a link to the page. **Dashboard Builder** opens Dashboards, below.

::: tip A chart with nothing in it
*No quarterly data available yet* means no period has both a target and an approved figure. Approve something in [Review](/user-manual/review-and-approve) and the chart fills.
:::

---

## Dashboards

A dashboard is a page of charts you arrange yourself, for a question you keep being asked. Press **⌘K**, type `dashboards`, and press Enter — there is no menu item.

The page is headed **Dashboards**, with a count of how many exist. A new workspace has none and offers **Create Your First Dashboard**.

{{figure:dashboards}}

**New Dashboard** opens the builder, where widgets — charts, KPI tiles and tables — are dragged into place. A saved dashboard can be published so that other people in the organisation can open it.

::: warning Dashboards are not the Overview
The **Overview** dashboard in chapter 3 is built into the product and cannot be edited. These are the ones you build. They are separate things that share a word.
:::

---

## AI Insights

**Analysis → AI Insights**. Headed **Insights**, with the line *Data-grounded analysis, risks, and recommendations from your real M&E records.*

{{figure:ai-insights}}

The top of the page is an **AI Executive Summary** — a short paragraph naming how many projects and indicators you are monitoring, how many submissions have been approved, and what share of targeted indicators is on track. Beside it sit the same counts as figures, with **Data Quality** and **Performance** bands.

Four tabs follow:

| Tab | What it holds |
|---|---|
| **Overview** | The summary expanded |
| **Trends** | How the figures have moved over the periods you have reported |
| **Risk Alerts** | Signals read out of your submissions and targets |
| **Recommendations** | An **AI Action Plan** — each action with a priority and a **Why** |

**Ask AI** at the top right puts a question to the same data.

::: warning It reads, it does not forecast
Every number on this page comes from recorded submissions, targets and approvals. Nothing here is a projection, and the page says so. Treat the recommendations as prompts for a conversation, not as decisions.
:::

<!-- /roles -->

---

## Geographic Map

**More → Geographic Map**. Headed **Geographic distribution**, with the line *See where your participants, activities, projects, and data collection are happening.*

{{figure:geographic-map}}

Every role can open this page.

### Choosing what to map

The selector at the top left chooses what the markers count:

| Option | What each marker counts |
|---|---|
| **Participants** | People on the participant register |
| **Activities** | Activities that have a location |
| **Project locations** | The sites recorded against a project |
| **Submissions** | Reported figures that carry a location |
| **Indicator reports** | Indicator reports by the place they were reported from |

Three filters narrow it: **Program**, **Project** and **Activity**. Activity stays disabled until a project is chosen — it says *Pick a project first*. When nothing is set the page says **No filters applied.**

### Reading it

Four figures sit above the map: **Total**, **Locations with data**, **Top location** and **Avg per location**.

On the map itself, **marker size reflects how many records share a location**. The **Leaderboard** on the right ranks the locations, each with its count and its share of the total.

::: tip Nothing on the map?
Only records that carry a location appear. A participant registered without a place, or an activity with no site, is counted in your totals but cannot be drawn.
:::

---

<!-- roles: reporter -->

## What a reporter sees here

**Geographic Map** works for you in full.

**Visualization**, **AI Insights** and **Dashboards** are not part of a reporter's access. Opening one gives you a page that cannot load its figures. Nothing is broken and nothing you did caused it — ask an M&E officer or an org admin for the chart you need, or for a published dashboard.

<!-- /roles -->

---

## Where to go next

- [Risks](/user-manual/risks) — the fourth page under Analysis, and the fullest of them
- [Indicator register and tracking table](/user-manual/indicator-register) — the same figures as a table rather than a chart
- [Reports](/user-manual/reports) — when the answer has to leave the building
