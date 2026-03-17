# Projects

A **Project** is the operational unit where day-to-day implementation happens. It sits within a Program and is where your team logs activities, enters indicator data, tracks budgets, and generates reports.

Each project has:
- A specific budget, currency, start and end date
- A team of assigned staff
- One or more reporting periods
- Indicators with project-specific targets
- A log of activities and participants
- Assembled donor reports

---

## Viewing Projects

You can access projects in two ways:

1. **Via Programs** — Open a program → Projects tab → click a project
2. **Via the sidebar** — Click **Projects** in the left sidebar to see all projects across all programs in one list

::: info 📸 Figure 5.1 — All Projects List
<ImageModal src="/user-manual/images/05-01-projects-list.png" alt="All Projects List" />

The Projects list page showing a table of all projects across all programs. Each row shows project name, the parent program name, status badge, location, date range, budget utilization bar, and a progress chip showing the percentage of indicators on track. Filter dropdowns for Program and Status appear at the top. A "New Project" button is in the top-right.

**File:** `user-manual/images/05-01-projects-list.png`
:::

---

## Creating a Project

Projects are created within a Program.

1. Open the **Program** where you want to add a project
2. Click the **Projects** tab
3. Click **+ New Project**
4. Fill in the project details:

| Field | Required | Description |
|---|---|---|
| **Project Name** | ✅ | Full project name |
| **Project Code** | | Short identifier (e.g., *WASH-RW-01*) — used in reports |
| **Budget** | ✅ | Total project budget (number only) |
| **Currency** | ✅ | Select currency (USD, EUR, RWF, GBP, etc.) |
| **Start Date** | ✅ | Project start date |
| **End Date** | ✅ | Project end date |
| **Location** | | Country or region |
| **Lead Partner** | | Implementing partner organization name |
| **Description** | | Full project description |
| **Status** | ✅ | Draft, Active, Completed, or Suspended |

5. Click **Create Project**

::: info 📸 Figure 5.2 — New Project Form
<ImageModal src="/user-manual/images/05-02-new-project-form.png" alt="New Project Form" />

The "Create Project" slide-over panel showing all project fields. The currency field is a dropdown with common currencies pre-populated. The Status field shows a segmented control with Draft, Active, Completed, and Suspended options. Create and Cancel buttons are at the bottom.

**File:** `user-manual/images/05-02-new-project-form.png`
:::

---

## Project Detail Page

Click any project to open its full detail page. This is the command center for everything related to a single project.

::: info 📸 Figure 5.3 — Project Detail Page — Hero Section
<ImageModal src="/user-manual/images/05-03-project-hero.png" alt="Project Detail Page — Hero Section" />

The top section of the project detail page showing a large header with the project name, status badge, and program breadcrumb. Below the name are four stat cards in a row: Total Budget, Amount Spent, Remaining Budget, and Days Remaining. A horizontal progress bar below the cards shows the budget burn rate (spent vs. planned). Quick action buttons (Add Activity, Submit Data, Create Report) appear on the right side of the header.

**File:** `user-manual/images/05-03-project-hero.png`
:::

### Header Stats

The project header shows four key numbers at a glance:

| Stat | What it means |
|---|---|
| **Total Budget** | The full approved budget for this project |
| **Amount Spent** | Sum of all actual spending recorded in budget lines |
| **Remaining** | Total Budget minus Amount Spent |
| **Days Remaining** | Calendar days until the project end date |

The **progress bar** below these stats is color-coded:
- Green (< 60% spent) — healthy burn rate
- Amber (60–85% spent) — approaching budget limit
- Red (> 85% spent) — high burn rate, review needed

---

## Project Tabs

The project detail page is organized into five tabs:

### Overview Tab
The project description, key information, lead partner, location, and a summary of linked donors.

::: info 📸 Figure 5.4 — Project Overview Tab
<ImageModal src="/user-manual/images/05-04-project-overview.png" alt="Project Overview Tab" />

The Overview tab showing a description section on the left, and a sidebar on the right with key project details (Lead Partner, Location, Currency, Created date). Below the description, a "Key Contacts" section shows team member cards with names, roles, and email addresses.

**File:** `user-manual/images/05-04-project-overview.png`
:::

### Indicators Tab
Lists all indicators linked to this project, with their current values, targets, and progress scores. This is where you see at a glance how each indicator is performing.

Each indicator row shows:
- Indicator name and code
- Unit of measurement
- Latest reported value
- Period target
- Progress score with traffic-light badge
- Last submission date

From this tab you can:
- **Link a new indicator** to this project using the **+ Add Indicator** button
- **Set or update targets** for each indicator
- **Click any indicator** to see its full history of submitted values

::: info 📸 Figure 5.5 — Project Indicators Tab
<ImageModal src="/user-manual/images/05-05-project-indicators.png" alt="Project Indicators Tab" />

The Indicators tab showing a table with columns for Indicator Code, Indicator Name, Unit, Latest Value, Target, Progress (as a colored badge), and a "Submit Data" action button on each row. A green "Add Indicator" button appears at the top-right. Indicators are grouped by their result framework Output node.

**File:** `user-manual/images/05-05-project-indicators.png`
:::

### Activities Tab
Shows a chronological log of all activities registered against this project. Each activity is linked to a specific Output in the results framework.

### Reports Tab
Lists all assembled reports for this project. From here you can create new reports, open existing ones, share them, or download them as PDF.

### Budget Tab
Shows all budget lines for this project with planned vs. actual spending. This is where you manage the project's financial tracking.

---

## Setting Up Reporting Periods

Reporting periods define **when** data collection happens for this project. You must set up periods before reporters can submit data.

1. Open the project → click the three-dot menu (⋯) → **Manage Reporting Periods**
2. Click **+ Add Period**
3. Enter the period **label** (e.g., *Q1 2026*), **start date**, and **end date**
4. Optionally set a **due date** for submissions
5. Click **Save**
6. Repeat for each period in your project cycle

::: info 📸 Figure 5.6 — Reporting Periods Management
<ImageModal src="/user-manual/images/05-06-reporting-periods.png" alt="Reporting Periods Management" />

The Reporting Periods management page showing a table of periods for a project. Each row shows the period label, date range, due date, submission count, and a "Lock" toggle. A locked period shows a padlock icon and greyed-out row. An "+ Add Period" button appears at the top-right.

**File:** `user-manual/images/05-06-reporting-periods.png`
:::

::: tip
Create all your reporting periods at the start of the project — typically quarterly or annually. This allows reporters to know which periods they need to submit data for, and allows M&E officers to plan their review calendar.
:::

### Locking a Period

Once all data for a period has been reviewed and approved, lock it to prevent further changes:

1. Find the period in the Reporting Periods table
2. Toggle the **Locked** switch to ON
3. Confirm in the dialog that appears

Locked periods appear with a padlock icon. Reporters will see a message that the period is closed if they try to submit.

---

## Linking Indicators to a Project

Indicators are defined at the organization level and then linked to specific projects with project-specific targets.

1. Open the project → **Indicators** tab
2. Click **+ Add Indicator**
3. Search for and select the indicator from your org's indicator library
4. Set the **target** value for this project and any other project-specific settings
5. Click **Link Indicator**

If the indicator you need doesn't exist yet, create it first in the **Indicators** section of the sidebar, then come back to link it.

---

## Editing Project Details

1. Open the project detail page
2. Click **Edit Project** (top-right, or in the three-dot menu)
3. Update the fields you want to change
4. Click **Save Changes**

Changes take effect immediately and are reflected in all dashboards and reports.
