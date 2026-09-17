---
title: Figure capture list
chapter: 0
roles:
  - org_admin
---

# Figure capture list

Every `{{figure:<key>}}` marker in the manual, in chapter order.

Numbers are **not** written into the prose. The build generates them, because filtering the manual by role removes chapters and sections and renumbers everything after them.

**Paths** are relative to the instance, so `/org/<orgId>/dashboard` means
`https://<client>.impactmel.com/org/<orgId>/dashboard`.

**Capture as** is the role to be signed in as when taking the screenshot. It matters: the dashboard, the top bar and most rails render differently per role, and a screenshot taken as an org admin will show a reporter controls they do not have.

Capture on **demo.impactmel.com** (Meridian Impact Alliance), never on a client cell.

---

## 1 · Platform overview

| Key | Capture from | As | Caption |
|---|---|---|---|
| `app-home` | `/org/<orgId>/dashboard` | org_admin | The top bar and the organisation dashboard, as they appear after signing in. |

## 2 · Getting started

| Key | Capture from | As | Caption |
|---|---|---|---|
| `register` | `/register` | signed out | The registration form, with Continue with Google above it. |
| `org-setup` | `/org/<orgId>/dashboard`, first sign-in | org_admin | The organisation setup dialog, asking for a name and a code. |
| `top-nav-annotated` | `/org/<orgId>/dashboard` | org_admin | The top bar annotated: organisation switcher, the five primary items, Analysis, More, search, ?, New and the avatar. |
| `invite-member` | `/org/<orgId>/settings/members` | org_admin | The Invite by email card, with the Role dropdown open on Member, Admin and Owner. |

## 3 · Overview dashboard

| Key | Capture from | As | Caption |
|---|---|---|---|
| `dashboard-admin` | `/org/<orgId>/dashboard` | org_admin | The whole org admin dashboard: tiles, System Insight, Priority Queue and Activity Feed. |
| `dashboard-tiles` | `/org/<orgId>/dashboard` | org_admin | Close-up of the four tiles, each with its comparison line underneath. |
| `dashboard-activity-feed` | `/org/<orgId>/dashboard` | org_admin | The Activity Feed, showing five recent submissions with relative times. |
| `dashboard-indicator-performance` | `/org/<orgId>/dashboard` | org_admin | The Indicator Performance table, with one bar per indicator in the Indicators column. |
| `statistics` | `/org/<orgId>/statistics` | org_admin | The six figures and the Reporting Pressure signals at the top of Statistics. |
| `dashboard-overview` | `/org/<orgId>/dashboard` | me_officer | The dashboard as an M&E officer sees it, with the reviewer's queue in place of the admin tiles. |

## 4 · Programmes

| Key | Capture from | As | Caption |
|---|---|---|---|
| `programmes-list` | `/org/<orgId>/projects` | me_officer | Programmes & Projects, with one programme expanded to show its projects. |
| `new-programme-form` | `/org/<orgId>/projects/new` | me_officer | Create a Program, showing Basic Information and Scope & Context. |
| `duplicate-programme` | `/org/<orgId>/projects`, copy icon on a row | me_officer | Start a programme from this one, with both bring-across checkboxes visible. |

## 5 · A programme's page

| Key | Capture from | As | Caption |
|---|---|---|---|
| `programme-page` | `/org/<orgId>/projects/programs/<programId>` | me_officer | A programme's page: six figures across the top, then its projects with their indicators rolled up. |

## 6 · Projects

| Key | Capture from | As | Caption |
|---|---|---|---|
| `new-project-form` | `/org/<orgId>/projects/new-project` | me_officer | Create a Project, showing Basic Information with Program, Status and Project Name. |
| `project-hero` | `/org/<orgId>/projects/<projectId>` | me_officer | The project header: four figures, the progress bar, the seven shortcut tiles and the four tabs. |
| `project-periods` | `/org/<orgId>/projects/<projectId>/periods` | me_officer | Reporting Periods with an indicator expanded, showing Quick Generate and the period rows. |
| `project-duplicate` | `/org/<orgId>/projects/<projectId>`, Duplicate | me_officer | Start a project from this one, with the Also bring across checkboxes. |

