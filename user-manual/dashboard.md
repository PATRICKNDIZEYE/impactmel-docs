---
title: Overview dashboard
chapter: 3
roles:
  - viewer
  - reporter
  - me_officer
  - org_admin
---

# Overview dashboard

**Overview** is the first thing you see after signing in. Open it from the top bar.

What it shows depends on your role. A field officer gets a short list of what they owe. A director gets the portfolio. The four versions are described separately below.

<div class="doc-page-hero">
  <p class="doc-page-hero__eyebrow">Daily oversight</p>
  <p class="doc-page-hero__title">Read the state of the portfolio, then go straight from a warning to the screen that fixes it.</p>
  <p class="doc-page-hero__copy">Use the dashboard for daily and weekly checks. Every warning on it is a link.</p>
  <div class="doc-page-hero__meta">
    <div class="doc-page-hero__meta-item">
      <span>Best for</span>
      <strong>Everyone, every day</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Best moment</span>
      <strong>Daily checks and the week before a deadline</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Main outcome</span>
      <strong>A short list of things that need doing now</strong>
    </div>
  </div>
</div>

---

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/02-dashboard-tour.mp4" title="02 · Your dashboard at a glance" duration="22s" />
  <VideoEmbed src="/videos/03-global-search.mp4" title="03 · Find anything with global search" duration="20s" />
  <VideoEmbed src="/videos/04-activity-pulse.mp4" title="04 · Stay updated with Activity Pulse" duration="31s" />
</div>

<!-- roles: org_admin -->

## The org admin dashboard

{{figure:dashboard-admin}}

### Before there is any data

Until you have a programme, a project and an indicator, the dashboard shows four setup steps instead of figures: **Account Created**, **Create a Program**, **Add a Project** and **Define Indicators**. Each carries a button that takes you there, and steps you cannot start yet are marked **Locked**.

### The four tiles

Once there is data, four tiles replace the steps.

| Tile | What it counts |
|---|---|
| **Submissions Approved** | Approved plus locked submissions. Underneath: how many are draft, in review and returned |
| **Submission Completion** | Approved submissions as a share of everything reported. Below 60% it tells you how far short you are |
| **Target Achievement** | Average achievement against indicator targets. Indicators with no target are excluded, and the tile says how many |
| **Indicators On Track** | On-track indicators, out of those that have targets |

{{figure:dashboard-tiles}}

Each tile carries a line underneath comparing it with the period before, so a glance tells you which way it is moving.

::: warning Indicators with no target are excluded, not counted as zero
An indicator whose due targets add up to nothing is left out of Target Achievement entirely. The tile says how many were excluded. If that number is large, your targets are incomplete.
:::

### System Insight

One paragraph naming the single most useful thing about the state of your data right now — a stale month, a run of returned submissions, or an empty queue.

### Priority Queue

Five rows, sorted with the most urgent first. Each is a link:

- Submissions due within 7 days → **Submissions**
- Returned submissions needing correction → **Submissions**
- Submissions awaiting approval → **Submissions**
- Whether organisation setup is finished → **Settings**
- Team invitations still unaccepted → **Settings → Members**

When there is nothing to do, each row says so plainly.

### Activity Feed

The five most recent submissions, newest first, each reading as a sentence — *A team member submitted for review* — with how long ago it happened. The colour of the dot says which kind of event it was: a submission, an approval, or a figure returned for correction.

Use it to see that the workspace is moving. To see *which* figure moved and who moved it, open **Submissions** or **Review**, where every row names the indicator, the period and the person.

{{figure:dashboard-activity-feed}}

### Indicator Performance

A table of the first six programmes, with columns **Indicator + Program**, **Target**, **Actual**, **Indicators** and **Status**. The Indicators column draws one small bar per indicator, so an uneven programme is visible without reading numbers.

{{figure:dashboard-indicator-performance}}

### Quick Actions

Four links — review the submission queue, manage members and invitations, launch a new programme, audit role permissions — and a one-line summary of the queue.

### Monthly Throughput

Submission volume by month, for the last six months. It appears only once you have at least two months of data, because one bar compares with nothing.

### Programmes Portfolio and Indicator Reports

Two more cards, each shown only when there is something in it. The first lists programmes with their indicator counts and status. The second breaks indicator reports down into **Draft**, **Submitted**, **Approved** and **Rejected**.

<!-- /roles -->

---

<!-- roles: me_officer -->

## The M&E officer dashboard

Headed **Dashboard**, with the line *High-level performance signals across programs and teams.*

{{figure:dashboard-overview}}

The first row of four tiles is **Active Users**, **Projects**, **Indicators** and **Target Completion**.

The second row is the one to read every morning:

| Tile | What it counts |
|---|---|
| **Pending Review** | Submissions waiting on a decision |
| **Returned** | Submissions sent back and not yet corrected |
| **Due Soon (7 days)** | Draft or returned submissions whose deadline is within a week |
| **Quick Actions** | **Review submissions**, and **New program** if you can create one |

Below that, **Team Progress** shows the latest activity per programme as cards.

The **Timeline** card at the bottom is not built yet. Its four tabs say so.

