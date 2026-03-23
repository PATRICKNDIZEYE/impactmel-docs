# Indicators

<VideoEmbed title="11 · Creating an indicator" />

<VideoEmbed title="12 · Setting targets by reporting period" />

<VideoEmbed title="13 · Adding disaggregations (sex, age group, etc.)" />

<VideoEmbed title="14 · Creating a formula indicator" />

<VideoEmbed title="15 · Setting up indicator schedules" />

An **indicator** is a measure of progress toward a specific result. In ImpactMEL, indicators are created once and then linked to one or more projects. Each project sets its own targets and reports values for each period.

**Examples of indicators:**
- *Number of people with access to clean water* (unit: people)
- *% of households with functioning handwashing stations* (unit: %)
- *Number of community health workers trained* (unit: persons)
- *Dropout rate in supported schools* (unit: %)

<div class="doc-page-hero">
  <p class="doc-page-hero__eyebrow">Measurement layer</p>
  <p class="doc-page-hero__title">Standardize how progress is measured before teams start reporting numbers.</p>
  <p class="doc-page-hero__copy">Indicators are one of the most important setup areas in ImpactMEL. If names, targets, and reporting rules are unclear here, dashboards and reports become harder to trust later. Use this page to make measurement consistent from the start.</p>
  <div class="doc-page-hero__meta">
    <div class="doc-page-hero__meta-item">
      <span>Best for</span>
      <strong>M&amp;E officers, data managers, and program leads</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Best moment</span>
      <strong>Before reporting periods open and before forms are linked</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Main outcome</span>
      <strong>Indicators with strong definitions, targets, and calculations</strong>
    </div>
  </div>
</div>

<div class="doc-quick-links">
  <a class="doc-quick-link" href="#the-indicator-library">
    <span>Find and review</span>
    <strong>See how the shared indicator library is organized</strong>
  </a>
  <a class="doc-quick-link" href="#creating-an-indicator">
    <span>Create</span>
    <strong>Define a new indicator with the right unit and method</strong>
  </a>
  <a class="doc-quick-link" href="#setting-targets">
    <span>Operationalize</span>
    <strong>Set project targets before reporting begins</strong>
  </a>
  <a class="doc-quick-link" href="#formula-indicators">
    <span>Automate</span>
    <strong>Let ImpactMEL calculate percentages and ratios for you</strong>
  </a>
</div>

---

## The Indicator Library

Navigate to **Indicators** in the sidebar to view your organization's complete indicator library.

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/06-01-indicator-library.png" alt="Figure 6.1 — Indicator Library Page" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 6.1 — Indicator Library Page</p>
    <p>The Indicators list page showing a searchable table. Columns include Code, Indicator Name, Unit, Aggregation Method (shown as a badge), Linked Result Node, and the number of projects using this indicator. A search bar and filters for Aggregation Method and Result Level are at the top. A "New Indicator" button is in the top-right corner. Indicators are grouped by their result framework level (Impact / Outcome / Output).</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

---

## Creating an Indicator

1. Click **+ New Indicator** in the top-right corner
2. Fill in the indicator details:

| Field | Required | Description |
|---|---|---|
| **Indicator Name** | ✅ | Full name in sentence case — be specific and measurable |
| **Indicator Code** | ✅ | Short reference code (e.g., *WASH-01*, *EDU-03*) |
| **Unit of Measurement** | ✅ | What the value represents: *people*, *%*, *HHs*, *USD*, *sessions*, etc. |
| **Aggregation Method** | ✅ | How to combine values across periods (see below) |
| **Description** | | Full definition and how to measure it |
| **Data Source** | | Where the data comes from (survey, register, report, etc.) |
| **Result Node** | | Link to a specific Output or Outcome in your results framework |

3. Click **Create Indicator**

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/06-02-new-indicator-form.png" alt="Figure 6.2 — New Indicator Form" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 6.2 — New Indicator Form</p>
    <p>The "Create Indicator" form slide-over panel showing all fields. The Aggregation Method field shows a segmented control with the five options (Sum, Average, Latest, Min, Max) and a tooltip icon that explains each option. The Result Node field is an auto-complete dropdown showing the results framework tree.</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

---

## Aggregation Methods — Explained

When a report covers multiple reporting periods, ImpactMEL needs one combined value. The **Aggregation Method** is the rule used to combine those values.

| Method | When to use it | Example |
|---|---|---|
| **Sum** | Counting people, events, or activities — where each period adds to the total | *# of people trained:* Q1=200, Q2=300 → Report total = 500 |
| **Average** | Rates, percentages, satisfaction scores — where you want the mean over the period | *% satisfaction:* Q1=78%, Q2=82% → Report value = 80% |
| **Latest** | Stock indicators — where the current state is what matters, not the history | *# of functioning water points:* Q1=45, Q2=48 → Report value = 48 |
| **Min** | Worst-case tracking — report the lowest value across periods | *Minimum coverage rate:* Q1=65%, Q2=72% → Report value = 65% |
| **Max** | Peak achievement — report the highest value reached | *Maximum beneficiaries in a session:* Q1=120, Q2=95 → Report value = 120 |

