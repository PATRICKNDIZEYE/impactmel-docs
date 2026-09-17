---
title: Reusing an indicator
chapter: 9
roles:
  - me_officer
  - org_admin
---

# Reusing an indicator

The same thing gets measured in more than one project. *Number of people reached with safe water* belongs in three projects, not one.

If each project writes its own version, you end up with three definitions, three units and three aggregation rules — and then the organisation-wide total cannot be added up. ImpactMEL gives you two ways to avoid that.

| You are | Use |
|---|---|
| Creating an indicator in a project, and it may already exist | The picker at the top of **New Indicator** |
| Looking at an indicator, and want another project to measure it too | **Use in another project** on the indicator page |

Both do the same thing underneath. They copy the definition and leave the numbers behind.

---

## What is copied and what is not

**Copied:** how the indicator is defined, how it is counted, and how it is broken down.

**Not copied:** targets and reported figures.

The new project sets its own targets and reports its own figures. This is deliberate. One indicator whose data was pooled across projects would make an organisation-wide total include the same result twice.

---

## Starting from an indicator that already exists

Open a project, then **New Indicator**. The first thing on the page is a panel headed **Already measuring this somewhere?**

{{figure:indicator-picker}}

1. Click in **Search your indicators by name or code…** and type.
2. Matching indicators appear beneath. Each one shows its code and name, the project it comes from, its programme, and its unit. A badge reading **used 3×** means the same definition is already in three projects.
3. Click the one you want.

Indicators already in the project you are working in are not offered. There is no point copying one into itself.

A card then appears with the level, the frequency, the project it came from, the unit and the baseline. From there you have two choices.

### Use this definition

Click **Use this definition**.

The definition is copied into this project and you are taken straight to it. A message confirms it is in the project, with its own targets to set. Nothing else on the New Indicator form matters — you are finished.

Use this when the existing definition is right as it stands.

### Fill in the form instead

Click **Fill in the form instead**.

The wording is brought down into the New Indicator form for you to edit. Nothing is saved yet. Change what needs changing and save as normal.

Use this when the existing definition is nearly right rather than right.

::: tip Search before you type
If nothing matches, the list says so and invites you to carry on and define it below. Searching first costs a few seconds and saves an argument about which of two figures is the real one.
:::

---

## Sending an indicator to another project

Open the indicator — from the results framework, the indicator register, or a project's indicator list. In the header, click **Use in another project**.

{{figure:indicator-use-elsewhere}}

The dialog is headed **Measure this in another project**.

1. **Project** — choose the project that should also measure this. Required. Projects that already hold it are not offered. If the organisation has no other project, the dialog says so.
2. **Result it measures there** — choose the result in that project's framework that this indicator measures. Optional; **Decide later** is the default. This list only appears if the other project has a results framework built.
3. **Name there** — pre-filled with the current name. Keep it identical unless that project words the same measure differently.
4. Click **Add to project**.

A message confirms which project it was added to, and you are taken to the new copy so you can set its targets.

The button only appears if you can edit indicators.

---

## Seeing where an indicator is used

Once a definition is in more than one project, it is flagged wherever it is listed:

- In the **indicator register**, the indicator's row carries a chip reading **also in 2 others**. Hover it to see which projects.
- On a **programme's page**, the indicator line carries the same note.
- In the **picker**, a badge counts the total uses.
- The register's Excel export has an **Also used in** column, listing the other projects by name.

---

## Where to go next

- [Indicators](/user-manual/indicators) — defining one from scratch
- [Results framework](/user-manual/results-framework) — hanging indicators off results
- [Indicator register](/user-manual/indicator-register) — where the copies show up side by side
