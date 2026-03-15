# Dashboard

The Dashboard is the first thing you see after logging in. It gives you a complete, real-time picture of your organization's M&E portfolio — all programs, projects, and indicators in one place.

::: info 📸 Figure 3.1 — Dashboard Overview
The full dashboard page showing the four stat cards at the top (Active Projects, Total Budget, Indicators On Track, Upcoming Deadlines), the Program Performance table in the middle, and the Recent Activity feed on the right side. The sidebar is visible on the left.

**File:** `user-manual/images/03-01-dashboard-overview.png`
:::

---

## Summary Cards

At the top of the dashboard, four cards show the most important numbers across your entire portfolio at a glance.

| Card | What it shows |
|---|---|
| **Active Projects** | Number of projects with status "Active" across all programs |
| **Total Budget** | Combined budget of all active projects (grouped by currency) |
| **Indicators On Track** | Number of indicators with a progress score of 90% or above |
| **Upcoming Deadlines** | Number of reporting period due dates falling within the next 30 days |

Clicking any card takes you to the relevant filtered view.

::: info 📸 Figure 3.2 — Dashboard Summary Cards
Close-up of the four stat cards at the top of the dashboard. Each card shows a number, a label, and a small icon. The "Indicators On Track" card shows a green badge. The "Upcoming Deadlines" card shows an orange badge if there are deadlines within 7 days.

**File:** `user-manual/images/03-02-summary-cards.png`
:::

---

## Program Performance Table

Below the summary cards, the **Program Performance** table lists every active program with key metrics:

| Column | Description |
|---|---|
| **Program** | Program name and status badge |
| **Projects** | Number of projects within the program |
| **Budget** | Total planned budget vs. spent to date |
| **Indicators** | Count of indicators, with how many are on track |
| **Progress** | Visual progress bar showing overall completion |
| **Last Activity** | When data was last submitted for this program |

Click any program row to open the full program view.

::: info 📸 Figure 3.3 — Program Performance Table
The program performance table showing three programs as rows. Each row has a colored status badge (Active/Completed), a budget bar showing burn rate, an indicator count chip, and a "View" action button. One program shows a warning badge indicating indicators at risk.

**File:** `user-manual/images/03-03-program-table.png`
:::

---

## Indicators at Risk

Below the program table, ImpactMEL highlights any indicators that need your attention. An indicator is flagged as **At Risk** if its progress score is below 70%, or as **Off Track** if below 50%.

::: info 📸 Figure 3.4 — Indicators at Risk Panel
A panel titled "Indicators Needing Attention" showing a list of 3-4 indicator cards. Each card shows the indicator name, the project it belongs to, the current value vs target, and a red or orange progress badge. A "View All" link appears at the bottom.

**File:** `user-manual/images/03-04-indicators-at-risk.png`
:::

For each flagged indicator you can see:
- **Indicator name** and the project it belongs to
- **Current value** vs. the period target
- **Progress score** with a color-coded badge
- A direct link to the indicator's data entry page

Click **View All** to see the full list of all indicators across your portfolio.

---

## Understanding Traffic Lights

ImpactMEL uses a three-color system throughout the platform to communicate progress at a glance:

| Color | Label | Progress Score | Meaning |
|---|---|---|---|
| 🟢 Green | **On Track** | ≥ 90% | Meeting or exceeding the target |
| 🟡 Amber | **At Risk** | 70–89% | Behind target but recoverable |
| 🔴 Red | **Off Track** | < 70% | Significantly behind target, action needed |

This color coding appears on indicator cards, in the program table, on project detail pages, and in assembled reports.

---

## Recent Activity Feed

The **Recent Activity** panel (right side of the dashboard) shows a chronological log of the most recent events across your organization:

- Data submitted by a reporter
- Indicator report approved or rejected by an M&E officer
- New member invited
- Report published and shared
- Reporting period locked
- New project created

Each item shows the action, the person who did it, and how long ago it happened. Click any item to navigate to the relevant record.

::: info 📸 Figure 3.5 — Recent Activity Feed
The activity feed panel showing 8-10 recent events as a vertical list. Each event has a small avatar, a description of the action, the user's name, and a relative timestamp (e.g., "2 hours ago"). Events with different types have different colored icons (green for approvals, blue for submissions, gray for admin actions).

**File:** `user-manual/images/03-05-activity-feed.png`
:::

---

## Upcoming Deadlines

Below the activity feed, the **Upcoming Deadlines** widget lists all reporting period due dates in the next 30 days, sorted by urgency:

- Deadlines within 7 days appear in **red**
- Deadlines within 14 days appear in **amber**
- Deadlines beyond 14 days appear in **gray**

Click any deadline to open the relevant project and reporting period.

---

## Refreshing Data

Dashboard data is cached for 60 seconds to ensure fast page loads. Data updates automatically in the background. To force an immediate refresh, press **F5** or click the refresh icon (if visible) next to the page title.

---

## Customizing Your View

::: tip Coming Soon
Dashboard customization (choosing which widgets to show, reordering panels, and saving filter preferences) is planned for a future release.
:::

For now, the dashboard shows data from all programs and projects in your organization. To narrow your focus to a single program or project, navigate to the program or project detail page directly from the sidebar.
