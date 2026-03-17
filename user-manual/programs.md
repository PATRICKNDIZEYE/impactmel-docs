# Programs

A **Program** is a funded initiative — typically aligned to a specific donor agreement or multi-year strategic plan. Programs are the organizing structure that groups related projects together under a shared results framework.

**Examples of programs:**
- *WASH for All — USAID 2025–2027*
- *Girls' Education Initiative — GIZ & FCDO 2024–2026*
- *Community Resilience Program — World Bank 2023–2028*

---

## The Programs List

Navigate to **Programs** in the left sidebar to see all programs in your organization.

::: info 📸 Figure 4.1 — Programs List Page
<ImageModal src="/user-manual/images/04-01-programs-list.png" alt="Programs List Page" />

The Programs list page showing a grid of program cards. Each card displays the program name, status badge (Active/Draft/Completed), number of projects, donor logos, date range, and a budget summary bar. A blue "New Program" button appears in the top-right corner. A search bar and filter controls are at the top.

**File:** `user-manual/images/04-01-programs-list.png`
:::

From this page you can:
- **Search** programs by name
- **Filter** by status (Active, Draft, Completed)
- **Open** a program by clicking its card
- **Create** a new program with the **+ New Program** button

---

## Creating a Program

1. Click **+ New Program** in the top-right corner of the Programs page
2. Fill in the program details:

| Field | Required | Description |
|---|---|---|
| **Program Name** | ✅ | Full program name (e.g., *WASH for All*) |
| **Description** | | Detailed program description for internal reference |
| **Start Date** | ✅ | Program start date |
| **End Date** | ✅ | Program end date |
| **Status** | ✅ | Draft, Active, or Completed |
| **Donors** | | Select one or more donors from your donor registry |

3. Click **Create Program**

::: info 📸 Figure 4.2 — New Program Form
<ImageModal src="/user-manual/images/04-02-new-program-form.png" alt="New Program Form" />

The "Create Program" form showing all input fields. The donor field is an auto-complete combobox with a dropdown showing existing donors. A small "Add new donor" option appears at the bottom of the dropdown when a name is typed that doesn't match any existing donor. The "Create Program" and "Cancel" buttons are at the bottom of the form.

**File:** `user-manual/images/04-02-new-program-form.png`
:::

### Adding Donors

The **Donors** field lets you link one or more donors to the program.

- **Select an existing donor:** Start typing the donor's name. Matching donors appear in the dropdown. Click to select.
- **Add a new donor on the fly:** If you type a name that doesn't exist yet, an option appears to create it immediately. The new donor is saved to your organization's donor registry and linked to this program in one step.

::: tip
Before creating programs, set up your donors in **Settings → Donors & Funders**. This ensures consistent donor names and information across all your programs.
:::

---

## Program Detail Page

Click any program to open its detail page.

::: info 📸 Figure 4.3 — Program Detail Page
<ImageModal src="/user-manual/images/04-03-program-detail.png" alt="Program Detail Page" />

The program detail page with a header showing the program name, status badge, date range, and donor logos. Below the header are four tabs: Overview, Projects, Results Framework, and Team. The Overview tab is active, showing a description section and key statistics (total budget, number of projects, number of indicators).

**File:** `user-manual/images/04-03-program-detail.png`
:::

The program detail page has four tabs:

### Overview Tab
Shows the program description, key statistics, and a summary of linked donors with their logos and contact information.

### Projects Tab
Lists all projects within this program. From here you can:
- See each project's status, budget, and progress at a glance
- Click any project to open its detail page
- Create a new project under this program using the **+ New Project** button

::: info 📸 Figure 4.4 — Program Projects Tab
<ImageModal src="/user-manual/images/04-04-program-projects-tab.png" alt="Program Projects Tab" />

The Projects tab showing a list of project cards within the program. Each project card shows project name, status badge, location, date range, budget bar (planned vs. spent), and an indicator progress summary. A "New Project" button appears in the top-right.

**File:** `user-manual/images/04-04-program-projects-tab.png`
:::

### Results Framework Tab
Shows the program's Results Framework — the logical chain from Impact to Outcome to Output. See the [Results Framework section](#linking-a-results-framework) below.

### Team Tab
Shows the team members working on this program and their roles. You can add or remove members from this tab (requires Org Admin or M&E Officer role).

---

## Linking a Results Framework

The Results Framework visualizes how your program's activities connect to impact. It is built as a tree:

```
Impact (top level)
  └── Outcome
       └── Output
            └── Activities (logged in projects)
```

To build the results framework for a program:

1. Open the program → click the **Results Framework** tab
2. Click **+ Add Impact** to create the root node
3. Click the **+** icon on any node to add a child node (Outcome or Output)
4. Enter a title and description for each node
5. Click **Save**

Indicators and activities can then be linked to specific Output or Outcome nodes when they are created.

::: info 📸 Figure 4.5 — Results Framework Builder
<ImageModal src="/user-manual/images/04-05-results-framework.png" alt="Results Framework Builder" />

The Results Framework tab showing a tree structure with one Impact node at the top ("Improved water security in rural Rwanda"), two Outcome nodes below it, and three Output nodes at the bottom. Each node has a small +, edit (pencil), and delete (trash) icon. An "Add Impact" button appears at the top of the canvas.

**File:** `user-manual/images/04-05-results-framework.png`
:::

---

## Editing a Program

1. Open the program detail page
2. Click the **Edit** button (top-right of the overview section) or the three-dot menu (⋯)
3. Update any field
4. Click **Save Changes**

---

## Archiving and Deleting Programs

- **Archive (mark as Completed):** Change the status to **Completed** via the edit form. The program remains visible but is filtered out of the active view by default.
- **Delete:** Click the three-dot menu (⋯) → **Delete Program**. This is permanent and cannot be undone. Programs with active projects cannot be deleted — you must close or move all projects first.

::: warning
Deleting a program permanently removes it and all associated data including projects, indicators, and reports. This action cannot be reversed.
:::
