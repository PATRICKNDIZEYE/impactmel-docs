# Entering Data

This guide is primarily for **Reporters** — the team members responsible for submitting indicator values for their assigned projects at the end of each reporting period.

It also covers the **review and approval process** that M&E Officers follow after data is submitted.

---

## Who Enters Data?

| Role | Responsibility |
|---|---|
| **Reporter** | Submits indicator values for assigned projects and periods |
| **M&E Officer** | Reviews submissions, requests corrections, and approves or rejects data |
| **Org Admin** | Can submit and approve data for any project |

---

## Finding Your Assigned Indicators

When you log in as a Reporter, your dashboard shows only the projects and indicators you are assigned to. To submit data:

1. Open your **Dashboard**
2. Click the project you need to report on, **or** navigate via **Projects** in the sidebar
3. Click the **Indicators** tab on the project detail page
4. You will see all indicators linked to this project with their current status for the active reporting period

::: info 📸 Figure 7.1 — Reporter's Project Indicators View
The Indicators tab as seen by a Reporter role. Each indicator row shows the indicator name, the current reporting period (e.g., "Q1 2026"), the period target, and a "Submit Data" button. Indicators already submitted show a "Submitted" badge (yellow) or "Approved" badge (green). Indicators not yet started show a gray "Not started" badge.

**File:** `user-manual/images/07-01-reporter-indicators.png`
:::

---

## Submitting an Indicator Value

1. Find the indicator you want to submit for
2. Click **Submit Data** on the indicator row
3. The data entry form opens:

::: info 📸 Figure 7.2 — Data Entry Form
The indicator data entry slide-over panel. At the top, it shows the indicator name, code, and unit. Below that: a "Reporting Period" selector dropdown (showing the active period), a large "Value" number input with the unit label (e.g., "people"), a "Target" display showing the period target (read-only), a "Progress Preview" that updates in real-time as you type the value, and a "Narrative" text area. At the bottom: Save as Draft and Submit buttons.

**File:** `user-manual/images/07-02-data-entry-form.png`
:::

Fill in the following fields:

| Field | Required | Description |
|---|---|---|
| **Reporting Period** | ✅ | Select the period you are reporting for (e.g., Q1 2026) |
| **Value** | ✅ | The actual number achieved during this period |
| **Narrative** | | A brief explanation of the result — what worked, what didn't, context for the number |

4. Choose one of the two action buttons:
   - **Save as Draft** — saves your entry without submitting. You can come back and edit it later.
   - **Submit** — sends the data for M&E Officer review. You cannot edit a submitted entry without it being rejected back to you.

::: tip
Always add a narrative, even if brief. M&E Officers and donors appreciate knowing the story behind the numbers — what activities produced this result, any challenges faced, or why the value is higher or lower than expected.
:::

---

## Entering Disaggregated Values

If the indicator has disaggregations (e.g., by sex, age group, or location), you will see additional fields in the data entry form:

::: info 📸 Figure 7.3 — Disaggregated Data Entry
The data entry form for an indicator with a "Sex" disaggregation. Three fields appear under "Breakdown by Sex": Female (input), Male (input), Non-binary (input). A "Total" field below automatically sums all three values as you type. A warning appears if the total doesn't match the overall value entered above.

**File:** `user-manual/images/07-03-disaggregated-entry.png`
:::

Enter the value for each category. The system automatically sums them and sets that as the overall value. If the sum doesn't match a value you typed in the main field, a warning appears — resolve this before submitting.

---

## Saving and Editing Drafts

Drafts are saved automatically as you type and can be accessed at any time before submission.

To return to a draft:
1. Go to the project → **Indicators** tab
2. Find the indicator — it shows a **Draft** badge
3. Click **Edit Draft** to continue

::: warning
Drafts are not visible to M&E Officers. Only submitted values appear in the review queue. Make sure to click **Submit** when your data is ready for review.
:::

---

## What Happens After Submission

Once you submit a value, it enters the **review workflow**:

```
Reporter submits → Status: Submitted (yellow)
M&E Officer reviews →
  ✅ Approved → Status: Approved (green) → included in reports
  ❌ Rejected → Status: Rejected (red) → returned to Reporter for correction
```

You will receive a notification if your submission is rejected. The M&E Officer's comment will explain what needs to be corrected.

To correct a rejected submission:
1. Click on the indicator row
2. Click **Edit Submission**
3. Make the corrections
4. Click **Resubmit**

::: info 📸 Figure 7.4 — Submission Status Badges
A close-up of the indicator table showing four rows with different status badges: "Draft" (gray), "Submitted" (yellow), "Approved" (green), and "Rejected" (red). The Rejected row has a small tooltip icon that shows the rejection reason when hovered.

**File:** `user-manual/images/07-04-submission-status.png`
:::

---

## Reviewing and Approving Data (M&E Officers)

M&E Officers see a **Review Queue** on their dashboard showing all pending submissions across all projects.

### Reviewing a submission

1. Navigate to a project → **Indicators** tab, **or** open the review queue from the dashboard notification
2. Click on a **Submitted** indicator
3. Review the value, the narrative, and any disaggregated breakdown
4. Compare against the period target and any supporting documents
5. Choose one of the actions:

### Approve

Click **Approve** to confirm the value is accurate. You can add an optional approval comment for the record.

Once approved:
- The status changes to **Approved** (green)
- The value is included in report assembly
- The reporter receives a notification

### Reject

Click **Reject** if the value needs correction. You **must** enter a rejection reason — this is sent to the reporter.

::: info 📸 Figure 7.5 — Approval / Rejection Dialog
The review dialog showing a submitted indicator value with its narrative. Below the narrative are two large buttons: "Approve" (green) and "Reject" (red). When "Reject" is clicked, a text area appears requiring a rejection reason before the rejection can be confirmed.

**File:** `user-manual/images/07-05-approval-dialog.png`
:::

---

## Data Entry via Forms

In addition to direct indicator entry, reporters can submit data through **Data Collection Forms** — custom forms with multiple questions that feed into indicator values. See the [Data Collection Forms](/user-manual/forms) guide for details.

---

## Frequently Asked Questions

**Can I submit data for a period that has already been locked?**
No. Locked periods reject new submissions. If a correction is needed after a period is locked, contact your M&E Officer to temporarily unlock it.

**What if I submitted the wrong value?**
Ask your M&E Officer to reject the submission with a note. Once rejected, you can edit and resubmit the correct value.

**Can I submit values for multiple periods at once?**
Yes — use the period dropdown in the data entry form to select any open (unlocked) period.

**Is there an import option for bulk data entry?**
Excel import is on the roadmap. Currently, values must be entered individually per indicator per period.
