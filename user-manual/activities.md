# Activities & Participants

Activities are the day-to-day work your team does to produce results — training sessions, community meetings, site visits, construction milestones. Participants are the people who attend or benefit from those activities.

Recording activities and participants in ImpactMEL keeps a permanent, auditable log of what was done, who was reached, and how it links to your results framework. Participant data can also be pushed directly into indicator values.

---

## Activities

### What is an Activity?

An activity is a single event or work item linked to a specific **Output** in your results framework. For example:

- *Community WASH training session — Gasabo District — 15 March 2026*
- *Borehole installation — Nyarugenge sector — Week 8*
- *School sanitation inspection — Kicukiro Primary School*

Activities are recorded per **Project**, and each one can have a list of **Participants** registered against it.

---

### Viewing Activities

Open a project → click the **Activities** tab. Activities are displayed as a list sorted by date, grouped by the Output they are linked to.

::: info 📸 Figure 8.1 — Activities Tab
The Activities tab of a project showing a list of activities grouped under Output headings. Each activity row shows the activity title, date, location, facilitator name, participant count (with a small person icon), status badge (Planned/Completed/Cancelled), and action buttons (View, Edit). A "Log Activity" button appears in the top-right.

**File:** `user-manual/images/08-01-activities-list.png`
:::

---

### Logging an Activity

1. Open the project → **Activities** tab
2. Click **+ Log Activity**
3. Fill in the activity details:

| Field | Required | Description |
|---|---|---|
| **Activity Title** | ✅ | Clear, descriptive title |
| **Output** | ✅ | Which result framework Output this activity contributes to |
| **Start Date** | ✅ | Date the activity started (or took place) |
| **End Date** | | End date if the activity spans multiple days |
| **Location** | | Where the activity happened (village, district, facility) |
| **Facilitator** | | Name of the person who led the activity |
| **Description** | | Additional details — methodology, materials used, etc. |
| **Status** | ✅ | Planned, In Progress, Completed, or Cancelled |

4. Click **Save Activity**

::: info 📸 Figure 8.2 — Log Activity Form
The "Log Activity" slide-over panel showing all fields. The Output field is a dropdown showing the results framework tree with selectable Output nodes. The Status field shows a segmented control. Start Date and End Date fields are date pickers. A "Save Activity" button is at the bottom.

**File:** `user-manual/images/08-02-log-activity.png`
:::

---

### Activity Detail Page

Click any activity to open its detail page. This page shows:
- Full activity information (title, dates, location, facilitator)
- The linked Output in the results framework
- A list of registered participants
- Quick actions: Register Participants, Push to Indicator, Edit, Delete

::: info 📸 Figure 8.3 — Activity Detail Page
The activity detail page showing the activity name and metadata in a header section, a "Participants" section below with a table of registered participants (with columns for Name, Sex, Age, Location, and Attended checkbox), and a sidebar showing the linked Output node with its description. Quick action buttons appear at the top-right.

**File:** `user-manual/images/08-03-activity-detail.png`
:::

---

## Participants

### Registering Participants

After an activity takes place, register the people who attended or participated.

1. Open the activity detail page
2. Click **+ Register Participants**
3. For each participant, enter:

| Field | Required | Description |
|---|---|---|
| **First Name** | ✅ | |
| **Last Name** | ✅ | |
| **Sex** | ✅ | Female, Male, or Non-binary |
| **Date of Birth** | | For age disaggregation reporting |
| **Phone** | | Contact number (optional) |
| **Village / Cell** | | Geographic location |
| **District** | | Administrative district |
| **National ID** | | For identity verification (optional) |

4. Click **+ Add Another** to add more participants in the same session
5. Click **Save Participants** when done

::: info 📸 Figure 8.4 — Register Participants Form
The participant registration form showing a repeating section with fields for each participant. Three participants have been partially filled in. An "Add Another Participant" link appears below the last entry. A count badge at the top shows "3 participants added". A "Save Participants" button is at the bottom.

**File:** `user-manual/images/08-04-register-participants.png`
:::

::: tip Bulk import
If you have a participant list in Excel or CSV, you can import it instead of entering one by one. Click the **Import** button at the top of the registration form and upload your file. See the import template for the required column format.
:::

---

### Participant Register

The participant list for an activity shows all registered individuals with their details. You can:

- **Mark attendance** using the checkboxes (useful when some registered people did not attend)
- **Search** participants by name
- **Export** the register as an Excel file or PDF attendance sheet
- **Remove** a participant from the list if registered by mistake

::: info 📸 Figure 8.5 — Participant Register
The participant register table for an activity showing 12 participants. Columns include Name, Sex, Age, Location, and an "Attended" checkbox column. 10 out of 12 checkboxes are checked. At the bottom, a summary shows "10 attended / 12 registered — 83% attendance rate." Export buttons for Excel and PDF appear at the top-right.

**File:** `user-manual/images/08-05-participant-register.png`
:::

---

### Household Members

For household-level surveys and programs, each participant can have family members registered as **household members**. This allows you to track data at the household level rather than just the individual level.

1. Click on a participant's name in the register
2. Click **Household Members** tab
3. Click **+ Add Member**
4. Enter: Name, Relationship to Participant, Sex, Age
5. Click **Save**

---

### Pushing Participant Data to Indicators

Once your participant register is complete, you can automatically populate an indicator with the participant count — eliminating manual counting.

1. Open the activity detail page
2. Click **Push to Indicator**
3. Select the indicator you want to update (e.g., *# of people trained*)
4. Select the reporting period
5. Review the pre-filled values:
   - **Total value** = count of attended participants
   - **Disaggregated values** = automatically split by sex/age based on participant data
6. Add a narrative (optional)
7. Click **Submit**

::: info 📸 Figure 8.6 — Push to Indicator Dialog
The "Push to Indicator" dialog showing a preview of the values that will be submitted. The main value shows "10 people (10 attended participants)". Below, a disaggregation breakdown shows Female: 6 / Male: 4. A period selector and narrative text area appear below. "Submit" and "Cancel" buttons are at the bottom.

**File:** `user-manual/images/08-06-push-to-indicator.png`
:::

This creates an **IndicatorReport** record in draft status, which the M&E Officer then reviews and approves.

---

## Frequently Asked Questions

**Can one participant appear in multiple activities?**
Yes. Participants are linked to specific activities, not the project. The same person can be registered for multiple activities. The system tracks unique participants across a project for deduplication reporting.

**What if I made a mistake in a participant's details?**
Click on the participant's name → click **Edit** → correct the information → **Save**.

**Can I record activities for past dates?**
Yes. The date fields accept any date, past or future. Activities are sorted chronologically.

**Can I export all participants across all activities for a project?**
Yes — in the project Activities tab, click **Export All** to download a full Excel file of all activities and participants for the project.
