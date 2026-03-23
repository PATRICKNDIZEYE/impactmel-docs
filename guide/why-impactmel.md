# Why ImpactMEL

<div class="doc-page-hero">
  <p class="doc-page-hero__eyebrow">Positioning</p>
  <p class="doc-page-hero__title">Most NGOs run M&amp;E on spreadsheets. ImpactMEL is what they need instead.</p>
  <p class="doc-page-hero__copy">
    The humanitarian and development sector spends billions each year on programs — then tracks
    results in colour-coded Excel files emailed back and forth. ImpactMEL was built to change that.
    This page explains who it is for, what problem it solves, and why alternatives fall short.
  </p>
</div>

---

## The problem

Every M&E officer in a development organization knows this cycle:

1. Field staff collect data on paper or a disconnected mobile form
2. Someone manually copies data into a shared spreadsheet
3. A senior M&E officer cleans, validates, and reformats it
4. A report writer pulls figures from multiple spreadsheets into a Word document
5. The donor receives a PDF, questions numbers, and the cycle repeats

This process is slow, error-prone, and breaks down under any scale. When a program runs across multiple projects, countries, or donor agreements, spreadsheets become unmanageable.

The result: organizations spend more time managing data than learning from it.

---

## What ImpactMEL replaces

### Spreadsheets (Excel / Google Sheets)

The default for small organizations. Works until it doesn't.

| Pain point | What happens |
|---|---|
| Version control | Multiple copies float around; no one knows which is current |
| Aggregation | Manual formulas break when structure changes |
| Multi-project | Separate files per project with no unified view |
| Reporting | Copy-paste into Word every quarter |
| Collaboration | Two people can't edit safely at the same time |
| Disaggregation | Adding sex or age breakdowns requires rebuilding the whole sheet |

ImpactMEL replaces every spreadsheet with a live, collaborative workspace. One source of truth from field entry to donor report.

### DevResults

A US-based M&E platform used by large INGOs and USAID implementing partners. Technically capable, but expensive and complex to configure.

| | DevResults | ImpactMEL |
|---|---|---|
| Setup time | Weeks of consultant-led onboarding | Self-service onboarding wizard in under 30 minutes |
| Pricing | $15,000–$50,000+ per year | Transparent per-seat pricing |
| Data collection | Basic | Full form builder with conditional logic |
| Results framework | Supported | Visual tree editor with drag-and-drop |
| API access | Limited | Full REST API with OpenAPI docs |
| Modern UX | Legacy interface | Built on Next.js, responsive, mobile-friendly |

### DHIS2

An open-source health information system widely deployed by Ministries of Health and PEPFAR-funded programs.

DHIS2 is the right choice when you are managing a national health system or a large standardized programme across thousands of facilities. It is the wrong choice when you need:

- A results framework beyond health indicators
- Custom form logic for activity-level data
- Donor-ready reports without a developer
- Cross-program portfolio views

ImpactMEL is purpose-built for the M&E officer who manages multiple programs across multiple donors — not a ministry running a nationwide HIS.

### KoboToolbox / ODK

Excellent for data collection. Not a full M&E system.

KoboToolbox solves form design and offline data collection beautifully. It does not solve indicator tracking, results frameworks, donor reporting, or portfolio dashboards. Organizations often use it alongside a spreadsheet system, which recreates the same data silos.

ImpactMEL includes a full form builder that feeds data directly into indicator reports — no export/import step required.

---

## Who ImpactMEL is for

### Best fit

- **International NGOs** managing 5–50+ active projects across multiple donors
- **National NGOs and CBOs** transitioning from spreadsheets to a structured system
- **Research organizations** running multi-site evaluations with complex indicator sets
- **Government implementing agencies** reporting to bilateral or multilateral donors

### Common use cases

- USAID-funded programs needing quarterly indicator reporting
- FCDO, EU, GIZ, and UN-funded projects with logical framework requirements
- Organizations adopting a Theory of Change or Results Framework for the first time
- Portfolio management across several sub-grantees and partners

---

## Core design principles

**1. One source of truth**
Every data point — from a field form submission to a published donor report — flows through a single system. No export, no duplication, no reconciliation.

**2. Role-appropriate access**
Field staff see only what they need to submit. Reviewers see submissions waiting for approval. Program managers see portfolio health. Donors see a clean public report. Same data, right view for each actor.

**3. Indicator reuse**
An indicator defined once can be linked to multiple projects. Each project sets its own targets and reports independently. Aggregated results roll up automatically.

**4. Donor-ready output**
Reports are assembled from approved data. Share a link with your donor — no login required. Download a PDF. No reformatting.

**5. Built for growth**
Start with one program. Add 50 without changing anything. The architecture scales without re-implementation.

---

## The market context

The global development sector manages over **$200 billion** in Official Development Assistance (ODA) annually. Every dollar of that funding comes with reporting requirements attached.

Yet the tools used to fulfill those requirements are two decades behind what is standard in enterprise software. The M&E software market is growing as funders demand more rigorous accountability — and legacy tools are too expensive, too complex, or too limited to meet that demand.

ImpactMEL is positioned at the intersection of affordability, completeness, and modern UX: a platform that an NGO of 20 people can adopt without a consultant, that scales to an INGO of 2,000.

---

::: tip Ready to evaluate?
Start with the [User Manual](/user-manual/overview) to understand what the platform can do, or go directly to [Getting Started](/user-manual/getting-started) to create your organization.
:::
