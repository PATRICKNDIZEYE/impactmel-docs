# Data Collection Forms

<VideoEmbed title="20 · Building a custom data collection form" />

<VideoEmbed title="21 · Sharing a form via public link" />

<VideoEmbed title="22 · Viewing and managing form submissions" />

Data Collection Forms allow you to build custom surveys and forms, deploy them as public links, and have submissions flow automatically into indicator reports — all without a single spreadsheet.

A form can be shared with anyone via a URL: field staff open it on their phone, fill it in, and submit. The data lands directly in your ImpactMEL dashboard.

**Common use cases:**
- Post-training feedback surveys
- Household baseline and endline surveys
- Beneficiary registration forms
- Site monitoring checklists
- Community needs assessments

---

## The Forms Library

Navigate to **Data Collection** in the sidebar to see all forms in your organization.

::: info 📸 Figure 9.1 — Data Collection Library
The Data Collection page showing a grid of form cards. Each card displays the form title, linked project, linked indicator (if any), status badge (Draft/Published/Closed), total submission count, and a "Share" button. Filter options (by project, by status) appear at the top. A "New Form" button is in the top-right corner.

**File:** `user-manual/images/09-01-forms-library.png`
:::

---

## Creating a Form

1. Click **+ New Form**
2. Set up the basic form information:

| Field | Required | Description |
|---|---|---|
| **Form Title** | ✅ | Title shown to respondents at the top of the form |
| **Description / Instructions** | | Instructions for the respondent |
| **Linked Project** | ✅ | Which project this form belongs to |
| **Linked Indicator** | | If submissions should count toward an indicator |
| **Reporting Period** | | Which period submissions will be counted in |
| **Auto-close Date** | | Date after which the form stops accepting responses |

3. Click **Create Form** — the form builder opens

::: info 📸 Figure 9.2 — Form Builder
The form builder interface. On the left: a panel showing the current form fields in order, with drag handles to reorder them. On the right: a field properties panel showing the settings for the selected field. At the top: a "Preview" button and a "Publish" button. Below the field list: an "+ Add Field" button with a dropdown of field type options.

**File:** `user-manual/images/09-02-form-builder.png`
:::

---

## Field Types

| Type | Best for |
|---|---|
| **Short Text** | Names, short answers, single-line responses |
| **Long Text** | Comments, descriptions, feedback (multiple lines) |
| **Number** | Quantities, scores, counts |
| **Single Select** | Choose one from a list (radio buttons / dropdown) |
| **Multiple Select** | Choose several from a list (checkboxes) |
| **Date** | Date picker |
| **Yes / No** | Simple binary question |
| **Location** | Text-based location input or GPS (if on mobile browser) |
| **File Upload** | Photo, document, or signature |
| **Section Heading** | Divider to organize long forms into sections |

---

## Adding Fields

1. Click **+ Add Field** at the bottom of the field list
2. Select a **field type** from the dropdown
3. In the right-hand properties panel, configure the field:
   - **Label** — the question text shown to the respondent
   - **Help text** — optional hint shown below the question
   - **Required** — toggle ON to make the field mandatory
   - **Placeholder** — example answer shown inside the input (for text/number fields)
   - **Options** — for Single/Multiple Select, add the answer choices
4. Click somewhere else to close the properties panel

To **reorder fields**, drag the handle (⋮⋮) on the left side of each field up or down.

To **delete a field**, click the trash icon (🗑) on the right side of the field row.

::: info 📸 Figure 9.3 — Field Configuration Panel
The field properties panel on the right side of the form builder. The selected field is a "Single Select" type. The panel shows: Label input ("What is your primary water source?"), Help text input, Required toggle (ON), and an Options section with four items (Piped water / Borehole / River / Rainwater) each with a drag handle and delete button. An "Add Option" link appears below.

**File:** `user-manual/images/09-03-field-configuration.png`
:::

---

## Conditional Logic

Conditional logic lets you show or hide fields based on a respondent's previous answer. This keeps forms focused and avoids asking irrelevant questions.

**Example:** Only show the question *"Describe the station"* if the person answered *"Yes"* to *"Do you have a handwashing station?"*

### Setting up a condition

