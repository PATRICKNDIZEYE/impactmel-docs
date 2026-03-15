# Roles & Permissions

ImpactMEL uses **Role-Based Access Control (RBAC)** to ensure that every team member can see and do exactly what their job requires — and nothing more. Permissions are assigned at the organization level.

---

## The Four Roles

### Org Admin
The highest permission level. Typically assigned to Country Directors, Operations Managers, or IT administrators.

An Org Admin can do everything in the system — configure the organization, manage all members, create and delete programs, approve data, and publish reports.

### M&E Officer
Designed for MEAL officers, data managers, and M&E coordinators. They control the M&E architecture of the system: defining indicators, managing reporting periods, and reviewing submitted data.

An M&E Officer cannot manage organization settings or invite members, but has full control over the M&E workflow.

### Reporter
Designed for field officers, project staff, and data entry personnel. Reporters are the people who submit indicator values and register participants.

A Reporter can only access projects they are specifically assigned to, and can only submit data — they cannot approve, edit other people's submissions, or change any system configuration.

### Viewer
Designed for senior management, partner organizations, or anyone who needs to monitor progress without entering data.

A Viewer has read-only access to dashboards and reports across the organization. They cannot submit or approve any data.

---

## Full Permission Matrix

The table below shows exactly what each role can and cannot do. ✅ = allowed, ❌ = not allowed, 🔒 = only for assigned projects.

### Organization & Members

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| View organization settings | ✅ | ✅ | ❌ | ❌ |
| Edit organization settings (name, logo) | ✅ | ❌ | ❌ | ❌ |
| View members list | ✅ | ✅ | ❌ | ❌ |
| Invite new members | ✅ | ❌ | ❌ | ❌ |
| Change a member's role | ✅ | ❌ | ❌ | ❌ |
| Remove a member | ✅ | ❌ | ❌ | ❌ |
| View audit log | ✅ | ❌ | ❌ | ❌ |

### Donors & Funders

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| View donors list | ✅ | ✅ | ❌ | ❌ |
| Create / edit donors | ✅ | ✅ | ❌ | ❌ |
| Delete donors | ✅ | ❌ | ❌ | ❌ |

### Programs

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| View all programs | ✅ | ✅ | 🔒 | ✅ |
| Create a program | ✅ | ✅ | ❌ | ❌ |
| Edit a program | ✅ | ✅ | ❌ | ❌ |
| Delete a program | ✅ | ❌ | ❌ | ❌ |
| Manage results framework | ✅ | ✅ | ❌ | ❌ |

### Projects

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| View all projects | ✅ | ✅ | 🔒 | ✅ |
| Create a project | ✅ | ✅ | ❌ | ❌ |
| Edit project details | ✅ | ✅ | ❌ | ❌ |
| Delete a project | ✅ | ❌ | ❌ | ❌ |
| Manage reporting periods | ✅ | ✅ | ❌ | ❌ |
| Lock / unlock a period | ✅ | ✅ | ❌ | ❌ |

### Indicators

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| View indicator library | ✅ | ✅ | 🔒 | ✅ |
| Create / edit indicators | ✅ | ✅ | ❌ | ❌ |
| Delete indicators | ✅ | ❌ | ❌ | ❌ |
| Link indicators to projects | ✅ | ✅ | ❌ | ❌ |
| Set indicator targets | ✅ | ✅ | ❌ | ❌ |
| Add disaggregations | ✅ | ✅ | ❌ | ❌ |

### Data Entry (Indicator Reports)

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| Submit indicator values (own submissions) | ✅ | ✅ | 🔒 | ❌ |
| Edit draft submissions (own) | ✅ | ✅ | 🔒 | ❌ |
| View all submissions | ✅ | ✅ | 🔒 | ✅ |
| Approve submissions | ✅ | ✅ | ❌ | ❌ |
| Reject submissions | ✅ | ✅ | ❌ | ❌ |

### Activities & Participants

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| View activities | ✅ | ✅ | 🔒 | ✅ |
| Create / edit activities | ✅ | ✅ | 🔒 | ❌ |
| Delete activities | ✅ | ✅ | ❌ | ❌ |
| Register participants | ✅ | ✅ | 🔒 | ❌ |
| Edit / remove participants | ✅ | ✅ | ❌ | ❌ |
| Export participant register | ✅ | ✅ | 🔒 | ✅ |
| Push participants to indicator | ✅ | ✅ | 🔒 | ❌ |

### Data Collection Forms

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| View forms library | ✅ | ✅ | 🔒 | ✅ |
| Create / edit forms | ✅ | ✅ | ❌ | ❌ |
| Publish / unpublish forms | ✅ | ✅ | ❌ | ❌ |
| View form submissions | ✅ | ✅ | 🔒 | ✅ |
| Export submissions | ✅ | ✅ | 🔒 | ❌ |
| Delete forms | ✅ | ❌ | ❌ | ❌ |

### Reports

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| View reports | ✅ | ✅ | 🔒 | ✅ |
| Create / assemble a report | ✅ | ✅ | ❌ | ❌ |
| Edit report narratives | ✅ | ✅ | ❌ | ❌ |
| Generate share link | ✅ | ✅ | ❌ | ❌ |
| Revoke share link | ✅ | ✅ | ❌ | ❌ |
| Download PDF | ✅ | ✅ | 🔒 | ✅ |
| Delete a report | ✅ | ❌ | ❌ | ❌ |

### Budget

| Action | Org Admin | M&E Officer | Reporter | Viewer |
|---|---|---|---|---|
| View budget lines | ✅ | ✅ | 🔒 | ✅ |
| Add / edit budget lines | ✅ | ✅ | ❌ | ❌ |
| Delete budget lines | ✅ | ❌ | ❌ | ❌ |

---

## 🔒 Project Scoping for Reporters

The 🔒 symbol means a Reporter can perform the action only for the **projects they are specifically assigned to**. If a Reporter is not listed as a team member on a project, they cannot see that project at all.

To assign a Reporter to a project:
1. Open the project → **Team** tab (or **Settings** → **Members**)
2. Click **+ Assign Member**
3. Select the reporter from your organization's member list
4. Click **Assign**

Reporters added to a project see it appear on their dashboard and can submit data for its indicators.

---

## Requesting a Role Change

If you need more permissions than your current role allows, contact your **Org Admin** and ask them to update your role. Role changes take effect immediately after the admin saves the update.

---

## Best Practices

**Follow the principle of least privilege.** Assign the minimum role that allows a person to do their job. Fewer admins means a smaller risk of accidental changes.

**Use M&E Officer (not Org Admin) for most M&E staff.** M&E Officers can do everything related to the M&E workflow without being able to delete programs or change organization settings.

**Give Viewer access to senior management and partners.** Viewers can monitor progress and see reports without any risk of accidentally changing data.

**Assign Reporters to specific projects, not the whole org.** This ensures field staff only see what is relevant to them and reduces information overload.

---

::: info 📸 Figure 12.1 — Role Assignment Interface
The Settings → Members tab showing a member row for "Jean Baptiste M." with a "Reporter" role badge. An expanded dropdown shows the four role options (Org Admin, M&E Officer, Reporter, Viewer) with brief descriptions. The currently selected role is highlighted. A "Confirm Change" button appears at the bottom of the dropdown.

**File:** `user-manual/images/12-01-role-assignment.png`
:::
