# Forms and the form builder

<p class="lead">Forms collect data from the field. A form can be general, such as a site visit checklist, or write its answers straight into an indicator as a draft figure for review.</p>

**Who can do this:** M&E officers and Organisation admins build and publish forms. Anyone with forms permission can see forms and export responses.

## The Forms page

Open **Forms** in the sidebar.

![The Forms page: each form, what it writes to, its status, responses and public link.](/images/forms-list.webp)

Each row shows the project, the indicator the form writes to, the number of fields, its status and version, the number of responses and whether its public link is on. Use the tabs **All**, **Published** and **Drafts**, the project filter and search. **Import from Kobo or DHIS2** opens [Integrations](/manual/integrations).

## Create a form

Choose **New form**. If AI features are on, there are two tabs:

- **Describe it.** Write what the form should collect, in plain words, and choose **Draft with AI**. You see every question and its skip logic before anything is created. Choose **Draft again** to try once more, or **Create form** to keep it.
- **Start blank.** Enter a name, the project (or **Whole organisation, no project**) and a description.

![Describing a form for the AI assistant to draft.](/images/form-new.webp)

## The form builder

![The form builder: field types on the left, the form in the middle, field settings on the right.](/images/form-builder.webp)

Drag a field type from **Add a field** into the form, or click it. Drag fields to reorder them. Select a field to change its settings on the right. Drafts save automatically.

### Field types

| Group | Types |
|---|---|
| Basic | Short text, Long text, Number, Yes / No, Date, Time, Note |
| Choices | Single choice, Multiple choice, Rating |
| M&E | Location, Participant, Activity, Indicator value, Evidence |

### Field settings

![Field settings for a number field with an allowed range.](/images/form-field-settings.webp)

- **Label** and **Help text**.
- **Required.** The form cannot be sent without an answer.
- **Allowed range** for numbers and indicator values. Answers outside it are refused.
- **Pattern** for short text, for IDs and codes.
- **Number of stars** for ratings, from 2 to 10.
- **Add choice** and **Add "Other"** for choices. When someone picks Other, they must say what it is.
- **Export column**, the column name in exports.

### Logic

Switch on **Show this question only when…** to show a question only when earlier answers call for it. Conditions can depend only on questions above, and combine as **all** or **any**. Answers to hidden questions are not sent, and the server checks the same rules.

### Location

A **Location** field lets the person filling the form choose **Use my location** to record the phone's GPS position, with its accuracy, and type a place name or address.

### Photos and files

An **Evidence** field accepts photos, PDF or Word documents, up to 10 MB per file, one file per question. Large photos are made smaller on the phone before upload.

### Writing to an indicator

An **Indicator value** field writes its answer to the indicator you choose. Each answer arrives in [Review](/manual/review) as a draft figure. The person filling the form marks it **Counted** or **Estimated**, and an estimate needs a note on how it was made.

### Ask AI

**Ask AI** in the builder suggests changes to the form from a plain request. Nothing changes until you choose **Apply**.

## Publish

Choose **Publish**. ImpactMEL will not publish while any field needs attention, and lists the fields to fix. Changes to a published form are saved as a draft; they go live, as a new version, when you publish again. **Unpublish** in the **…** menu switches the form off.

## Share a form

Choose **Share**.

![The Share panel: the public link, responses and end date.](/images/form-share.webp)

- Each published form has one **public link**. Anyone with the link can fill in the form without an account. **Copy** it to send by email, SMS or a messaging app.
- Set an **End date** after which the link stops taking responses. Otherwise it stays open until you unpublish.
- **Offer to send another response** lets people fill the form again straight away.
- **Preview** and **Open the link** let you check it.

Unpublishing switches the link off. Publishing again reuses the same link.

## Responses

The **Responses** tab lists every response.

![The Responses tab.](/images/form-responses.webp)

- Search answers and names, filter by date, project, who sent it, and whether it came from a signed-in member or the shared link.
- Open a response to see each answer, photos and a map of its location.
- **Export** to Excel or CSV. The export follows your filters.
- **Delete response** removes a response. A response already written into an indicator figure cannot be deleted; correct the figure through review instead. A copy of every deleted response is kept in the activity log.

## Delete a form

From the **…** menu, choose **Delete form**. If the form has responses, you must confirm that they will be deleted for good.