## 7 · Results framework

| Key | Capture from | As | Caption |
|---|---|---|---|
| `framework-chooser` | `/org/<orgId>/projects/<projectId>/result-framework`, project with no framework yet | me_officer | Choose your framework structure — the three structures side by side. |
| `framework-tree` | `/org/<orgId>/projects/<projectId>/result-framework` | me_officer | A built results chain, with linked indicator chips and the Linked indicators count above it. |

## 8 · Indicators

| Key | Capture from | As | Caption |
|---|---|---|---|
| `new-indicator-definition` | `/org/<orgId>/projects/<projectId>/indicators/new` | me_officer | The Definition section of the New Indicator form. |
| `new-indicator-measurement` | same page | me_officer | The Measurement section: unit, direction and the four aggregation methods. |
| `new-indicator-formula` | same page, Aggregation Method set to Formula | me_officer | The formula builder, with an expression, its readback and one input. |
| `indicator-detail` | `/org/<orgId>/projects/<projectId>/indicators/<indicatorId>` | me_officer | An indicator page: four figures, How this indicator is measured, and Performance by period. |

## 9 · Reusing an indicator

| Key | Capture from | As | Caption |
|---|---|---|---|
| `indicator-picker` | `/org/<orgId>/projects/<projectId>/indicators/new` | me_officer | Already measuring this somewhere? with a result selected, showing both Use this definition and Fill in the form instead. |
| `indicator-use-elsewhere` | indicator page, Use in another project | me_officer | Measure this in another project, with a project chosen and a result selected. |

## 10 · Entering data

| Key | Capture from | As | Caption |
|---|---|---|---|
| `progress-reports` | `/org/<orgId>/projects/<projectId>/indicator-reports` | reporter | Indicator Progress Reports with the period picker, the four counts and one row expanded. |
| `bulk-import-template` | `/org/<orgId>/projects/<projectId>/indicator-reports/bulk-import` | reporter | Step 1 of Bulk Import, with the period chosen and Download Template ready. |
| `submissions-overview` | `/org/<orgId>/submissions` | me_officer | All Submissions: the five status pills, the filter bar and the three tabs. |
| `submission-expanded` | `/org/<orgId>/submissions`, one card expanded | me_officer | An expanded submission showing the Decision Log, the Comment Thread and the values table. |

## 11 · Review and approve

| Key | Capture from | As | Caption |
|---|---|---|---|
| `review-queue` | `/org/<orgId>/review` | me_officer | The review queue on Waiting for me, grouped by project and period, with counts on each view. |
| `review-approval-chain` | `/org/<orgId>/review`, a row on a two-approver project, expanded | me_officer | A row badged 1 of 2 approved, with Decisions so far open beneath it. |
| `review-send-back` | `/org/<orgId>/review`, Send back | me_officer | Send this back, with a reason typed and the Reject rather than return checkbox visible. |
| `review-ask-someone` | `/org/<orgId>/review`, Ask someone | me_officer | Ask a colleague to look at this, with a colleague chosen. |

## 12 · Period sign-off

| Key | Capture from | As | Caption |
|---|---|---|---|
| `period-signoff-outstanding` | `/org/<orgId>/periods` | me_officer | A period card with the five counts, the reported bar and the outstanding list. |
| `period-signoff-close-confirm` | `/org/<orgId>/periods`, Close the period | me_officer | The close dialog with Still outstanding listed, and the note that you can close anyway. |
| `period-signoff-reopen` | `/org/<orgId>/periods`, Reopen | me_officer | The reopen dialog with the required reason field filled in. |

## 13 · Activities and participants

