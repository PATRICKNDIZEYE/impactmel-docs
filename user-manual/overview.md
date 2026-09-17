---
title: Platform overview
chapter: 1
roles:
  - viewer
  - reporter
  - me_officer
  - org_admin
---

# Platform overview

Read this page before you configure anything. It explains who uses ImpactMEL, what each word in it means, and how a figure travels from a field officer to a donor report.

<div class="doc-page-hero">
  <p class="doc-page-hero__eyebrow">Foundations</p>
  <p class="doc-page-hero__title">Understand the people, the objects and the reporting flow before you set anything up.</p>
  <p class="doc-page-hero__copy">Use this page to learn who uses ImpactMEL, what each main area means, and how information moves from data entry to reports.</p>
  <div class="doc-page-hero__meta">
    <div class="doc-page-hero__meta-item">
      <span>Best for</span>
      <strong>Everyone, on their first day</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Use this first</span>
      <strong>Before inviting colleagues, creating programmes or defining indicators</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>You leave with</span>
      <strong>A shared idea of roles, structure and reporting flow</strong>
    </div>
  </div>
</div>

<div class="doc-quick-links">
  <a class="doc-quick-link" href="#what-is-impactmel">
    <span>Start here</span>
    <strong>What the platform replaces</strong>
  </a>
  <a class="doc-quick-link" href="#who-uses-impactmel">
    <span>People and roles</span>
    <strong>The four roles, and what each one does</strong>
  </a>
  <a class="doc-quick-link" href="#key-concepts">
    <span>Core structure</span>
    <strong>The objects that shape your workspace</strong>
  </a>
  <a class="doc-quick-link" href="/user-manual/getting-started">
    <span>Next step</span>
    <strong>Set up your workspace and your team</strong>
  </a>
</div>

## What is ImpactMEL?

ImpactMEL is a monitoring, evaluation and learning platform for development organisations. It holds your programmes, your indicators, the figures your team reports against them, and the reports you send to funders.

The aim is narrow: enter a figure once, then use it in dashboards, registers and reports without entering it again.

{{figure:app-home}}

---

## Who uses ImpactMEL?

There are **four roles**. Every account has exactly one of them.

| Role | Who they usually are | What they do |
|---|---|---|
| **Org admin** | Country director, operations manager | Everything. Manages the organisation, invites colleagues, sets up structure, approves figures, closes periods |
| **M&E officer** | MEAL officer, data manager | Designs the results framework, defines indicators, reviews and approves figures, assembles reports, closes periods |
| **Reporter** | Field officer, data entry staff | Enters figures for the projects they are assigned to, registers participants |
| **Viewer** | Senior management, a funder with a login | Reads dashboards, the indicator register and reports. Cannot enter or approve anything |

A funder who only needs to read one report does not need an account at all. Share the report by link instead.

::: warning A reporter with no project assignment sees nothing
If a reporter is not assigned to any project, their portfolio is empty. That is the assignment, not a fault. See [Roles and permissions](/user-manual/roles-permissions).
:::

---

## Key concepts

### Organisation
The top-level space. Every programme, project, indicator and report belongs to one. If you work with partner organisations, each has its own separate space.

### Programme
A funded initiative, usually tied to a donor agreement or a multi-year strategy — *WASH for All, 2025–2027*. A programme holds one or more projects and can be linked to a donor.

The interface spells this **Programmes**.

### Project
Where the work happens. A project has its own dates, budget, team, locations and indicators. Figures are reported at project level.

### Results framework
The chain from what you do to the change you are after. ImpactMEL can hold it in three shapes, and you choose which per project:

| Shape | Levels |
|---|---|
| Results Framework | Impact → Outcome → Output |
| Logical Framework | Goal → Purpose → Output |
| Theory of Change | Impact → Outcome chains → Output |

Switching between them relabels the levels and keeps your data.

### Indicator
A measure of progress towards a result. An indicator belongs to a project and carries its unit, its direction, how it is aggregated, its baseline, where the figure comes from and what an auditor would ask to see.

A definition can be **reused** in another project. The copy starts with no targets and no figures, so a portfolio total never counts the same result twice. See [Reusing an indicator](/user-manual/reusing-an-indicator).

### Reporting period
A time window figures are reported against — a quarter, a half year, a year. Periods exist at two levels: org-wide periods in **Settings → Reporting Periods**, and per-indicator periods inside a project.

A period is **open**, **closed** or **locked**. A closed period refuses new figures.

### Submission
One reported figure, with its narrative, its breakdown and its decision history. A submission is a draft, then submitted, then approved, returned or locked.

### Report
An assembled document that pulls indicators, narratives, activities, budget and risks together for a period. Reports export as PDF, Word or Excel, and can be shared by link.

---

## How a figure travels

```
A reporter enters it in Progress Reports, a form, or a public link
  → it is submitted for review
  → an M&E officer approves it, or sends it back with a reason
  → approved, it appears in dashboards, the indicator register and reports
  → the period is closed, then locked
```

Two things about that chain are worth knowing up front.

**Some projects need two approvals.** A figure with one approval of two is not published yet.

**Approval is not the same as sign-off.** Approving a figure publishes it. Closing a period says the organisation is finished with that quarter. They are separate steps, on separate screens.

---

## What runs without anyone clicking

- **07:00 daily**, per organisation: deadline reminders, overdue periods, approval deadlines, stale indicators and the draft backlog. Deduplicated, so a re-run the same day sends nothing new.
- **08:00 on Mondays**: a weekly email digest.

Emails that send themselves include: verification code, welcome, password reset, invitation, added to an organisation or role changed, submission received, submission approved, submission returned with the reason, a new comment on a submission, a review task assigned, a report assembled, a report published, the daily alert summary and the weekly digest.

Some figures are worked out fresh every time you look, and never stored: risk scores and bands, achievement progress, period readiness, the setup checklist, calendar entries, indicator aggregation and formulas, and report branding at export.

Some things cannot be changed once set: an approved indicator report, a locked submission, the name and dates of a closed or locked period. A period holding figures cannot be deleted, and reopening one always demands a written reason.

---

## Glossary

| Term | What it means |
|---|---|
| **Aggregation method** | The rule that combines a period's values into one figure: Sum, Average, Latest or Formula |
| **Baseline** | The starting value, before the work began |
| **Direction** | Whether higher is better or lower is better |
| **Disaggregation** | Splitting one figure into groups — sex, age, district |
| **Formula indicator** | An indicator calculated from named inputs rather than typed in |
| **Judgement** | A rating and a written justification recording what a review team concluded about a result |
| **Means of verification** | What an auditor would ask to see |
| **Period readiness** | What is still outstanding in a reporting period |
| **Share link** | A link that lets someone read a report without logging in |
| **Target** | The planned value for a period, or for the whole plan |

---

## What gets easier

| Task | Before | With ImpactMEL |
|---|---|---|
| Tracking indicators | Spreadsheets go out of date | Everyone reads the same current figures |
| Preparing a funder report | Copy, paste and reformat | Assemble from approved figures |
| Collecting from the field | Separate forms, cleaned up later | Forms feed reporting directly |
| Sharing progress | Email attachments, version confusion | A link, or a PDF |
| Knowing what still needs approval | Hard to see | One queue, with counts |
| Closing a quarter | A conversation | A screen that lists what is outstanding |
