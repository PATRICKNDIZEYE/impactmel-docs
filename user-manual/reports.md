# Reports

<VideoEmbed title="23 · Creating a report template" />

<VideoEmbed title="24 · Assembling a report in one click" />

<VideoEmbed title="25 · Sharing a report with a donor via public link" />

<VideoEmbed title="26 · Exporting a report as PDF" />

Reports are the output of the entire M&E cycle. ImpactMEL automatically assembles all your approved indicator data, activity logs, budget summaries, and narratives into a professional, donor-ready document — in seconds, not hours.

Reports can be:
- **Shared via a public link** — donors open a URL, no login required
- **Downloaded as a PDF** — true binary PDF, not a browser print dialog
- **Assembled for any date range** — quarterly, annual, or any custom period

---

## The Reports List

Navigate to **Reports** in the sidebar to see all reports across your projects.

::: info 📸 Figure 10.1 — Reports List Page
The Reports page showing a table of all assembled reports. Columns include: Report Title, Project, Period, Type (Quarterly/Annual/Ad hoc), Status badge (Draft/Published), Share status (a link icon if shared), Created date, and action buttons (Open, Share, Download PDF). A search bar and filter for Project and Status appear at the top. A "New Report" button is in the top-right.

**File:** `user-manual/images/10-01-reports-list.png`
:::

---

## Creating a Report

1. Click **+ New Report**
2. Fill in the report configuration:

| Field | Required | Description |
|---|---|---|
| **Title** | ✅ | Report name (e.g., *Q1 2026 Quarterly Report — WASH Program*) |
| **Project** | ✅ | Which project this report covers |
| **Report Type** | ✅ | Quarterly, Annual, or Ad hoc |
| **Period** | ✅ | Select a reporting period **or** enter a custom date range |

3. Click **Generate Report**

The system assembles the report in a few seconds and opens it automatically.

::: info 📸 Figure 10.2 — New Report Dialog
The "Create Report" modal showing the Title field, Project selector, Report Type segmented control, and a period selection section. The period section shows two options as radio buttons: "Select Reporting Period" (dropdown listing Q1 2026, Q2 2026, etc.) and "Custom Date Range" (with Start Date and End Date fields). When "Custom Date Range" is selected, the dropdown hides and the date pickers appear.

**File:** `user-manual/images/10-02-new-report-dialog.png`
:::

---

## Period vs. Custom Date Range

### Using a Reporting Period
Select a **standard reporting period** if you are preparing a regular quarterly or annual report aligned to your project's configured periods. The system pulls in all approved and submitted indicator data for that period.

### Using a Custom Date Range
Select a **custom date range** when your donor's reporting cycle doesn't match your internal periods. For example, a donor fiscal year from July 2025 to June 2026 may span three of your quarterly periods.

ImpactMEL handles this automatically:
1. It finds all reporting periods that overlap your custom date range
2. It collects all approved indicator data within those periods
3. It aggregates the values using each indicator's aggregation method

::: tip
Custom date ranges are one of ImpactMEL's most powerful features. You can generate a report for any date range without changing your data — the same indicator submissions can be included in a Q1 report, a donor annual report, and a mid-term review, all at the same time.
:::

---

## Reading an Assembled Report

The assembled report view shows all sections in order:

::: info 📸 Figure 10.3 — Assembled Report View (Top)
The top of an assembled report showing: the organization logo in the top-left, the report title in large bold text, the project name and date range below, the donor logos in a row. Below the header, an "Executive Summary" section with editable text. Action buttons (Share, Download PDF, Edit) appear in a toolbar at the top-right.

**File:** `user-manual/images/10-03-report-view-top.png`
:::

### Report Sections

| Section | Contents |
|---|---|
| **Cover / Header** | Org logo, project name, donor logos, period, report title |
| **Executive Summary** | Editable narrative — write a high-level summary of the period |
| **Progress Against Results** | Indicator values grouped by result framework node, with traffic-light progress scores |
| **Activity Summary** | List of completed activities during the period |
| **Budget Summary** | Planned vs. actual spending, burn rate, budget line breakdown |
| **Challenges & Lessons Learned** | Editable narrative — describe challenges faced and lessons learned |
| **Recommendations** | Editable narrative — recommended next steps |
| **Attachments** | Linked documents, photos, or other evidence |

::: info 📸 Figure 10.4 — Progress Against Results Section
The "Progress Against Results" section of the report, showing indicators grouped by Output node. Each indicator row shows: indicator name, unit, reported value, target, progress percentage, and a traffic-light badge (green/amber/red). Disaggregated breakdowns appear as an expandable row below each indicator. A summary line at the bottom shows "8 of 12 indicators on track."