| Key | Capture from | As | Caption |
|---|---|---|---|
| `activities-list` | `/org/<orgId>/projects/<projectId>/activities` | me_officer | The activities list, with a sub-activity nested under its parent. |
| `new-activity` | `/org/<orgId>/projects/<projectId>/activities/new` | me_officer | New Activity, showing Basic Information and Participants & Budget. |
| `activity-detail` | `/org/<orgId>/projects/<projectId>/activities/<activityId>` | me_officer | An activity page: the four insight cards, the Indicators panel and Linked Output. |
| `activity-participants` | `.../activities/<activityId>/participants` | reporter | The attendance table with the Status dropdown open on Registered, Attended and Absent. |
| `participant-register-new` | `/org/<orgId>/participants/new` | reporter | Register Participant, with one household member added. |

## 14 · Forms

| Key | Capture from | As | Caption |
|---|---|---|---|
| `forms-list` | `/org/<orgId>/forms` | me_officer | The Forms list, with a published card showing its truncated public address. |
| `form-builder` | `/org/<orgId>/forms/<formId>` | me_officer | The builder: the field palette in three groups, the canvas, and the save indicator. |
| `form-field-inspector` | same page, a Single choice field selected | me_officer | Edit field, showing Label, Help text, Field key, Required field and Choices. |
| `form-share` | same page, published | me_officer | The Share this form banner with Copy, Open and View responses. |
| `form-responses` | `/org/<orgId>/forms/<formId>/responses` | me_officer | The two-pane responses page, with one response selected. |

## 15 · Reports

| Key | Capture from | As | Caption |
|---|---|---|---|
| `reports-list` | `/org/<orgId>/reports` | me_officer | The reports list, with one card showing a Shared badge. |
| `report-wizard-type` | `/org/<orgId>/reports/new`, step 1 | me_officer | Choose report type, each card listing the sections it contains. |
| `report-wizard-scope` | `/org/<orgId>/reports/new`, step 2 | me_officer | Select scope with consecutive periods chosen and the confirmation line showing. |
| `report-view` | `/org/<orgId>/reports/<reportId>` | me_officer | An assembled report: the header, the four figures and Indicator Performance Overview. |
| `report-share` | same page, Share | me_officer | Share Report with a link generated, showing Regenerate link and Copy link. |

## 16 · Indicator register and tracking table

| Key | Capture from | As | Caption |
|---|---|---|---|
| `indicator-register` | `/org/<orgId>/reports/overview` | me_officer | The indicator register: the five clickable counts, the scope and filter controls, and the table. |
| `tracking-table` | `/org/<orgId>/reports/pitt` | me_officer | The tracking table, grouped by programme and project, with target and actual pairs per period. |

## 17 · Roles and permissions

| Key | Capture from | As | Caption |
|---|---|---|---|
| `members-roles` | `/org/<orgId>/settings/members` | org_admin | A member's row showing the membership level dropdown and their attached role chips. |

## 18 · Settings and administration

| Key | Capture from | As | Caption |
|---|---|---|---|
| `settings-organization` | `/org/<orgId>/settings` | org_admin | Organization profile, with the When progress is on track fieldset in view. |
| `settings-members` | `/org/<orgId>/settings/members` | org_admin | The whole Members page: Invite by email, the members table and Pending invites. |
| `settings-reporting-periods` | `/org/<orgId>/settings/reporting-periods` | org_admin | The org-wide calendar, split into Open and Closed / Locked. |
| `settings-disaggregations` | `/org/<orgId>/settings/disaggregations` | org_admin | A disaggregation dimension expanded to show its values and the bulk add box. |
| `settings-export` | `/org/<orgId>/settings/export` | org_admin | Export Data, with two data sets ticked and XLSX chosen. |
| `settings-audit-log` | `/org/<orgId>/settings/audit-log` | org_admin | The audit log with one row expanded into its Before and After panels. |

---

## Notes for whoever captures these

- **Density.** The interface renders at a denser scale than it used to. Capture at the browser's default zoom and do not scale afterwards. The manual never states a pixel size, so nothing in the prose contradicts the screenshot.
- **Empty states.** Where a caption says a control should be visible, make sure the demo data actually produces it. `review-approval-chain` needs a project set to require two approvers, and `period-signoff-outstanding` needs a period with real gaps in it.
- **Role fences.** A figure inside a role fence only appears for those roles. Capture it as one of them, or the screenshot will show controls the reader does not have.
