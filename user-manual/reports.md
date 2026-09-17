---
title: Reports
chapter: 15
roles:
  - viewer
  - me_officer
  - org_admin
---

# Reports

A **report** pulls your approved figures, narratives, activities, budget, risks and evidence together into one document for a period.

Reports export as **PDF**, **Word** or **Excel**, and can be shared by a link that needs no login.

Open it from the top bar: **Reports**.

<div class="doc-page-hero">
  <p class="doc-page-hero__eyebrow">Donor delivery</p>
  <p class="doc-page-hero__title">Turn approved figures into a document you can send.</p>
  <p class="doc-page-hero__copy">Use this once approvals are done and the period is closed.</p>
  <div class="doc-page-hero__meta">
    <div class="doc-page-hero__meta-item">
      <span>Best for</span>
      <strong>M&amp;E officers and org admins</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Best moment</span>
      <strong>After the review queue is clear and the period is closed</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Main outcome</span>
      <strong>A report to share as a link, a PDF, a Word file or a spreadsheet</strong>
    </div>
  </div>
</div>

---

## Four things under Reports

The left rail inside Reports has four items, and they do different jobs.

| Item | What it is |
|---|---|
| **All Reports** | Assembled documents |
| **New Report** | The assembly wizard |
| **Indicator register** | Every indicator, one row each — see [Indicator register](/user-manual/indicator-register) |
| **Tracking table** | Every indicator against every period — see [Tracking table](/user-manual/indicator-register#tracking-table) |

This chapter covers the first two.

---

## The reports list

The page is headed **Reports**, with the line *Assembled donor reports, program reviews, and evidence packs.*

It is a list of cards, one per report. Click a card to open it.

{{figure:reports-list}}

Each card shows the title, the report type, its status, the period it covers, how many programmes it includes, and when it was created. A **Shared** badge means it has a live share link.

Hover a card for two icons: share, and delete.

### The four statuses

| Status | What it means |
|---|---|
| **Draft** | Not assembled |
| **Assembling…** | Being built. The list refreshes itself every few seconds |
| **Ready** | Built and readable |
| **Published** | Built and shared |

There is no search box, no filter and no sort on this page.

---

<!-- roles: me_officer, org_admin -->

## Assembling a report

Click **New Report**. It is a four-step wizard.

### Step 1 — Choose report type

Each type is a card carrying its name, a description, and a chip for every section it contains — so you can see what you are going to get before you pick.

{{figure:report-wizard-type}}

The sections a report holds are decided by its type. You do not choose them individually.

Click **Continue**.

### Step 2 — Select scope

*Choose which programs, time period, and donors to include. Leave blank to include all.*

{{figure:report-wizard-scope}}

| Field | Notes |
|---|---|
| **Report title (optional)** | Free text |
| **Reporting periods** | Required. Pick one or several. **Whole year** buttons select a fiscal year at once |
| **…or set an exact date range instead** | **From** and **To**. Choosing a date range clears the periods, and vice versa |
| **Programs** | All of them if you pick none |
| **Filter by donor** | Optional |

Two rules on the periods, both enforced:

- Several periods must be **consecutive**. A report that skipped a quarter in the middle would still count it in the totals, so a gap is named and refused.
- You cannot mix kinds. *A report covers one kind of period at a time. Pick either quarters or years, not both.*

A line confirms what you have chosen before you commit.

Click **Assemble report**.

### Step 3 — Assembly

*Assembling your report… Pulling indicators, narratives, activities, and budget data.* The page watches the server and updates itself. If it fails you get a message and a **Go back** link.

### Step 4 — Done

**Report assembled!** Two buttons: **All reports** and **View report**.

<!-- /roles -->

---

## Reading an assembled report

{{figure:report-view}}

The header carries your organisation's name, the period, the donors, and when it was generated.

Four figures follow: **Programs**, **Indicators**, **Activities** and **Beneficiaries**, with a budget line underneath.

Then **Indicator Performance Overview**, splitting every indicator into **On Track**, **At Risk**, **Off Track** and **No Data**.

The body is organised by programme, then by project. Each of these sections appears only if the assembled data holds something for it:

| Section | What is in it |
|---|---|
| **Projects in this Programme** | |
| **Results Framework** | The results tree |
| **Indicators** | Indicator, Level, Target, Actual, Progress, Status |
| **Review of results** | The judgements recorded in Performance Review |
| **Participation** | Who was reached |
| **Activities** | What was done |
| **Budget** | Line, Category, Planned, Actual — with **Approved**, **Spent** and **Burn Rate** above it |
| **Risks** | |
| **Narratives** | The written answers for the period |
| **Evidence Documents** | |

::: warning Narratives are written before assembly, not in the report
The report shows narratives read-only. You cannot type into it. Write them first, in **Submissions → Narratives**, having chosen a project and a period. Then assemble.
:::

---

## Exporting

Four buttons in the report's toolbar: **Word**, **Excel**, **PDF** and **Share**.

The first three are rendered on the server, not printed from your browser, so they carry your organisation's branding and paginate properly. The file is named after the report.

---

<!-- roles: me_officer, org_admin -->

## Sharing a report

1. Click **Share**. The dialog is headed **Share Report**: *Anyone with this link can view the report — no login required.*
2. Click **Generate share link**.
3. The address appears. **Copy link** puts it on your clipboard.

{{figure:report-share}}

The address is your organisation's address followed by `/r/` and the report's token.

**Anyone with this link can read the report.** There is no password and no expiry date.

### Replacing a link

**Regenerate link** issues a new address and the old one stops working immediately. The dialog warns you: *This link is already active. Regenerating will invalidate the old one.*

::: warning There is no revoke button
To stop a link working you either regenerate it — which gives you a new one — or delete the report, which the delete dialog warns will stop any active share links immediately. Regenerating is the safe option when a link went to the wrong person.
:::

### Deleting a report

Hover the card and click the bin. The dialog is headed **Delete report?** and warns that active share links will stop working.

Deleting a report does not touch the figures. Only the document goes.

<!-- /roles -->

---

## What a share link shows

The report, rendered as a clean document, with a **Download PDF** button. No sign-in prompt and no ImpactMEL navigation.

The same server-side renderers produce the file whether it comes from a signed-in export or a share link, so a funder gets exactly what you see.

---

## Common questions

**Can I update a report after sharing it?**
The link shows the report as assembled. To reflect new figures, assemble a new one.

**Can a report cover several programmes?**
Yes. Leave **Programs** blank for all of them, or tick the ones you want.

**Can I password-protect a share link?**
No.

**Can I edit the narrative text inside a report?**
No. Write narratives in **Submissions → Narratives** before you assemble.

**What language are reports in?**
You write the narrative text in whatever language you like. The generated headings and column names are in English.

---

## Where to go next

- [Indicator register and tracking table](/user-manual/indicator-register) — the figures without the prose
- [Period sign-off](/user-manual/period-sign-off) — close the period before you report on it
- [Review and approve](/user-manual/review-and-approve) — only approved figures reach a report
