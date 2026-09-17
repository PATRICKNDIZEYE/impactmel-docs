---
title: Results framework
chapter: 7
roles:
  - me_officer
  - org_admin
---

# Results framework

Your results framework is the logic of a project on one screen: the impact you are working towards, the outcomes that drive it, the outputs your activities deliver, and the indicators that prove each link.

Open it from a project's left rail: **Result Framework**.

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/10-choose-framework-type.mp4" title="10 · Choose your framework structure" duration="30s" />
  <VideoEmbed src="/videos/11-build-results-chain.mp4" title="11 · Build your results chain from impact down" duration="65s" />
  <VideoEmbed src="/videos/12-drag-reorder-results.mp4" title="12 · Reorder results with drag and drop" duration="15s" />
  <VideoEmbed src="/videos/13-move-result-between-parents.mp4" title="13 · Move a result to a different parent" duration="21s" />
  <VideoEmbed src="/videos/14-link-indicators-to-results.mp4" title="14 · Link indicators to your results" duration="28s" />
  <VideoEmbed src="/videos/15-switch-framework-type.mp4" title="15 · Switch framework type without losing data" duration="23s" />
</div>

## Choose your structure

The first time you open the builder on a project, a page headed **Choose your framework structure** asks which structure your donor or theory of change follows. All three hold the same chain. What changes is the vocabulary and the nesting rules.

| Structure | Levels | Best when |
|---|---|---|
| **Results Framework** | Impact → Outcomes → Outputs | Your donor reports against a classic results framework |
| **Logical Framework** | Goal → Purpose → Outputs | You work with EU, FCDO or GIZ-style logframes |
| **Theory of Change** | Impact → Outcome chains → Outputs | Your logic has intermediate outcomes — outcomes can nest under outcomes |

{{figure:framework-chooser}}

::: tip You can switch later
The pill under the heading opens **Switch framework structure**. Each option is described as *relabels levels, keeps your data*. A Results Framework's *Impact* becomes a Logframe's *Goal*, the nesting rules adjust, and nothing is migrated or deleted.
:::

---

## Build the chain from the top

1. Click **Add Impact** — or **Add Goal**, depending on your structure. On an empty project the panel says **Start from the top of the chain**.
2. Hover the card and click the add icon to create each **Outcome** beneath it.
3. Hover an outcome and add the **Outputs** your activities deliver.

{{figure:framework-tree}}

Each result holds more than a title. The dialog has:

| Field | What it is for |
|---|---|
| **Title** | Required |
| **Code** | IMP-1, OC-1, OP-1.1 |
| **Result statement** | The full statement as written in the plan |
| **Assumptions** | What has to be true for the link to the level above to hold |
| **Risks** | What could break it |
| **Target group** | Only shown if the project has target groups |
| **Notes** | Anything else |

Click **Save**.

---

## Keep it organised

- **Drag the handle** on a card to reorder results within their level. Its tooltip reads *Drag to reorder within this level*. It only moves siblings.
- **Move under a different parent** re-parents a result. Only valid destinations are offered, so an output can never end up under an impact, and a branch can never be dropped inside itself.
- **Edit** and **Delete** are the other two hover icons.

Deleting warns you: *Everything nested under it is deleted too; linked indicators are kept and become unlinked.*

---

## Link every indicator

A result with no indicator is a claim with no evidence.

- **Link indicator** on a card opens a list of the project's unlinked indicators. If there are none, it offers **Create a new indicator** instead.
- Each linked indicator appears as a chip on the card. The **×** unlinks it — the indicator itself is untouched.
- An output card also carries a chip counting **N activities**, meaning the activities that deliver it.
- A card with nothing measuring it says so: *No indicators measure this yet*.

Above the tree, four figures: one per level, plus **Linked indicators** as *linked of total*. A banner warns while any indicator is unlinked.

Aim for every figure in your reports tracing back to a result in this chain.

---

## Two routes to the tree

There are two screens that show a project's results, and they are not the same.

| Where | What you get |
|---|---|
| Project's rail → **Result Framework** | The full builder: the structure chooser, drag to reorder, move under a different parent, assumptions and risks |
| Project page → **Results Framework** tab | A simpler list of the same results |

Use the rail for building. Use the tab for a quick look.

---

## Where it flows next

- Indicators created from the framework carry their result with them into [targets and periods](/user-manual/indicators)
- [Entering data](/user-manual/data-entry) reports against those indicators
- [Performance Review](/user-manual/review-and-approve) judges each result in this tree, with a rating and a written justification
- An assembled [report](/user-manual/reports) renders this tree with performance attached
