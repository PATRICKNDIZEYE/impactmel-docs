# Indicators, baselines and targets

<p class="lead">An indicator is defined once, with its unit, method and source. It has a baseline, a target for each reporting period, and figures that are approved through review. Progress and status are worked out from those, the same way on every screen and in every report.</p>

**Who can do this:** M&E officers and Organisation admins create and edit indicators. Everyone with indicator permission can read them.

## The Indicators page

Open **Indicators** in the sidebar.

![The Indicators page, grouped by programme, with progress and status.](/images/indicators-list.webp)

- Filter by programme or project and by status: **On track**, **At risk**, **Off track** or **No data**.
- **Group by** programme or result.
- Count against **To date** (targets already due) or **Per period** (one period's targets).
- **Import figures** brings in figures from Excel. See [Integrations](/manual/integrations#excel-and-csv).

## Create an indicator

Choose **New indicator**.

![The New indicator panel.](/images/indicator-new.webp)

| Field | What to enter |
|---|---|
| Project, Name, Code | Where the indicator belongs and what it is called |
| Measures result | The result in the framework it measures |
| Level, Definition | Its level and exactly what counts and what does not |
| Data type | Number, Percentage, Currency, Text, or Yes or no |
| Unit | For example households, people, or US Dollar |
| Aggregation | How figures add up across periods and places: Sum, Average, Latest, Highest or Lowest |
| Good progress | Higher is better, Lower is better, or Within a range |
| Reported | Monthly, Quarterly, Twice a year, Each school term or Yearly |
| Numerator and denominator | For percentages |
| Baseline | The starting value and the date it was measured |
| Data source, Collection method, Means of verification, Responsible person | How the figure is produced and checked |
| Requires review | Figures count only once approved |
| Breakdowns | Disaggregation, such as sex or age group |

## Set targets

Open the indicator and choose **Edit targets** under **Targets by reporting period**. Enter a target for each period, with totals and targets per breakdown group if needed. Setting a target opens that period for collection on the indicator. You can **Stop taking figures** and **Start taking figures** again.

Targets are stored per reporting period, so a target can be for a quarter, a year or the whole grant. Reports print each target's period.

## The indicator page

![An indicator page: actual, target, progress and baseline, with the chart and definition.](/images/indicator-detail.webp)

The indicator page shows the latest actual, target, progress and baseline, a chart of actual against target, targets by reporting period, reported figures, disaggregation, the change history, and risks that watch this indicator.

## Read progress

### The progress formula

Where an indicator has a baseline, progress is the share of the planned change achieved:

> **Progress = (actual − baseline) ÷ (target − baseline)**

Without a baseline, progress is **actual ÷ target**. For indicators where lower is better, ImpactMEL turns the comparison round.

For example, an indicator with a baseline of 41%, a target of 60.5% and an actual of 70.8% has progress of (70.8 − 41) ÷ (60.5 − 41) = 153%.

### Status thresholds

| Status | Progress |
|---|---|
| On track | 90% or more |
| At risk | 70% to under 90% |
| Off track | under 70% |

These are the defaults. Each organisation can have its own thresholds; there is no screen for this yet, so ask ImpactMEL support to change them for your workspace. Reports print the thresholds in use.

### Which figures count

- Only approved figures count. Drafts and figures waiting for review do not.
- Only targets that have fallen due count in to-date views.
- Figures are totalled the way the indicator is defined: sum, average, latest, highest or lowest.
- An indicator without a target shows **No target**, and is not counted as off track.

The same rule applies on home pages, the Indicators page, programme pages, dashboards and reports.

## Reuse indicators

To reuse a whole set of indicators, copy a programme or project with **Start a programme from this one**. The framework and indicators are copied, without figures or targets. See [Programmes and projects](/manual/programmes-and-projects#copy-a-programme-or-project).

## Delete an indicator

From the **…** menu on the indicator page, choose **Delete** and type DELETE to confirm.
