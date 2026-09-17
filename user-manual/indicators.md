---
title: Indicators
chapter: 8
roles:
  - reporter
  - me_officer
  - org_admin
---

# Indicators

An **indicator** is a measure of progress towards a result. It belongs to a project. Its definition can be reused in other projects, and each project reports its own figures against it.

Examples:

- *Number of people with access to safe water* (unit: people)
- *Percentage of households with a functioning handwashing station* (unit: %)
- *Number of community health workers trained* (unit: people)
- *Dropout rate in supported schools* (unit: %)

<div class="doc-page-hero">
  <p class="doc-page-hero__eyebrow">Measurement layer</p>
  <p class="doc-page-hero__title">Settle how progress is measured before anyone reports a number.</p>
  <p class="doc-page-hero__copy">If a definition is vague here, every dashboard and report built on it is vague too. This is the page to get right.</p>
  <div class="doc-page-hero__meta">
    <div class="doc-page-hero__meta-item">
      <span>Best for</span>
      <strong>M&amp;E officers and org admins</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Best moment</span>
      <strong>After the results framework, before periods open</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Main outcome</span>
      <strong>Definitions an auditor, a funder and a field officer all agree on</strong>
    </div>
  </div>
</div>

---

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/20-create-indicator.mp4" title="20 · Create an indicator" duration="48s" />
  <VideoEmbed src="/videos/21-create-custom-unit.mp4" title="21 · Create a custom unit of measurement" duration="28s" />
  <VideoEmbed src="/videos/22-generate-reporting-periods.mp4" title="22 · Generate reporting periods automatically" duration="28s" />
  <VideoEmbed src="/videos/23-set-targets.mp4" title="23 · Set targets per period" duration="30s" />
  <VideoEmbed src="/videos/24-indicator-detail.mp4" title="24 · Read an indicator’s performance page" duration="25s" />
  <VideoEmbed src="/videos/25-aggregation-methods.mp4" title="25 · Choose the right aggregation method" duration="25s" />
</div>

## Where indicators live

There is no organisation-wide indicator library page. Indicators belong to projects. You reach them three ways:

| Route | What you get |
|---|---|
| **Reports → Indicator register** | Every indicator in the organisation, one row each, with target and actual |
| A project → **Indicators & Targets** tab | That project's indicators |
| A project → **Result Framework** | The indicators hanging off each result |

To read one, click its name anywhere it appears.

---

<!-- roles: me_officer, org_admin -->

## Creating an indicator

Open a project, then **New Indicator** from the left rail or the Indicators & Targets tab. The page is headed **New Indicator**.

### Search before you type

The first thing on the page is a panel headed **Already measuring this somewhere?**. Use it. Half the time the definition already exists somewhere in your workspace, and copying it is what keeps an organisation-wide total addable. See [Reusing an indicator](/user-manual/reusing-an-indicator).

Everything below the panel is the form.

### 1 · Definition

| Field | Required | What it is for |
|---|---|---|
| **Indicator Name** | Yes | The full name. Include the unit in the name for clarity |
| **Indicator Code** | | A short reference |
| **Definition / Description** | | What exactly is being counted |
| **Link to Result** | | Which result in the framework this measures. Only shown if the project has one |

{{figure:new-indicator-definition}}

### 2 · Measurement

| Field | Required | What it is for |
|---|---|---|
| **Unit of Measurement** | Yes | What the number counts. **New** creates one inline, with a **Name** and a **Symbol** |
| **Direction** | Yes | **Higher is better** or **Lower is better** |
| **Aggregation Method** | Yes | How period values combine into one figure |

The validation message on the unit field is worth repeating: *a value without units is meaningless*.

{{figure:new-indicator-measurement}}

### 3 · Baseline & Quality

| Field | What it is for |
|---|---|
| **Baseline Value** | The starting value |
| **Baseline Date** | When it was measured |
| **Baseline source** | Where it came from |
| **Target as written in the plan** | The target in the plan's own words |
| **Data Source** | Where the figure will come from |
| **Reporting Frequency** | Monthly, Quarterly, Twice a year, Termly, Annual or Custom |
| **Collection Method** | How it is gathered |
| **Means of Verification** | What an auditor would ask to see, for example signed inspection reports |
| **Requires data quality review** | Tick if it needs checking |
| **Active indicator** | Tick to keep it in use |

