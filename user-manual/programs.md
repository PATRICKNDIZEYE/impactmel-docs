---
title: Programmes
chapter: 4
roles:
  - reporter
  - me_officer
  - org_admin
---

# Programmes

A **programme** is a funded initiative, usually tied to a donor agreement or a multi-year plan. It groups the projects that deliver it.

Examples:

- *WASH for All — USAID 2025–2027*
- *Girls' Education Initiative — GIZ and FCDO 2024–2026*
- *Community Resilience Programme — World Bank 2023–2028*

Open it from the top bar: **Programmes**.

<div class="doc-page-hero">
  <p class="doc-page-hero__eyebrow">Structure and donors</p>
  <p class="doc-page-hero__title">Group related projects, donors and results under one frame.</p>
  <p class="doc-page-hero__copy">A clean programme layer makes everything after it easier — project organisation, donor visibility, reporting structure. If your portfolio feels disorganised, start here.</p>
  <div class="doc-page-hero__meta">
    <div class="doc-page-hero__meta-item">
      <span>Best for</span>
      <strong>Org admins and M&amp;E officers</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Best moment</span>
      <strong>Before adding projects, teams or reporting structure</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Main outcome</span>
      <strong>A portfolio both donors and staff can follow</strong>
    </div>
  </div>
</div>

---

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/05-create-program.mp4" title="05 · Create a program" duration="59s" />
</div>

## The portfolio

The page is headed **Programmes & Projects**, with the line *Portfolio hierarchy — programs define scope, projects deliver results.*

It shows both levels at once. Each programme is a row. Click the chevron to expand it and see its projects underneath.

{{figure:programmes-list}}

At the bottom, a dashed block headed **Projects without a program** collects any project that is not in one.

### On a programme's row

| What | What it does |
|---|---|
| The programme **name** | Opens [the programme's own page](/user-manual/programme-page) |
| Anywhere else on the row | Expands or collapses the projects |
| **N projects** | How many it holds |
| Copy icon | **Start a programme from this one** |
| Pencil icon | Edit the programme |
| **Add Project** | New project, with this programme already chosen |

**Search programs by name, donor, sector…** at the top filters the list. It is the only filter on this page — there are no status or sector dropdowns.

### The two buttons at the top

- **New Project** — creates a project.
- **New Program** — creates a programme.

::: warning The address bar says "projects" either way
The new programme form lives at `/projects/new` and the new project form at `/projects/new-project`. The page titles are right; the addresses are historical. Go by the button labels.
:::

---

<!-- roles: me_officer, org_admin -->

## Creating a programme

Click **New Program**. The page is headed **Create a Program**.

It is one scrolling form in four parts. Only **Program Name** is required.

### Basic Information

| Field | Required | What it is for |
|---|---|---|
| **Program Name** | Yes | The full name |
| **Program Code** | | A short reference |
| **Description** | | What the programme is |

### Scope & Context

| Field | What it is for |
|---|---|
| **Donor / Funder** | Choose from your registry, or type a new name and pick **Create "…" as new donor** |
| **Sector** | The sector it works in |
| **Country** | Searchable |
| **Mechanism** | The funding mechanism |
| **Currency Code** | Three letters. Falls back to your organisation's default |

### Timeline

**Start Date** and **End Date**. The end date must be after the start date.

### Management

**Status** — one of **Active**, **Pipeline / Pre-award**, **Closed** or **Suspended** — and **Program Manager**.

Click **Create Program**.

{{figure:new-programme-form}}

::: tip Set your donors up first
Go to **Settings → Donors & Funders** before you start creating programmes. Adding them there keeps names and details consistent. You can still create one inline from this form when you need to.
:::

---

## Starting a programme from an existing one

Where next year's programme looks much like this year's, copy it.

1. Click the copy icon on the programme's row — its tooltip reads **Start a programme from this one**.
2. The dialog is headed the same. Give the new programme a **Name**, and set when it **Starts** and **Ends**.
3. Decide what comes across:
   - **Bring the N projects across**
   - **Bring the programme's own risks and evaluations across**
4. Click **Create programme**.

{{figure:duplicate-programme}}

---

## Editing a programme

Click the pencil on its row, or **Edit** on the programme's own page. Change what you need and save.

<!-- /roles -->

---

## What a programme does not hold

Two things people look for on a programme and do not find there:

**The results framework is per project**, not per programme. Open a project and use **Result Framework**. See [Results framework](/user-manual/results-framework).

**Indicators belong to projects.** A programme's page rolls its projects' indicators up for reading, but you add an indicator inside a project. See [Indicators](/user-manual/indicators).

---

## Where to go next

- [A programme's page](/user-manual/programme-page) — how the programme is actually doing
- [Projects](/user-manual/projects) — creating and running a project
- [Settings and administration](/user-manual/settings) — the donor registry
