---
title: Data Hub
chapter: 19
roles:
  - me_officer
  - org_admin
---

# Data Hub

[Entering data](/user-manual/data-entry) is about one figure at a time. **Data Hub** is about all of them at once — auditing what has been reported, moving it in and out of spreadsheets, and seeing where the reporting is thin.

Open it from the top bar: **More → Data Hub**. The page is headed **Data Hub**, with the line *Operations center for submissions, indicator diagnostics, data movement, and quality monitoring.*

{{figure:data-hub}}

Five figures run across the top, and they are the fastest health check in the product:

| Figure | What it counts |
|---|---|
| **Total submissions** | Every submission in the organisation, whatever its status |
| **Approved / locked** | The ones that count as reported data |
| **Draft backlog (>7 days)** | Drafts nobody has submitted for more than a week |
| **Tracked indicators** | Indicators with a reporting schedule |
| **Returned rate** | The share of submissions that were sent back |

Four tabs sit underneath.

---

## All Submissions

*Audit every submission record with filters for status, program, date range, submitter, and indicator.*

One row per submission, with **Submitted By**, **Program**, **Indicator**, **Period**, **Value**, **Status**, **Submitted At** and **Reviewed By**. Six filters narrow it — status, programme, user, indicator, and a **From** and **To** date — and the list pages through in blocks, telling you where you are: *Showing 1 – 12 of 172*.

This is the page to open when somebody asks a question about the record rather than about the number: who entered this, when, and who agreed it.

---

## Indicator Explorer

*Drill into approved indicator history by period. Click a period row to inspect submission-level evidence.*

Choose one indicator in **Select Indicator**. The chart draws **Target vs actual by period** across every period it has been reported in, and underneath, one row per period:

- The period name
- **Actual** and **Target**
- A verdict — *Above target*, or the band the figure fell in
- **Show submissions**, which opens the submissions that produced it

{{figure:data-hub-explorer}}

It answers the question a chart cannot: *where did that number come from?* The chain runs from the period's total back to the individual submissions behind it.

---

## Import / Export

Two halves and a log.

### Import Center

*Bring in data from Excel or Google Sheets. Imported data remains traceable to source and timestamp.*

**Upload Excel** takes a file. **Connect Sheets** links a Google Sheet. **Datasets available** counts what has already come in; a workspace that has imported nothing says *No datasets imported yet*.

### Export Center

*Export filtered submission records as CSV, Excel, or printable PDF for donor and analyst workflows.*

Choose a **Program**, a **Format** — CSV, Excel or PDF — and a **From** and **To** date. The button counts what you are about to take: **Export 172 rows**.

### Import History

*Validation outcomes, row-level failures, and dataset traceability records.* Every import is kept here with what passed and what did not, so a bad import can be explained rather than just repeated.

::: tip Two different exports
This exports **submission records** — the audit trail. To export the figures as an M&E table, use the indicator register's export or [Settings → Export Data](/user-manual/settings). They answer different questions.
:::

---

## Quality Scorecard

*Health score per program from staleness, draft backlog, missing periods, return rate, and coverage.*

{{figure:data-hub-quality}}

An **Organization data health** score out of 100 sits at the top, with **Last refreshed** beside it, and then one row per programme with the five factors behind its own score:

| Factor | What it measures |
|---|---|
| **Staleness (>30 days)** | Indicators with no new approved figure for a month |
| **Draft backlog (>7 days)** | Drafts left unsubmitted for over a week |
| **Missing periods** | Indicators with nothing reported in their current period |
| **Return rate** | The share of submissions sent back for correction |
| **Coverage** | The share of the programme's indicators that have ever been reported |

The first four pull the score down and coverage pushes it up, so a programme reporting a little of everything scores better than one reporting all of a few things.

::: warning A low score is not a bad programme
It measures the reporting, not the work. A programme that is going well but has not entered a figure for five weeks scores badly, and that is the point — the score is a prompt to go and look, not a verdict.
:::

---

## Where to go next

- [Entering data](/user-manual/data-entry) — the other end of everything on this page
- [Period sign-off](/user-manual/period-sign-off) — what is outstanding, period by period
- [Analysis](/user-manual/analysis) — the same figures drawn rather than tabulated
