---
title: Administrator Appendix
chapter: 91
roles:
  - org_admin
---

# Administrator Appendix

This chapter exists in the complete and `org_admin` editions only. It is the
fixture for whole-file role filtering: a build for any other role does not
contain this page, this heading, or anything below it.

## Deleting an organisation

Deleting an organisation removes every programme, project, indicator, activity
and reported value inside it. There is no undo and no soft-delete window.

1. Export everything you intend to keep first. A report rendered after deletion
   cannot reconstruct the underlying values.
2. Confirm that no other administrator is mid-reporting-cycle.
3. Type the organisation name to confirm.

## Transferring ownership

An organisation must always have at least one administrator. To hand over:

1. Invite the incoming administrator and wait for them to accept.
2. Raise their role to **Org Admin**.
3. Only then lower your own role, or remove yourself.

Doing these in the other order leaves the organisation without an
administrator, which requires support intervention to repair.
