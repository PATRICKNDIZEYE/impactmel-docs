# Settings & Administration

<VideoEmbed title="29 · Managing donors and funding sources" />

<VideoEmbed title="30 · Notification preferences and email alerts" />

The Settings section is where Org Admins manage the organization, team members, donors, and workspace preferences. Access it by clicking **Settings** in the left sidebar.

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/11-01-settings-navigation.png" alt="Figure 11.1 — Settings Navigation" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 11.1 — Settings Navigation</p>
    <p>The Settings page with a sub-navigation menu on the left showing tabs: General, Members, Donors &amp; Funders, Security, and Notifications. The "General" tab is selected, showing organization name, code, and logo upload fields in the main content area.</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

---

## General Settings

The **General** tab lets you update your organization's core information.

| Setting | Description |
|---|---|
| **Organization Name** | The full display name of your organization |
| **Organization Code** | Short identifier (e.g., *STF-RW*) — used in exports and reports |
| **Logo** | Upload your organization's logo (PNG or SVG, max 1 MB) |
| **Website** | Your organization's public website URL |
| **Country** | Primary country of operation |

After making changes, click **Save Changes**.

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/11-02-general-settings.png" alt="Figure 11.2 — General Settings Tab" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 11.2 — General Settings Tab</p>
    <p>The General tab showing the organization name and code as editable text inputs, a logo upload area with a preview of the current logo, and country/website fields below. A "Save Changes" button appears at the bottom. A note below the logo upload says "Recommended size: 200×60px. PNG or SVG format."</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

---

## Managing Team Members

The **Members** tab shows everyone who has access to your organization's ImpactMEL account.

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/11-03-members-tab.png" alt="Figure 11.3 — Members Tab" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 11.3 — Members Tab</p>
    <p>The Members tab showing a table with columns: Name, Email, Role (shown as a colored badge), Status (Active/Pending), Date Joined, and an Actions column with "Change Role" and "Remove" options. A search bar appears at the top. An "+ Invite Member" button is in the top-right corner. Pending invitations appear with a gray "Pending" badge and a "Resend" link.</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

### Inviting a New Member

1. Click **+ Invite Member**
2. Enter their **email address**
3. Select their **role** (see [Roles & Permissions](/user-manual/roles-permissions) for guidance)
4. Click **Send Invitation**

The invited person receives an email with a link to create their account (or sign in if they have one). Once they accept, they appear as **Active** in your members list.

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/11-04-invite-member-dialog.png" alt="Figure 11.4 — Invite Member Dialog" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 11.4 — Invite Member Dialog</p>
    <p>The "Invite Member" dialog showing an email address field and a role dropdown with four options: Org Admin, M&amp;E Officer, Reporter, and Viewer. Each option has a brief description below its name. A "Send Invitation" button is at the bottom. A note below the role selector says "You can change their role at any time after they join."</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

### Changing a Member's Role

1. Find the member in the table
2. Click **Change Role** in the Actions column
3. Select the new role
4. Click **Update Role**

The change takes effect immediately — the member's permissions are updated on their next page load.

### Removing a Member

1. Find the member in the table
2. Click **Remove** in the Actions column
3. Confirm in the dialog that appears

Removed members immediately lose access to your organization. Their submitted data is preserved — it is not deleted when a member is removed.

::: warning
Removing a member cannot be undone automatically. If the removal was a mistake, you will need to send a new invitation to re-add them.
:::

### Resending an Invitation

If an invited person hasn't accepted after a few days, the invitation may have gone to their spam folder.

1. Find their entry in the members table (shown with a **Pending** badge)
2. Click **Resend** next to their entry
3. A new invitation email is sent

---

## Donors & Funders

The **Donors & Funders** tab maintains your organization's registry of funding organizations. Donors in this registry can be linked to programs.

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/11-05-donors-tab.png" alt="Figure 11.5 — Donors & Funders Tab" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 11.5 — Donors &amp; Funders Tab</p>
    <p>The Donors &amp; Funders tab showing a searchable table of donors. Columns include: Donor Name, Code, Type (shown as a colored badge: Bilateral/Multilateral/Private/NGO), Country, Contact, and Action buttons (Edit, Delete). A search bar at the top. A "+ New Donor" button in the top-right. Type filter chips (All / Bilateral / Multilateral / Private / NGO) appear below the search bar.</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

