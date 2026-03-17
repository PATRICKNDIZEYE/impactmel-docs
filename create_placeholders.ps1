$figures = @(
    "01-01-home-screen.png",
    "02-01-register.png",
    "02-02-org-setup.png",
    "02-03-interface-overview.png",
    "02-04-invite-member.png",
    "03-01-dashboard-overview.png",
    "03-02-summary-cards.png",
    "03-03-program-table.png",
    "03-04-indicators-at-risk.png",
    "03-05-activity-feed.png",
    "04-01-programs-list.png",
    "04-02-new-program-form.png",
    "04-03-program-detail.png",
    "04-04-program-projects-tab.png",
    "04-05-results-framework.png",
    "05-01-projects-list.png",
    "05-02-new-project-form.png",
    "05-03-project-hero.png",
    "05-04-project-overview.png",
    "05-05-project-indicators.png",
    "05-06-reporting-periods.png",
    "06-01-indicator-library.png",
    "06-02-new-indicator-form.png",
    "06-03-setting-targets.png",
    "06-04-disaggregations.png",
    "06-05-formula-indicator.png",
    "06-06-indicator-detail.png",
    "07-01-reporter-indicators.png",
    "07-02-data-entry-form.png",
    "07-03-disaggregated-entry.png",
    "07-04-submission-status.png",
    "07-05-approval-dialog.png",
    "08-01-activities-list.png",
    "08-02-log-activity.png",
    "08-03-activity-detail.png",
    "08-04-register-participants.png",
    "08-05-participant-register.png",
    "08-06-push-to-indicator.png",
    "09-01-forms-library.png",
    "09-02-form-builder.png",
    "09-03-field-configuration.png",
    "09-04-conditional-logic.png",
    "09-05-form-preview.png",
    "09-06-publish-share.png",
    "09-07-public-form-mobile.png",
    "09-08-submissions-table.png",
    "10-01-reports-list.png",
    "10-02-new-report-dialog.png",
    "10-03-report-view-top.png",
    "10-04-progress-section.png",
    "10-05-narrative-editing.png",
    "10-06-share-dialog.png",
    "10-07-public-report-donor-view.png",
    "11-01-settings-navigation.png",
    "11-02-general-settings.png",
    "11-03-members-tab.png",
    "11-04-invite-member-dialog.png",
    "11-05-donors-tab.png",
    "11-06-security-settings.png",
    "11-07-account-settings.png",
    "12-01-role-assignment.png"
)

foreach ($fig in $figures) {
    $num = $fig -replace '\.png$', ''
    $content = @"
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#f0f0f0" stroke="#ccc" stroke-width="2"/>
  <text x="400" y="300" text-anchor="middle" font-family="Arial" font-size="24" fill="#666">
    Placeholder for Figure $num
  </text>
  <text x="400" y="330" text-anchor="middle" font-family="Arial" font-size="16" fill="#999">
    Replace with actual screenshot: $fig
  </text>
</svg>
"@
    $content | Out-File -FilePath "public\user-manual\images\$fig" -Encoding UTF8
}