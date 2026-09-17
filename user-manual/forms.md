---
title: Forms
chapter: 14
roles:
  - reporter
  - me_officer
  - org_admin
---

# Forms

A **form** is something you build, publish, and share by link. Anyone with the link can fill it in on a phone without an account, and the responses appear in ImpactMEL.

Open it from the top bar: **More → Forms**.

Common uses:

- Post-training feedback
- Household baseline and endline surveys
- Participant intake
- Site monitoring checklists
- Attendance sheets

<div class="doc-page-hero">
  <p class="doc-page-hero__eyebrow">Field collection</p>
  <p class="doc-page-hero__title">Turn a survey into data that lands in ImpactMEL, not in a spreadsheet you have to clean.</p>
  <p class="doc-page-hero__copy">Use this when collection needs to reach further than the people with logins.</p>
  <div class="doc-page-hero__meta">
    <div class="doc-page-hero__meta-item">
      <span>Best for</span>
      <strong>M&amp;E officers and field coordinators</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Best moment</span>
      <strong>Before fieldwork starts</strong>
    </div>
    <div class="doc-page-hero__meta-item">
      <span>Main outcome</span>
      <strong>A published form with a link you can send</strong>
    </div>
  </div>
</div>

::: warning Forms has no left rail
Forms is one of the sections with no left-hand rail, so that side of the page is empty. Nothing is missing.
:::

---

## Watch it done

<div class="video-track__grid">
  <VideoEmbed src="/videos/30-create-form.mp4" title="30 · Create a data-collection form" duration="34s" />
  <VideoEmbed src="/videos/31-form-builder-fields.mp4" title="31 · Add fields in the form builder" duration="27s" />
  <VideoEmbed src="/videos/32-publish-share-form.mp4" title="32 · Publish a form and share the public link" duration="25s" />
  <VideoEmbed src="/videos/33-submit-public-form.mp4" title="33 · What respondents see: the public form" duration="22s" />
  <VideoEmbed src="/videos/34-view-form-responses.mp4" title="34 · Review form responses" duration="24s" />
  <VideoEmbed src="/videos/35-delete-form-with-export.mp4" title="35 · Delete a form — with your data protected" duration="31s" />
</div>

## The forms list

The page is headed **Forms**. Each card shows the form's name, its status, and a truncated copy of its public address.

**Search forms…** filters by name and description.

{{figure:forms-list}}

---

<!-- roles: me_officer, org_admin -->

## Creating a form

1. Click **New form** — or **Create your first form** if you have none.
2. The dialog is headed **Create a form**: *Give your form a name and short description. You'll add fields on the next screen.*
3. Enter a **Name** and, if you want one, a **Description (optional)** — it is shown on the public form.
4. Click **Create**.

The builder opens.

---

## The builder

{{figure:form-builder}}

Along the top: the form's name and description, both editable in place; a status chip reading **Draft**, **Published** or **Archived**; a version number; and a save indicator.

The builder **saves itself** as you work. The indicator reads **Saving…**, **Unsaved** or **Saved**. There is no save button.

**Preview** switches to what a respondent sees, and back to **Edit**. In preview, the submit button reads **Preview submit** and nothing is recorded.

An empty form says **Add your first field**: *Pick a field type from the left. You can reorder, edit, and add more anytime.*

---

## Field types

The palette on the left is headed **Add field**, in three groups.

### Basic

| Type | What it is |
|---|---|
| **Short text** | One-line text answer |
| **Long text** | Multi-line paragraph |
| **Number** | Numeric input |
| **Yes / No** | Boolean toggle |
| **Date** | Calendar date |
| **Time** | Time of day |
| **Note** | Display-only text |

### Choices

| Type | What it is |
|---|---|
| **Single choice** | Pick one option |
| **Multiple choice** | Pick many options |
| **Rating** | A star scale, five by default |

### IMPACTMEL

| Type | What it is |
|---|---|
| **Location** | Place search plus a GPS pin |
| **Participant** | Pick or create a participant |
| **Activity** | Pick from the project's activities |
| **Indicator value** | The answer flows to an indicator |
| **Evidence file** | Photo or document upload |

---

## Configuring a field

Click a field. The panel on the right is headed **Edit field**, with the type beneath.

{{figure:form-field-inspector}}

Every field has:

