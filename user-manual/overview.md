# Platform Overview

<VideoEmbed title="01 · Platform overview — a 2-minute tour" />

## What is ImpactMEL?

**ImpactMEL** is an enterprise Monitoring, Evaluation & Learning (M&E) platform built for development organizations, NGOs, and their donors. It replaces fragmented Excel spreadsheets and disconnected legacy tools with a single, real-time system that tracks development impact from the moment field data is collected all the way to the final donor report.

> The core promise: **one source of truth**, from field data entry to donor boardroom — with no copy-paste, no emailed attachments, and no reconciliation.

::: info 📸 Figure 1.1 — ImpactMEL Home Screen
<ImageModal src="/user-manual/images/01-01-home-screen.png" alt="ImpactMEL Home Screen" />

The ImpactMEL application home screen as it appears after login, showing the organization dashboard with the sidebar navigation on the left, top navigation bar with the ImpactMEL logo, and the main content area displaying program portfolio cards.

**File:** `user-manual/images/01-01-home-screen.png`
:::

---

## Who Uses ImpactMEL?

ImpactMEL is designed for teams with different responsibilities. Each person interacts with the system in a different way:

| Role | Who they are | What they do in ImpactMEL |
|---|---|---|
| **Org Admin** | Country Director, Operations Manager | Manages the organization, invites team members, configures settings, creates programs |
| **M&E Officer** | MEAL Officer, Data Manager | Defines indicators and results frameworks, manages reporting periods, reviews and approves submitted data |
| **Program Manager** | Project Manager, Technical Lead | Monitors project progress, views dashboards, manages activities |
| **Reporter** | Field Officer, Data Entry Staff | Submits indicator values for their assigned projects and periods |
| **Viewer** | Senior Management, Partner Organization | Read-only access to dashboards and reports — no data entry |
| **Donor** | Funder, Bilateral Agency | Receives shared public report links — no account required |

---

## Key Concepts

Before using ImpactMEL, it helps to understand how the system is organized. Everything in ImpactMEL follows a clear hierarchy:

### Organization
Your organization is the top-level account. All programs, projects, indicators, and reports belong to your organization. If you work with partner organizations, each partner has their own separate organization account.

### Program
A **Program** is a funded initiative — typically tied to a specific donor agreement or multi-year strategy. For example: *"WASH for All" (2025–2027)*. A program contains one or more projects and is linked to one or more donors.

### Project
A **Project** is the operational implementation unit within a program. It has a specific budget, start and end date, location, and team. For example: *"Rwanda WASH Phase 1"*. Projects are where day-to-day data is collected and reported.

### Results Framework
The **Results Framework** is the logical backbone of your program. It maps the causal chain from your daily activities to long-term impact:

```
Impact  →  Outcome  →  Output  →  Activities
```

Every indicator and activity is linked to a node in this framework, so you always know what work is contributing to which result.

### Indicator
An **Indicator** is a measurable unit that tracks progress toward a result. For example: *"Number of households with access to clean water"*. Indicators are defined once and reused across projects. Each project sets its own target and reports values per period.

### Reporting Period
A **Reporting Period** is a defined time window for data submission — typically quarterly or annually. For example: *"Q1 2026 (Jan–Mar)"*. Reporters submit their indicator values against a specific period.

### Report
A **Report** is an assembled donor-ready document that pulls together indicator data, narratives, budget summaries, and activities for a given period. Reports can be shared via a public link or exported as a PDF.

---

## Data Flow

Data moves through ImpactMEL in one direction:

```
Field Staff → Form Submission or Indicator Report
           → M&E Officer Review & Approval
           → Report Assembly
           → Donor PDF or Public Link
```

There is no copy-paste between these steps. Once data is submitted and approved, it is automatically included in reports.

---

## Glossary

| Term | Definition |
|---|---|
| **Disaggregation** | Breaking down an indicator value by category (e.g. sex: Female / Male / Other) |
| **Aggregation Method** | How indicator values are combined across periods: sum, average, latest, min, or max |
| **Baseline** | The starting value of an indicator before the project began |
| **Target** | The planned value to achieve by a given period or end of project |
| **Progress Score** | Actual value ÷ Target × 100 — shown as a percentage with traffic-light color coding |
| **Formula Indicator** | An indicator whose value is automatically computed from other indicators |
| **Share Token** | A unique URL that gives anyone access to a specific report — no login required |
| **RBAC** | Role-Based Access Control — the permission system that determines what each user can see and do |
| **Org Admin** | Highest permission level — manages members, settings, and all data in the organization |
| **M&E Officer** | Can manage indicators, approve data, and manage reporting periods |
| **Reporter** | Can submit data for assigned projects |
| **Viewer** | Read-only access to dashboards and reports |

---

## What ImpactMEL Replaces

| Old Tool | Limitation | ImpactMEL Solution |
|---|---|---|
| Excel indicator tracker | No version control, emailed copies get out of sync | Single live database, always current |
| Word/PDF donor reports | Manual copy-paste from Excel, hours of formatting | One-click assembly from live data |
| Google Forms | No link to M&E system | Forms feed directly into indicator values |
| DevResults | No real PDF export, no self-hosting | True binary PDF, open API, self-hostable |
| Email attachments | No audit trail, no approval workflow | Built-in submission → review → approval cycle |