<!-- /roles -->

---

<!-- roles: reporter -->

## The reporter dashboard

Headed **My Reporting Dashboard**, with the line *What needs your attention right now.*

Four tiles:

| Tile | What it counts |
|---|---|
| **Assigned Programs** | The projects you can report on |
| **Drafts To Submit** | Figures you have saved but not submitted |
| **Returned (Fix Needed)** | Figures sent back to you |
| **Due Soon (7 days)** | Drafts with a deadline inside a week |

Two buttons: **Go to submissions** and **View my programs**.

Below, **My Assigned Programs** lists up to six projects. Click one to open it.

If it says **No assigned programs yet**, ask an org admin to add you to a project's team.

<!-- /roles -->

---

<!-- roles: viewer -->

## The viewer dashboard

Headed **Portfolio Dashboard**, with the line *Read-only performance overview (dashboards and reports).*

Four tiles: **Projects**, **Indicators**, **Reports** and **Target Achievement**.

Three buttons: **Dashboards**, **Analysis** and **Statistics**.

<!-- /roles -->

---

## Traffic lights, and where they come from

The same three-state system is used everywhere in ImpactMEL — on the dashboard, in the indicator register, on a programme's page and in an assembled report.

| Label | Default band |
|---|---|
| **On Track** | 90% of target or above |
| **At Risk** | 70% up to 90% |
| **Off Track** | Below 70% |
| **No data** | Nothing reported |

Every status is shown as a coloured pill **with a written label**, so it never depends on telling two colours apart.

<!-- roles: org_admin -->

The two thresholds are yours to change. Go to **Settings → Organization**, find **When progress is on track**, and set **On track from (% of target)** and **At risk from (% of target)**. The at-risk figure must be above zero and below the on-track figure. Change them and every status in the product follows.

<!-- /roles -->

::: tip No data is not zero
A period with nothing reported shows as **No data**, never as zero. An unreported indicator and an indicator that achieved nothing are different problems.
:::

---

## Statistics

**Statistics** sits next to Overview in the left rail. It is the numbers behind the dashboard, without the prioritising.

{{figure:statistics}}

It opens with six figures — **Programs**, **Projects**, **Indicators**, **Target Achievement**, **Reports** and **Due Soon Drafts** — each with a line of context underneath.

**Reporting Pressure** then gives four operational signals, each with its own healthy band: **Approval Rate**, **Review Queue**, **Indicator Coverage** and **Draft Backlog**.

Four charts follow: **Portfolio Completion**, **Quarterly Target vs Actual**, **Projects by Status** and **Submission Activity**.

**Program Ranking** splits programmes into **Top Performing Programs** and **Needs Attention**. The split uses your organisation's own at-risk threshold.

Down the right: **Report Output Mix**, **Recent Reporting Outputs** and **Submission State Snapshot**.

---

## Notifications

Reach it with **⌘K**, then type *Notifications*.

The page lists recent activity in your organisation, grouped under **Today**, **Yesterday** and then by date. Each line names who did what to which record, and how long ago.

- Click an unread line to mark just that one read.
- **Mark all read** appears while anything is unread.
- A refresh button reloads the list.

::: warning Read state does not follow you
Which notifications you have read is stored in the browser you are using. Open ImpactMEL on a different computer and they will look unread again.
:::

---

## Custom dashboards

The org dashboard covers everything. When you need one view — for a board meeting, or one programme — build a dashboard of your own.

Reach it with **⌘K**, then type *Dashboards*.

1. Click **New Dashboard**, give it a name, click **Create Dashboard**.
2. Open it and click **Open Builder**.
3. Click **Add Widget**. The widget screen has six numbered steps: what to track, an optional project, which indicators, the breakdown, the metrics, and the visualisation. Name it and click **Save to Dashboard**.
4. Drag and resize widgets in the builder to arrange them.

Widgets can be a **bar**, **line** or **pie** chart, a **kpi** figure, or a **table**.

**Global Filters** in the builder panel set **Program**, **Project**, **Date From** and **Date To** for the whole dashboard at once. They cascade to every widget and save themselves — there is no Apply button.

A dashboard is **Draft** or **Published**, and the list shows how many widgets each holds.

<div class="video-track__grid">
  <VideoEmbed src="/videos/51-create-dashboard.mp4" title="51 · Create a custom dashboard" duration="27s" />
  <VideoEmbed src="/videos/53-dashboard-filters.mp4" title="53 · Filter a whole dashboard at once" duration="21s" />
</div>

<!-- TODO: the Share affordances on the dashboards list and in the builder do nothing — the dropdown item has no handler and the builder button is disabled. There is no public dashboard route. The system guide says dashboard sharing is live and revocable; the frontend disagrees. Resolve before this section mentions sharing at all. -->

---

## Refreshing

Dashboard figures are worked out when the page loads. Reload the page for the current numbers.

---

## Where to go next

- [Review and approve](/user-manual/review-and-approve) — clear what the dashboard is warning you about
- [Indicator register and tracking table](/user-manual/indicator-register) — the same figures, one row per indicator
- [Reports](/user-manual/reports) — turn the figures into a document
