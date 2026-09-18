---
title: Risks
chapter: 18
roles:
  - viewer
  - reporter
  - me_officer
  - org_admin
---

# Risks

A risk register is the part of M&E that is about what has not happened yet. ImpactMEL keeps one register per project, and puts every project's register on one page so nothing is only known to the team that wrote it down.

Open it from the top bar: **Analysis → Risks**. A single project's register is on the project, under **Risks**.

{{figure:risks-org}}

---

## How a risk is scored

Every risk carries two ratings on a scale of one to five.

| Likelihood | 1 Rare · 2 Unlikely · 3 Possible · 4 Likely · 5 Almost certain |
|---|---|
| **Impact** | 1 Negligible · 2 Minor · 3 Moderate · 4 Major · 5 Severe |

The two multiply into a **score** out of 25, and the score falls into a band:

| Score | Band |
|---|---|
| 16 – 25 | **Critical** |
| 10 – 15 | **High** |
| 5 – 9 | **Medium** |
| 1 – 4 | **Low** |

The band is worked out when you look at it. Change either rating and the band changes with it — there is nothing to recalculate and nothing to save separately.

---

## The heat map

Both the organisation page and a project's register open with a five-by-five grid: likelihood up the side, impact along the bottom, and a count in each cell.

It starts with **Select a cell to see its risks.** Click a cell and the list below narrows to the risks at that rating. Click it again to clear.

Four counts sit beside it: **Active**, **Critical**, **High** and **Review overdue**.

---

## What each risk holds

In a project's own register, a risk shows its score and band, then:

- Its **code** — a short reference like `CAJ-R1`, yours to choose
- Its **title** — one line saying what could happen
- Its **category**, from: Social and environmental · Financial · Operational · Organisational · Political · Strategic · Safety and security · Other
- **Threatens**, naming the result in the [results framework](/user-manual/results-framework) the risk is aimed at, when one was chosen
- Its **owner** — a person or a role
- **Next review**, and its **status**

### The four statuses

| Status | What it means |
|---|---|
| **Open** | Live, and being managed |
| **Monitoring** | Live, but watched rather than acted on |
| **Materialised** | It happened |
| **Closed** | No longer a risk to this project |

**Materialised** is worth using honestly. A register where nothing ever materialises is a register nobody is reading.

---

<!-- roles: me_officer, org_admin -->

## Adding a risk

Risks are added on a project, not on the organisation page.

1. Open the project, then **Risks** in the left rail. The page is headed **Risk register**, with the line *What could stop the project reaching its results, how serious each risk is, and what the team is doing about it.*
2. Click **Add risk**. The dialog is headed **Add a risk**, with the line *Describe what could go wrong, how likely it is, and what the team will do about it.*
3. Fill in the form.
4. Click **Add risk** to save it.

{{figure:risk-form}}

| Field | What goes in it |
|---|---|
| **Code** | Your own reference, such as `R-01`. Optional |
| **Risk** | Required. One line: what could happen |
| **What could happen, and why** | The fuller explanation |
| **Category** | One of the eight above |
| **Result it threatens** | A result from this project's framework, or *The project as a whole* |
| **Likelihood** / **Impact** | One to five each. The score and its band appear underneath as you choose |
| **Mitigation** | What the team does now to make it less likely or less damaging |
| **If it happens** | The fallback plan |
| **Owner** | A name or a role |
| **Identified on** | When it was first written down |
| **Next review** | When somebody should look at it again |

::: tip Write the mitigation before the score
A risk with a high score and an empty mitigation is a sentence, not a plan. The register earns its place at the two text boxes, not at the numbers.
:::

---

## Reviewing a risk

A risk is reviewed, not edited, when the world has changed. A review keeps the history; an edit replaces it.

1. Click the risk to open it. Three buttons sit at the bottom of the panel: **Record review**, **Edit** and **Delete**.
2. Click **Record review**. The dialog is headed **Review:** and the risk's title, with the line *Re-rate the risk as it stands today. The previous rating stays in the history.*
3. Set the **Status**, and change the two ratings if they have moved.
4. Write **What the review found**. If nothing changed, say why the rating still holds and whether the mitigation is working.
5. Set **Reviewed on**, the **Period** it belongs to if any, and the **Next review** date.
6. Click **Save**.

Each review is kept. The open risk shows them under **Review history** as a dated list, newest first, with who recorded each one and the period it belonged to — so a risk carries the story of how its rating moved rather than only where it ended up. A risk nobody has reviewed says *Not reviewed since it was recorded.*

### Reviews that are overdue

A risk whose **Next review** date has passed is counted in **Review overdue** and listed by name under **Reviews overdue** at the top of the organisation page, with the project it belongs to and **Open register** beside it.

<!-- /roles -->

---

## The organisation page

**Analysis → Risks** is headed *Risks across the organisation*, with the line *Active risks from every project register. Open a project to review or change its risks.*

Risks are grouped under the project they belong to, and each group header carries **Open register** — because this page is deliberately read-only. Every risk in it belongs to a project, and that is where it is changed.

The rows here are shorter than the ones in a project's own register: score, title, category, owner and status. Open the register for the result it threatens, its mitigation and its review history.

Underneath the heat map, a project's register also breaks its risks down **By category**, and filters them by **Active**, **Closed** or **All**.

---

<!-- roles: viewer, reporter -->

## What you can do here

You can open both the organisation page and any project register you have been given, read every risk, and use the heat map and the filters.

Adding, editing and reviewing risks are M&E officer and org admin actions.

<!-- /roles -->

---

## Risks in a report

Risks can be pulled into an assembled report as a section of their own. What goes in is the open risks, without their review history — see [Reports](/user-manual/reports).

---

## Where to go next

- [Results framework](/user-manual/results-framework) — the results a risk can be pointed at
- [Reports](/user-manual/reports) — putting the register in front of a funder
- [Analysis](/user-manual/analysis) — the other three pages under Analysis