| Setting | What it does |
|---|---|
| **Label** | The question, as the respondent reads it. Required |
| **Help text** | Shown under the label to guide respondents |
| **Field key** | The column key in exports. Letters, numbers and underscores only. A warning appears if two fields share one |
| **Required field** | Whether it must be answered. Not shown on a **Note** |

Depending on the type, you also get:

- **Choices**, with **Add choice** — single and multiple choice
- **Validation**, with **Min** and **Max** — number and rating
- **Pattern (regex)** — short and long text
- **Max stars** — rating
- **Indicator binding** — indicator value
- **Note text** — note
- **Accepted file types** — evidence file

**Remove field** is at the bottom of the panel.

Reorder fields by dragging the handle.

### Sending an answer to an indicator

Add an **Indicator value** field and set its **Indicator binding**. The numeric answer in that field flows to the chosen indicator when a response is submitted.

If the dropdown reads **No indicators in scope**, there is no indicator available for this form to bind to.

---

## Publishing

1. Click **Publish**.
2. A green banner appears headed **Share this form**, with the link and three buttons: **Copy**, **Open** and **View responses**.

The link is your organisation's address followed by `/f/` and the form's token. No login is needed to fill it in, and it works on any device.

{{figure:form-share}}

A form with no fields cannot be published — you are told to add at least one first.

::: warning Publishing freezes the fields
While a form is published, the palette and the drag handles are disabled. The banner explains why: *To edit fields, unpublish first — existing responses stay pinned to the current version.*
:::

**Unpublish** moves it back to draft and the public link stops working.

---

## What a respondent sees

Your organisation's name and logo under **Form from**, the form's title and description, then the questions in order.

Three optional respondent fields come first: **Your name**, an email and a phone number. All three are marked *Optional*.

The button reads **Submit response**. Afterwards they see **Thank you** — *Your response has been recorded.*

<!-- /roles -->

---

## Reading responses

Click **View responses** on the banner, or open the form and go to its responses page.

The page shows the form's name, how many responses there are, and two panes. On the left, a searchable list — each row is the respondent's name, or **Anonymous respondent**, with the time and location. Click one and its answers appear on the right, in the order the form asks them.

Evidence files appear as download links.

{{figure:form-responses}}

An empty form says **No responses yet**: *Share the public link from the builder. Responses will appear here as soon as they come in.*

---

<!-- roles: me_officer, org_admin -->

## Deleting a form, and keeping the data

The bin icon on a form card starts the deletion. ImpactMEL checks for collected data first.

If there are responses, the dialog says so and gives you a button reading **Export all N responses (.xlsx)**. Use it. You then have to tick **I understand the collected data will be permanently deleted** before the **Delete form** button will work.

The export is one sheet named **Responses**, with columns for **Submitted at**, **Respondent**, **Email**, **Phone**, **Location**, then one column per field label.

::: warning This is the only response export
There is no export button on the responses page itself. The export inside the delete dialog is the only way to get a form's responses as a spreadsheet. You can cancel the deletion after exporting.
:::

<!-- TODO: telling readers to open a delete dialog in order to export their data is bad advice that happens to be accurate. The export helper already exists and is called from one place only. If a plain Export button lands on the responses page, delete this warning and move the column list up into the Reading responses section. -->

<!-- /roles -->

---

## Common questions

**Can I edit a published form?**
Unpublish it first. Responses already collected stay pinned to the version they were answered on.

**Can I accept photos?**
Yes — the **Evidence file** field type.

**How many responses can a form take?**
There is no limit.

**Is there conditional logic — showing a question only if a previous answer was Yes?**
Not yet. Every field is shown to every respondent.

**Can a form close itself on a date?**
Not from the builder. Unpublish it when you are finished collecting.

---

## Two kinds of link

Forms are not the only public link in ImpactMEL, and the two are worth keeping apart.

| Link | Built where | What it collects |
|---|---|---|
| A **form** link | More → Forms | Answers to questions you designed |
| A **collection** link | A project → Collect Data → **Share Form** | One figure against one indicator, for one period |

A collection link is the right tool when a partner just needs to report a number. See [Entering data](/user-manual/data-entry).

---

## Where to go next

- [Entering data](/user-manual/data-entry) — turning responses into submissions
- [Activities and participants](/user-manual/activities) — the registry a Participant field writes into
- [Indicators](/user-manual/indicators) — what an Indicator value field binds to