Click **Create Indicator**.

---

## Aggregation methods

When one figure has to stand for several periods, the aggregation method is the rule that produces it.

| Method | When to use it | Example |
|---|---|---|
| **Sum** | Counting people, events or items — each period adds to the total | *People trained:* Q1 = 200, Q2 = 300 → 500 |
| **Average** | Rates, percentages, scores — you want the mean | *Satisfaction:* Q1 = 78%, Q2 = 82% → 80% |
| **Latest** | Stock indicators — the current state is what matters | *Functioning water points:* Q1 = 45, Q2 = 48 → 48 |
| **Formula** | The figure is calculated from named inputs rather than typed in | *% of households with safe water* |

::: warning Changing it after figures exist
Changing the aggregation method changes how figures already reported appear in future reports. Tell your team before you save it.
:::

---

## Formula indicators

Choose **Formula** as the aggregation method and a formula builder appears. Use it for percentages, ratios and differences, so nobody in the field is doing arithmetic by hand.

The left panel holds **Formula Expression** and a **Formula preview**, with buttons to build it: **Add (+)**, **Subtract (-)**, **Multiply (x)**, **Divide (/)**, **Open bracket**, **Close bracket**, **Multiply by 100**, **⌫ Backspace** and **Clear formula**. A readback headed **This indicator calculates** states in words what you have built.

The right panel holds the inputs.

1. Under **Templates**, click **Percentage**, **Ratio** or **Difference** to start from a shape.
2. Add each input: an **Input name**, an **Input type** (Value, Numerator or Denominator) and an **Input unit**, which defaults to the indicator's own.
3. **Advanced input settings** on an input adds a **Description**, its **Disaggregations**, and whether the **Input is required during data entry**.
4. Click **Add input**, then **Insert into formula** to place it in the expression.

A formula indicator needs an expression and at least one input before it will save.

{{figure:new-indicator-formula}}

When someone reports against a formula indicator, they enter the inputs. ImpactMEL works out the result.

::: tip Disaggregation is set on formula inputs
Breaking a figure down by sex, age or district is configured on a formula indicator's **inputs**, under **Advanced input settings**. The dimensions themselves come from **Settings → Disaggregations**. There is no disaggregation picker on the indicator itself on this form.
:::

<!-- /roles -->

---

## Setting targets

Targets belong to periods, not to the definition. Set them per indicator, per period, so the same definition can carry different ambitions in different projects.

Open the project → **Reporting Periods**, expand the indicator, and set the target on each period. See [Projects](/user-manual/projects) for generating a year of periods in two clicks.

---

## Reading an indicator

Click any indicator name. The page opens with a link back to the results framework.

{{figure:indicator-detail}}

### The header

The code, the level, and which result it measures — *measures "Households reach a safe water source"*. Then the name and the definition.

Four figures: **Latest reported**, **End target**, **Progress** and **Periods reported**.

<!-- roles: me_officer, org_admin -->

**Use in another project** sits in the header. See [Reusing an indicator](/user-manual/reusing-an-indicator).

<!-- /roles -->

### How this indicator is measured

Six facts, described on the page as *the definition an auditor, a funder and a field officer all have to agree on*:

| Fact | Hint shown |
|---|---|
| **Unit of measure** | What the number counts |
| **Baseline** | |
| **Reporting frequency** | |
| **Data source** | Where the figure comes from |
| **Collection method** | How it is gathered |
| **Means of verification** | What an auditor would ask to see |

Anything left blank reads **Not recorded**.

### Performance by period

A table of **Period**, **Target**, **Actual**, **Progress** and **Status**, one row per period, with a small bar on the progress cell.

A period with no reported value shows as **No data**, not as zero. They mean different things.

### To confirm with your team

Where an indicator was set up from your own documents, a panel headed **To confirm with your team** lists the points that were read rather than stated outright. Check them, then click **These are right**.

---

## Where to go next

- [Reusing an indicator](/user-manual/reusing-an-indicator) — one definition, several projects
- [Entering data](/user-manual/data-entry) — reporting figures against these indicators
- [Indicator register and tracking table](/user-manual/indicator-register) — every indicator at once