### Adding a Donor

1. Click **+ New Donor**
2. Fill in the donor's details:

| Field | Required | Description |
|---|---|---|
| **Donor Name** | ✅ | Full official name |
| **Code** | | Short abbreviation (e.g., *USAID*, *GIZ*, *FCDO*) |
| **Type** | ✅ | Bilateral, Multilateral, Private, NGO, Government, Other |
| **Country** | | Donor's country of origin |
| **Website** | | Donor's website URL |
| **Contact Name** | | Primary point of contact |
| **Contact Email** | | Contact email address |
| **Notes** | | Internal notes about this donor relationship |

3. Click **Save Donor**

### Donor Types

| Type | Examples |
|---|---|
| **Bilateral** | USAID, FCDO, GIZ, AFD, SIDA |
| **Multilateral** | UNICEF, UNDP, World Bank, European Union, WHO |
| **Private** | Private foundations, corporate social responsibility |
| **NGO** | International NGO sub-grants |
| **Government** | Host government co-financing |
| **Other** | Any other funding source |

### Editing or Deleting a Donor

- **Edit:** Click the pencil icon on the donor row → update fields → **Save**
- **Delete:** Click the trash icon → confirm. Donors linked to active programs cannot be deleted — unlink them from all programs first.

---

## Notification Preferences

The **Notifications** tab lets each user configure which system events they want to be notified about via email or in-app alert.

| Event | Who receives it | Configurable |
|---|---|---|
| Indicator report submitted | M&E Officers | ✅ |
| Indicator report approved | Reporter who submitted | ✅ |
| Indicator report rejected | Reporter who submitted | ✅ |
| Reporting period due in 7 days | All project members | ✅ |
| New member joined the org | Org Admins | ✅ |
| Report shared externally | Org Admins | ✅ |

To update your preferences:
1. Go to **Settings** → **Notifications**
2. Toggle each notification type on or off
3. Changes save automatically

---

## Security Settings

The **Security** tab (Org Admin only) shows:

- **Active sessions** — list of devices currently logged into your account
- **Session timeout** — how long until inactive sessions are automatically signed out
- **2FA setup** — Two-factor authentication via authenticator app (coming soon)
- **Audit log** — a tamper-proof log of all admin actions in the organization

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/11-06-security-settings.png" alt="Figure 11.6 — Security Settings Tab" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 11.6 — Security Settings Tab</p>
    <p>The Security tab showing three sections: "Active Sessions" (a table of devices with location, browser, and a "Sign out this device" button), "Session Settings" (a timeout dropdown set to "7 days"), and "Audit Log" (a chronological list of admin actions with timestamps, user names, and action descriptions).</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>

### Audit Log

The audit log records every significant action taken by any admin in your organization:

- Member invited / removed / role changed
- Program / project created or deleted
- Reporting period locked or unlocked
- Report published or share link revoked
- Org settings changed

Each entry shows: who did it, what they did, when, and the IP address. The audit log cannot be edited or deleted.

---

## Your Profile Settings

Each user (regardless of role) can manage their personal account settings:

1. Click your **avatar** or name in the top-right corner
2. Select **Account Settings**

From there you can:
- Update your **display name**
- Change your **email address**
- Update your **password**
- Manage **notification preferences**
- **Sign out** from all devices

<figure class="doc-figure">
  <div class="doc-figure__media">
    <ImageModal src="/user-manual/images/11-07-account-settings.png" alt="Figure 11.7 — Account Settings Page" />
  </div>
  <figcaption class="doc-figure__caption">
    <p class="doc-figure__title">Figure 11.7 — Account Settings Page</p>
    <p>The personal account settings page showing: a profile photo upload area, First Name and Last Name fields, Email field with a "Change Email" button, a "Change Password" section with current and new password fields, and a "Sign Out All Devices" button at the bottom in red.</p>
    <p class="doc-figure__hint">Click the screenshot to expand it.</p>
  </figcaption>
</figure>
