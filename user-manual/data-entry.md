---
title: Entering data
chapter: 10
roles:
  - reporter
  - me_officer
  - org_admin
---

# Entering data

This chapter is mainly for **reporters** — the people who enter the figures at the end of a period.

There are four ways a figure gets into ImpactMEL. Pick the one that matches how the figure reaches you.

| Route | Best for |
|---|---|
| Project → **Progress Reports** | Entering a period's figures for a whole project in one sitting |
| Project → **Collect Data** | One indicator and one period at a time, with evidence |
| **Progress Reports → Bulk Import** | A spreadsheet of figures |
| A public collection link | Someone outside your organisation reporting a figure |

What happens after entry — approval — is covered in [Review and approve](/user-manual/review-and-approve).

---

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/40-enter-indicator-values.mp4" title="40 · Enter indicator values (reporter)" duration="29s" />
  <VideoEmbed src="/videos/41-submit-for-review.mp4" title="41 · Submit data for review" duration="29s" />
  <VideoEmbed src="/videos/42-review-approve.mp4" title="42 · Review and approve submissions" duration="32s" />
  <VideoEmbed src="/videos/43-return-for-correction.mp4" title="43 · Return a submission for correction" duration="22s" />
  <VideoEmbed src="/videos/44-data-hub.mp4" title="44 · Audit everything in the Data Hub" duration="33s" />
</div>

## Finding what you owe

Sign in and your dashboard shows it: **Drafts To Submit**, **Returned (Fix Needed)** and **Due Soon (7 days)**.

**Assigned Programs** lists the projects you can report on. If it is empty, you have not been added to a project's team yet. Ask an org admin.

---

## Progress Reports — a period at a time

Open the project, then **Progress Reports** in the left rail. The page is headed **Indicator Progress Reports**, with the line *Record actual values and narrative for each reporting period*.

{{figure:progress-reports}}

### Choose the period first

The button at the top right shows the current period and its status — **Open**, **Closed** or **Locked**. The period containing today is chosen for you and tagged **Current**.

Periods here are worked out from your indicators' reporting frequency: monthly, quarterly, twice-yearly, termly or annual.

Four figures sit above the list: **Total Indicators**, **Values Entered**, **Submitted** and **Still Draft**, plus **Due:** and the date where there is a deadline.

### Enter a figure

1. Find the indicator's row.
2. Type into the **Value** box. The unit symbol is shown inside it.
3. An **Unsaved** chip appears. Click **Save** on the row.
4. When you are ready for review, click **Submit**.

Submitting saves first, so you cannot lose a figure by forgetting to save.

### Say what happened

Click the row to expand it. That is where the rest of the entry lives:

| Field | What to put in it |
|---|---|
| **Narrative Explanation** | What drove this result, and any deviation from target |
| **Qualitative Value / Description** | For a qualitative indicator, this replaces the number |
| **Data Source** | Field survey, HMIS, admin records |
| **Verification Notes** | Verified by a field officer, spot-check done |
| **Geographic scope** | Optional. Without it the figure applies to the whole project |

The expanded panel has its own **Save Draft** and **Submit for Review** buttons.

::: tip Always write a narrative
The figure tells a reviewer what happened. The narrative tells them why. A figure with no narrative is the one that gets sent back.
:::

### Submit everything at once

Where drafts are waiting, a bar appears reading *N indicators still in draft* with a **Submit All Drafts** button.

### Export the period

**Export** at the top right writes an Excel file of the period — indicator, type, unit, target, actual, status, narrative, data source and verification notes.

### When a period is closed or locked

A **locked** period shows a banner: *This period is locked. No changes can be made.* Every field goes read-only and Save and Submit disappear.

<!-- TODO: verify this on a live cell. Period sign-off closes ORG-WIDE periods and the server refuses figures against them. Progress Reports reads PER-INDICATOR periods and only treats 'locked' as read-only — a 'closed' one still renders editable inputs. Both statements can be true at once because they are two different period tables, but a reporter who types into an editable box and then gets rejected on save will read that as a fault. -->
A **closed** period shows its badge, and the org-wide calendar refuses new figures against it. If you need to report into a closed period, ask an M&E officer to reopen it — they have to give a written reason, which stays on the record. See [Period sign-off](/user-manual/period-sign-off).

---

## Collect Data — one figure, with evidence

Open the project, then **Collect Data**. The page shows four figures — **Open periods**, **Active indicators**, **Overdue** and **Due this week** — then a section headed **Open for Reporting**.

Each indicator card lists its open periods, with a badge reading **Overdue by 4d**, **Due in 9d** or **Due** and a date.

1. Click the period row you want to report.
2. The entry form opens.
3. Enter the values. **Save Draft** keeps it; **Submit for Review** sends it.

Submitting asks you to confirm: *Once submitted, this data will go to your reviewer. You won't be able to edit it unless it's returned.*

The form's toolbar also has **Export Template**, **Import Data** and **Import History** for handling a sheet of values for that one indicator.

A project with nothing open says **No Open Reporting Periods** and offers **Manage Indicators & Periods**. A collapsed **Other Indicators** block tags the rest as *all closed* or *no periods*.

---

## Bulk import — a spreadsheet of figures

Open **Progress Reports**, then **Bulk Import**. Three numbered steps.

{{figure:bulk-import-template}}