**File:** `user-manual/images/10-04-progress-section.png`
:::

---

## Editing Report Narratives

The narrative sections (Executive Summary, Challenges & Lessons Learned, Recommendations) are editable directly in the report view.

1. Click anywhere in the narrative text area
2. The section becomes editable (rich text editor appears)
3. Type your narrative — formatting options (bold, italic, bullet points) appear in the toolbar
4. Click outside the text area or press **Ctrl+S** to save

Changes are saved automatically every 30 seconds.

::: info 📸 Figure 10.5 — Editing a Narrative Section
The Executive Summary section in editing mode, showing a rich text toolbar at the top with bold, italic, bullet list, and numbered list buttons. The text area is highlighted with a blue border. Unsaved changes show a small "Saving..." indicator in the top-right corner of the section.

**File:** `user-manual/images/10-05-narrative-editing.png`
:::

---

## Sharing a Report

### Generate a Public Share Link

1. From the report view, click **Share**
2. The share dialog opens with a unique URL
3. Copy the link and send it to your donor or partner

::: info 📸 Figure 10.6 — Share Report Dialog
The share report dialog showing a URL in a read-only text field with a "Copy Link" button. Below the link, a green checkmark confirms "Link is active." Three action buttons appear: "Copy Link", "Regenerate Link" (warning icon — invalidates old link), and "Revoke Link" (removes public access entirely). At the bottom, an optional "Expiry Date" date picker allows setting a link expiration.

**File:** `user-manual/images/10-06-share-dialog.png`
:::

The share link format: `https://app.impactmel.com/r/[unique-token]`

**Anyone with this link can view the report** — no ImpactMEL account required. This is the link you send to donors, headquarters, or any stakeholder who needs to read the report without logging in.

### Regenerating a Link

If you need to invalidate an existing link (e.g., the report was shared with the wrong person), click **Regenerate Link**. The old URL immediately stops working and a new URL is generated.

### Revoking a Link

Click **Revoke Link** to permanently remove public access. The URL returns a "Not found" page. You can generate a new link at any time.

---

## What Donors See

::: info 📸 Figure 10.7 — Public Report View (Donor View)
The public report page as it appears to someone opening the share link in a browser. The page shows the report rendered as a clean, professional document: organization logo, report title, date range, and all sections below. A "Download PDF" button appears in a sticky header at the top. No login prompts, no sidebars, no ImpactMEL navigation — just the report content. A small "Powered by ImpactMEL" credit appears in the footer.

**File:** `user-manual/images/10-07-public-report-donor-view.png`
:::

Donors who open the link see:
- The full report, beautifully formatted
- A **Download PDF** button to save a copy
- No login required and no ImpactMEL branding (except a small footer credit)
- The same content you see in your internal view

---

## Downloading as PDF

From either the internal report view or the public report page:

1. Click **Download PDF**
2. A PDF is generated from the report content — this takes 5–15 seconds for long reports
3. The file downloads automatically

The PDF is a true binary file — not a browser print dialog. It includes your organization's logo, proper pagination, section headers, and all indicator tables exactly as they appear on screen.

::: warning
The PDF captures the report as it appears at the moment you click Download. If you edit a narrative section afterwards, download again to get the updated version.
:::

---

## Managing Multiple Reports

Over time, a single project may have many reports (quarterly, mid-term, annual, donor-specific). Use the **filter** on the Reports list page to narrow by:
- **Project** — see only reports for one project
- **Status** — Draft vs. Published
- **Date range** — reports covering a specific period

You can also **delete** a report from the three-dot menu if it was created by mistake. Deleting a report does not delete the underlying indicator data — only the assembled document.

---

## Report Status

| Status | Meaning |
|---|---|
| **Draft** | Report assembled but not yet shared externally |
| **Published** | Report has an active share link or has been downloaded |

Changing a report from Draft to Published is done automatically when you click "Share" or "Download PDF" for the first time. You can manually set the status via the three-dot menu.

---

## Frequently Asked Questions

**Can I update a report after sharing it?**
Yes. The public share link always shows the current version of the report. If you edit a narrative section and save, anyone who opens the link afterwards sees the updated content.

**Can I have multiple share links for the same report?**
No — one report has one share link at a time. Regenerating the link creates a new one and invalidates the old one.

**Can I password-protect a share link?**
Not currently. Password protection for share links is on the product roadmap.

**What languages are reports available in?**
Report narrative sections can be written in any language — you type the content yourself. The system-generated labels (section headings, column names) are in English in the current version. Multilingual support is planned.

**Can I create a report that covers multiple projects?**
Not currently. Each report covers one project. Program-level summary reports (covering all projects in a program) are on the roadmap.
