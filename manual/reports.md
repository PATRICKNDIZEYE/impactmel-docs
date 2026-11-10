# Reports

<p class="lead">Reports are assembled from approved figures, never typed. You choose a type, a scope and a period; ImpactMEL builds the report; you add the written parts, then publish it. Publishing locks the report and records a fingerprint, so a figure sent to a donor can be shown exactly as it stood on the day.</p>

**Who can do this:** anyone with report permission can read and export reports. Directors and M&E officers write and publish them by default.

## The Reports page

Open **Reports** in the sidebar.

![The Reports page.](/images/reports-list.webp)

Use the tabs **All**, **Drafts**, **Ready** and **Published**, and filter by type. Each row has **Word**, **PDF** and **Excel** downloads. If a funder has sent you requests, a **Funder requests** tab appears. See [Funder workspace](/manual/funders#the-grantee-side).

## Report types

| Type | Scope | Use it for |
|---|---|---|
| Quarterly Donor Report | One programme, or all | The regular report to a donor: results, money, risks and next steps |
| Annual Program Review | One programme, or all | The year in review for a board or donor |
| Programme Performance Report | One programme | How a programme's projects are performing |
| Results Framework Progress | One programme | Progress through the results chain |
| Indicator Performance Report | One project | Every indicator against its targets |
| Evidence Pack | One project | The figures with their evidence and verification |
| Activity Report | One project | What was delivered and who took part |

## Create a report

1. Choose **New report**.
2. Choose the report type and its scope.
3. Choose the periods **From** and **To**. They must be the same kind of period, for example two quarters.
4. Give it a title, or leave it blank to name it after the type and period.
5. Choose **Assemble report**.

![Creating a new report.](/images/report-new.webp)

## The quarterly donor report

The Quarterly Donor Report answers, in order: are we on track, why or why not, and what happens next. Then it shows what it cost and whether the figures can be trusted. A donor can stop after the first page.

![A quarterly donor report on screen.](/images/report-view.webp)

| Section | Contains |
|---|---|
| Cover | Organisation and programme, donor, reporting period, grant reference and value, coverage, report status and version, contact |
| 01 Quarter at a glance | Headline results against target, the status of results, money spent against plan and budget, the written summary, what needs attention, requests to the donor |
| Results against targets | Indicators down, projects across, the programme total at the right. Each cell shows actual, % of target and target, with change since the last period. The status thresholds are printed. Disaggregation follows |
| Results and budget lines needing attention | Each at-risk or off-track result and each budget line beyond the variance threshold: position, what the team reported, action, owner and due date |
| Review of results | Performance judgements for the period |
| Delivery by project | What each project achieved, what got in the way, next quarter, and activities. An optional story of change with a quote and photo |
| Financial summary | Budget version and approval, spending by heading and by project, variance explanations |
| Risks and issues | One register for the grant: rating, movement, response, owner and next review |
| Next quarter | Priorities by project, with target dates |
| Data notes and sign-off | Data sources and review status, the progress formula, thresholds, sections left out, prepared, reviewed and approved by, and the content fingerprint |
| Annex | Full indicator tables by project |

Sections with no data are left out and listed in the data notes. Missing explanations show as "Explanation outstanding", and indicators without targets as "No target set". Progress uses the [baseline formula](/manual/indicators#the-progress-formula).

![Results against targets: indicators by project, with the programme total.](/images/report-results.webp)

The other report types use the same building blocks and rules.

## Edit a draft

Choose **Edit report**.

![Editing a draft report.](/images/report-edit.webp)

- Move sections (drag or use the arrows), reword their headings, or hide them.
- **Add a section**: Challenges, Next steps, Lessons learned, or your own.
- Leave out a single indicator, with an internal reason. Readers see that an indicator is not shown, not the reason.
- Choose which risks to include: those shared with the funder only, or all.
- **Refresh figures** re-reads approved figures and keeps your layout and text.

Figures cannot be typed or changed in a report. To change a figure, correct it through [review](/manual/review).

### Report details

On a Quarterly Donor Report draft, the **Report details** panel holds the parts only your team can write:

![The Report details panel.](/images/report-details.webp)

- **Summary**, three or four sentences on how the quarter went;
- **Requests to the donor**, such as decisions, approvals or a no-cost extension. If empty, the report prints "None this quarter";
- **Contact**, the person the donor should contact;
- **Grant**, taken from the funding agreement unless you type an override;
- **Story of change**, with a direct quote, who said it, and a photo from your evidence;
- **Actions on what needs attention**, each with an owner and due date;
- **Next-quarter target dates**.

Choose **Save details**. Empty fields show as prompts in the draft and are left out when the report is published.

### Narrative with AI

If AI features are on, **Draft from approved figures** writes a narrative from the report's approved figures. You can **Accept AI text**, **Edit text** or **Write it** yourself. A report cannot be published while any section is still an AI draft.

## Publish a report

Choose **Publish**. ImpactMEL locks the report, tells the team, and records a SHA-256 fingerprint of its figures, layout and text.

![A published report, with its snapshot and fingerprint.](/images/report-fingerprint.webp)

- The **Snapshot** card shows the publication date and the payload hash. **Copy** it to quote it.
- To change a published report, choose **Create new version**. Each published version keeps its own fingerprint, listed under **Versions**.
- The **Changes** card shows the report's history.

## Export

Every report downloads as **Word**, **PDF** or **Excel**, with your logo. The Word file keeps the same sections and real headings, so it can be edited. The Excel file has flat sheets for indicators, disaggregation, budget lines, activities and risks.

## Share a report

Once a report is published, you can give a funder a read-only link.

1. Choose **Create a read-only link**, then **Create link**.
2. Copy the link and send it.

![The read-only link on a published report.](/images/report-share-link.webp)

The link opens the published report with its Word, PDF and Excel downloads, and nothing else in your workspace. It does not show hidden indicators, internal reasons or risks not shared with the funder. The link does not expire. Choose **Switch the link off** to stop it; deleting a report also ends its link.

![A shared report as the funder sees it.](/images/public-report.webp)