1. Click on the field you want to show/hide conditionally
2. In the properties panel, scroll to **Conditional Logic**
3. Toggle **Show this field only when...** to ON
4. Select the **trigger field** (the question whose answer controls this field)
5. Select the **condition** (equals / does not equal / is any of)
6. Enter or select the **value** that triggers the condition
7. The field will only appear when the condition is met

::: info 📸 Figure 9.4 — Conditional Logic Setup
The field properties panel showing the "Conditional Logic" section expanded. The toggle is ON, showing three dropdowns: "When" (field selector showing "Has handwashing station?"), "is" (condition: "equals"), and the value field ("Yes"). A preview note below says: "This field will only be shown when [Has handwashing station?] equals [Yes]."

**File:** `user-manual/images/09-04-conditional-logic.png`
:::

---

## Previewing Your Form

Click **Preview** at the top of the form builder to see exactly what respondents will see. The preview is fully interactive — you can fill it in and test conditional logic without submitting real data.

::: info 📸 Figure 9.5 — Form Preview
The form preview mode showing the form as a respondent would see it on a mobile phone. The form title appears at the top, followed by the description, then each question in sequence. A conditional field is hidden because its trigger answer was not selected. A "Submit" button appears at the bottom.

**File:** `user-manual/images/09-05-form-preview.png`
:::

---

## Publishing a Form

When the form is ready:

1. Click **Publish** at the top of the form builder (or from the form card in the library)
2. A dialog appears with the **public share link**
3. Copy the link and share it with your respondents

The public link looks like: `https://app.impactmel.com/form/abc123`

No login is required to fill in the form. It works on any device — phone, tablet, or computer.

::: info 📸 Figure 9.6 — Publish & Share Dialog
The publish confirmation dialog showing a URL in a read-only input field with a "Copy Link" button next to it. Below the link: a QR code that respondents can scan with their phone camera. Two additional options appear: "Copy Short Link" and "Generate New Link". A warning note says: "Generating a new link will invalidate the current one."

**File:** `user-manual/images/09-06-publish-share.png`
:::

::: tip Generate a QR Code
The share dialog includes a QR code. Print or display it at training venues and community meetings so participants can scan to open the form on their phones.
:::

---

## What Respondents See

The public form page is:
- Clean and mobile-friendly
- Branded with your organization's name
- Shows the form title and instructions
- Validates required fields before allowing submission
- Shows a thank-you confirmation after submission

There is no login, no account creation, and no personal tracking — respondents see only the form.

::: info 📸 Figure 9.7 — Public Form on Mobile
The public form as it appears on a smartphone browser. The ImpactMEL branding appears subtly at the bottom ("Powered by ImpactMEL"). The form shows a clean white card with the form title at the top, and each question below with appropriate input controls. A progress bar at the top of the form shows completion percentage.

**File:** `user-manual/images/09-07-public-form-mobile.png`
:::

---

## Viewing Submissions

1. Open the form card in the Data Collection library
2. Click the **Submissions** tab

The submissions table shows every response with:
- Submission date and time
- Answers to each field
- Device type (mobile/desktop)
- An **Export** button to download all responses as an Excel file

::: info 📸 Figure 9.8 — Submissions Table
The Submissions tab showing a data table with one column per form field and one row per submission. The first three columns are frozen (Submission Date, Device Type, and a sequential ID). A toolbar at the top shows total submission count ("147 responses"), a search bar, date range filter, and an "Export to Excel" button.

**File:** `user-manual/images/09-08-submissions-table.png`
:::

---

## Closing a Form

When you no longer want to accept new responses:

1. Open the form → click **Unpublish** (or **Close Form**)
2. The form URL shows a "This form is closed" message to anyone who opens it
3. All existing submissions are preserved

To reopen the form, click **Republish**.

---

## Frequently Asked Questions

**Can I edit a form after publishing it?**
Yes, but with caution. Adding new fields is safe. Deleting or renaming fields that already have responses may affect how submissions are displayed. A warning appears when you try to delete a field that has existing responses.

**What happens to submissions when a form is linked to an indicator?**
Each submission increments the indicator's value for the selected reporting period. The M&E Officer reviews and approves the indicator report before it appears in final reports.

**Can I accept file uploads?**
Yes — use the File Upload field type. Uploaded files (photos, PDFs) are stored securely and linked to the submission record.

**How many responses can a form accept?**
There is no limit on the number of submissions a form can receive.