::: tip
The most commonly used methods are **Sum** (for counts) and **Latest** (for stock indicators). Use **Average** for percentages and rates.
:::

---

## Setting Targets

Targets are set when you **link an indicator to a project**, not on the indicator definition itself. This allows the same indicator to have different targets across different projects.

To set or update targets:

1. Open the **Project** → **Indicators** tab
2. Click the **target** value for any indicator (or click the pencil icon)
3. Enter the project-level target
4. Optionally set **per-period targets** if each period has a different expected value
5. Click **Save**

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/06-03-setting-targets.png" alt="Figure 6.3 — Setting Indicator Targets" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 6.3 — Setting Indicator Targets</p>
    <p>The target editing dialog showing an overall project target field and a "Per-period targets" toggle. When the toggle is enabled, a table appears listing each reporting period with an individual target field. A baseline field appears below the overall target.</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

---

## Disaggregations

Many indicators need to be broken down by categories — such as sex, age group, or geographic area. These breakdowns are called **disaggregations**.

**Example:** The indicator *# of community health workers trained* may be disaggregated by sex (Female / Male) and by district (Gasabo / Kicukiro / Nyarugenge).

### Adding a disaggregation

1. Open the indicator → click **Disaggregations** tab (or edit the indicator)
2. Click **+ Add Disaggregation**
3. Enter the **dimension name** (e.g., *Sex*)
4. Add the **categories** (e.g., *Female*, *Male*, *Non-binary*) — press Enter after each
5. Click **Save**

When reporters submit values for this indicator, they can enter a value for each category. ImpactMEL automatically adds them together as the total value.

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/06-04-disaggregations.png" alt="Figure 6.4 — Disaggregation Setup" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 6.4 — Disaggregation Setup</p>
    <p>The disaggregation editor showing two existing disaggregation dimensions: "Sex" with categories Female/Male/Non-binary, and "Age Group" with categories Under 18 / 18-35 / 36-60 / Over 60. An "Add Disaggregation" button appears below. Each category has a small trash icon to delete it.</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

---

## Formula Indicators

A **formula indicator** calculates its value from other indicators, instead of asking someone to type it manually. This is useful for percentages, ratios, and similar measures.

**Example:** Instead of asking reporters to calculate the percentage, define:

- `WASH-01` — *# of HHs with access to clean water* (reported manually)
- `WASH-02` — *Total # of HHs in project area* (reported manually)
- `WASH-PCT-01` — *% of HHs with clean water access* = `WASH-01 / WASH-02 * 100` (computed automatically)

### Creating a formula indicator

1. Create a new indicator
2. Toggle **Formula Indicator** to ON
3. In the **Formula** field, enter the expression using other indicators' **codes** as variables
4. Click **Save**

When the report is created, ImpactMEL uses the saved values for each referenced indicator and applies the formula automatically.

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/06-05-formula-indicator.png" alt="Figure 6.5 — Formula Indicator Setup" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 6.5 — Formula Indicator Setup</p>
    <p>The indicator form with the "Formula Indicator" toggle enabled. A new "Formula" text field appears below, containing the expression "WASH-01 / WASH-02 * 100". A green tooltip appears confirming that the formula is valid and listing the two referenced indicators. The Unit field is set to "%".</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

---

## Viewing an Indicator's History

Click any indicator in the library to open its detail view, which shows:

- A chart of reported values over time (across all projects and periods)
- A table of all submitted indicator reports — who submitted, when, what value, what status
- The current progress score vs. target
- Links to the projects using this indicator

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/06-06-indicator-detail.png" alt="Figure 6.6 — Indicator Detail View" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 6.6 — Indicator Detail View</p>
    <p>The indicator detail page showing a line chart at the top with value on the Y-axis and reporting periods on the X-axis. Below the chart, a table shows all submitted reports with columns for Project, Period, Submitted Value, Target, Progress, Status (Approved/Pending/Rejected), and Submitted By. A "View in Project" link appears on each row.</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

---

## Editing and Deleting Indicators

**Edit:** Open the indicator → click **Edit Indicator** (top-right) → change the fields → **Save Changes**.

**Delete:** Open the indicator → three-dot menu → **Delete**. An indicator cannot be deleted if it has submitted data. You must archive the indicator instead, which hides it from the library without deleting historical values.

::: warning
Changing an indicator's **aggregation method** after data has already been submitted will change how earlier values appear in future reports. Review the change carefully and let your team know before you save it.
:::