### 1 · Select reporting period & download template

Choose the **Reporting Period**, then click **Download Template**.

The file is an Excel workbook with one sheet, **Indicator Data**, already filled in with every indicator on the project. You fill in two columns: **actualValue** and **notes**. Leave the identifier columns alone.

### 2 · Fill in values and upload

Drag the filled template onto **Drag & drop your filled template here**, or click to browse. Only `.xlsx` files are accepted.

### 3 · Preview & confirm

The preview counts how many rows are **ready** and how many have an **error**, and lists them with a status of **Ready**, **Error** or **Skipped**. Row-level messages name the problem — a missing identifier, or a value that is not a number.

Click **Import N reports**.

You then get **Import complete**, a count of imported and failed rows, and buttons for **View Indicator Reports** and **Import Another**.

Rows with an empty **actualValue** are skipped rather than treated as zero. Notes land in the narrative.

---

<!-- roles: me_officer, org_admin -->

## Collecting from outside your organisation

A public collection link lets someone with no account report a figure against one indicator.

1. Open the project → **Collect Data**.
2. Click **Share Form** on an indicator. The modal is headed **Shareable Forms**.
3. Click **Create Shareable Form Link** and fill in **Form Title**, the **reporting unit** shown on the form, the **Reporting Period**, and a **Description**. Toggle **Require Name** and **Require Email** as you need.
4. Copy the link and send it.

Per link you can copy it, open it, **Pause** or **Resume** it, see **View Results** and **View Responses (N)**, or delete it. A link is **active**, **paused** or **closed**.

Deleting a link deletes the responses collected on it.

### Turning a response into a submission

A public response is not a submission until someone makes it one.

1. Go to **Submissions** in the top bar.
2. Open the **Public Forms** tab.
3. Find the row and click **Create submission**.

Converted rows show a **Converted** chip. A message tells you how many drafts were created and to switch to **System & Imports** to submit or approve them.

Do them one at a time. There is no way to convert several at once.

<!-- /roles -->

---

## Submissions — every figure in one place

**Submissions** in the top bar is headed **All Submissions**, with the line *All submission records across programs — manual, imported, and public forms.*

{{figure:submissions-overview}}

### The five statuses

Five clickable pills across the top double as counts and as filters:

| Status | What it means |
|---|---|
| **Draft** | Saved, not submitted. Nobody else is waiting on it |
| **Submitted** | Waiting on a decision |
| **Returned** | Sent back with a reason. Yours to correct |
| **Approved** | Published. It counts |
| **Locked** | Final. It cannot be changed |

### Narrowing the list

A filter bar under the pills: a search box for indicator and period, then **All Indicators**, **All Periods**, **All Statuses**, **All Sources** (Manual, Imported, Public Forms) and **All Submitters**, plus two date boxes. **Clear** resets everything.

### Three tabs

**System & Imports**, **Public Forms** and **Narratives**. The first two can be read as **Cards** or in **Sheet View**.

**Narratives** stays disabled until you have picked a project and a period — its tooltip says so. Inside, each narrative question has a box and its own **Save** button.

### Inside a submission

Click a card to expand it. You get **Submitted by** and **When**, a summary broken down by disaggregation, a **Decision Log** with every decision, its time, who made it and the reason, a **Comment Thread**, and a table of values with **Input**, **Value**, **Estimated**, **Disaggregations** and **Notes**.

{{figure:submission-expanded}}

### Discussing a submission

Type in the reply box and click **Submit**. `@` opens a list of colleagues to mention, including **@everyone**.

Replies notify everyone in the thread automatically, so use `@mention` only when you need one specific person.

Comment threads are not available on indicator progress reports yet — the panel says so.

<!-- roles: me_officer, org_admin -->

### Deciding from here

A **draft** or **returned** submission shows **Submit**. A **submitted** one shows **Approve** and **Return**.

**Return** requires a reason: *Add a short reason so the submitter knows what to fix.*

For a whole period at once, choose a **Period** in the filter bar — the bulk panel stays disabled until you do — and use **Submit All**, **Return All** or **Approve All**. Each asks you to confirm. **Export** writes the list to Excel.

For a proper review queue with the approval chain attached, use [Review](/user-manual/review-and-approve) instead.

<!-- /roles -->

---

## What happens after you submit

```
You submit                     → Submitted
An M&E officer approves        → Approved, and it counts
An M&E officer sends it back   → Returned, with a written reason
```

You are emailed either way, and the reason comes with the return.

To correct a returned figure: open the project → **Progress Reports**, find the row — it will be editable again — change the figure, and **Submit**.

---

## Common questions

**Can I report into a period that has been closed?**
No. A closed period refuses new figures. Ask an M&E officer to reopen it; they must give a reason, which is kept.

**What if I submitted the wrong figure?**
Ask a reviewer to send it back. Once returned, you can edit and submit again.

**Can I report for several periods at once?**
Yes. Change the period at the top of Progress Reports and carry on.

**Is there a spreadsheet import?**
Yes — **Progress Reports → Bulk Import**, with a template pre-filled with your indicators.

---

## Where to go next

- [Review and approve](/user-manual/review-and-approve) — what happens to your figure next
- [Forms](/user-manual/forms) — building a form for the field
- [Activities and participants](/user-manual/activities) — recording who was reached
