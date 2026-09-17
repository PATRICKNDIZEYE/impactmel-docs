---
title: Period sign-off
chapter: 12
roles:
  - reporter
  - me_officer
  - org_admin
---

# Period sign-off

Closing a reporting period is your organisation saying "these are our figures for this quarter".

**Period sign-off** shows you what is still outstanding in each period before anybody says it. Nothing on the page blocks a close — there are good reasons to close a period with gaps. It should just not be a surprise.

Open it from the top bar: **More → Period sign-off**.

{{figure:period-signoff-outstanding}}

---

## The three states

Each period sits in one of three states.

| State | What it means |
|---|---|
| **Open** | Your team can still report figures into this period |
| **Closed** | No new figures can be entered. You can reopen it if something was missed |
| **Locked** | Final. These are the figures you have reported externally |

The state is shown as a badge next to the period name, with a line of plain text underneath saying the same thing.

---

## What is outstanding

Every period card carries five counts across its middle:

| Count | What it counts |
|---|---|
| **Due** | Indicators expected to report in this period |
| **Reported** | Indicators with a figure entered |
| **Awaiting a decision** | Figures submitted and waiting in the review queue |
| **Sent back** | Figures returned to the person who entered them |
| **Nothing reported** | Indicators nobody has entered a figure for |

**Awaiting a decision** and **Sent back** are links when the count is above zero. Click either one to go straight to [Review](/user-manual/review-and-approve).

Below the counts, a bar shows how much of the period has been reported — *Reported, 14 of 21 (67%)*.

Below that is a written list of what is still outstanding, one line each. If there is nothing, the card says **Nothing outstanding in this period**.

Where a period has results that still need judging, a line underneath says how many have been judged, with a link to see the figures for that period in the indicator register.

---

<!-- roles: me_officer, org_admin -->

## Closing a period

1. Find the period. It must be **Open**.
2. Click **Close the period**.
3. A dialog appears. If anything is still outstanding it is listed here, under **Still outstanding**.
4. Click **Close the period** to confirm.

{{figure:period-signoff-close-confirm}}

Nobody can enter or change a figure for that period afterwards. A closed period refuses new figures — a reporter who tries sees that the period is closed.

You can close a period with gaps. An indicator nobody collected this quarter is a real answer, and the dialog says so.

---

## Locking a period as final

Locking is the strongest statement the system makes about a set of numbers. Use it once the figures have gone to a funder or a board.

1. Find the period. It must already be **Closed**.
2. Click **Lock as final**.
3. Confirm.

A locked period's name and dates cannot be changed. Nor can a period that holds figures be deleted.

---

## Reopening a period

You can reopen a period from either **Closed** or **Locked**.

1. Click **Reopen**.
2. Type why in **Why is it being reopened?** This is required.
3. Click **Reopen it**.

{{figure:period-signoff-reopen}}

The reason is kept with the period, so the change can be explained later. It shows on the period card, with the date, for anyone who looks afterwards.

Your team can then change figures in a period that has already been signed off. That is the point, and also the risk.

<!-- /roles -->

---

<!-- roles: reporter -->

## What a reporter sees here

You can open Period sign-off and read every count and every outstanding line. It is the quickest way to see which periods are still open to report into, and what is missing from the one you are working on.

Closing, locking and reopening are M&E officer and org admin actions. Those buttons will not work for you.

<!-- /roles -->

---

## Who signed what

Once a period has been closed, locked or reopened, the bottom of its card records it:

- Closed by a named person, with the date.
- Locked by a named person, with the date.
- Reopened on a date, followed by the reason that was given.

---

## The reporting calendar itself

This page signs periods off. It does not create them.

**Manage the calendar** in the top right of the page goes to **Settings → Reporting Periods**, which is where periods are added and their dates and due dates set. If no periods exist at all, the page offers **Set up the calendar** instead.

---

## What sends itself

The daily job at 07:00 includes overdue periods and approval deadlines in its reminders for each organisation. It is deduplicated, so a re-run within the same day sends nothing new.

---

## Where to go next

- [Review and approve](/user-manual/review-and-approve) — clear the queue before you close
- [Settings and administration](/user-manual/settings) — where the reporting calendar is set up
- [Reports](/user-manual/reports) — assemble a report from a closed period
