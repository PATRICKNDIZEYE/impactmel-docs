# Video guides

<p class="lead">Narrated walkthroughs of the main tasks, recorded in the current interface. Each one follows a person in the demonstration workspace from start to finish.</p>

<script setup>
const base = 'https://media.impactmel.com/videos/roles'
const videos = [
  ['01-owner-sets-up', 'Set up a new organisation', 'Owner', 'Sign up, verify the email, name the organisation, start the trial, then set the role, logo, currency, reporting calendar and first colleague.'],
  ['02-admin-roles', 'Create a role and give someone two', 'Organisation admin', 'A custom role with only the permissions the job needs, a second role for an M&E officer who now manages projects, and who may hand out admin rights.'],
  ['03-me-officer-framework', 'Set up a project and its results framework', 'M&E officer', 'A new project, its impact, outcome and output, an indicator on each, and targets by period split by sex.'],
  ['04-me-officer-builds-form', 'Build a form that writes into an indicator', 'M&E officer', 'A household visit form with an indicator value field, a choice with Other, photo evidence, a preview and a public link for the field team.'],
  ['05-field-officer-submits', 'Send figures from a phone', 'Field officer', 'Fill a visit form with a photo, send the figure, then correct one that came back, with the registers attached.'],
  ['06-me-officer-reviews', 'Review, return and approve figures', 'M&E officer', 'Ask a question in the thread, return a figure with a clear reason, and approve a corrected one with its full history kept.'],
  ['07-pm-tracks-work', 'Track activities and deadlines', 'Programme manager', "This week's activities, progress against target, marking work done, and the deadlines that are overdue."],
  ['08-director-reports', 'Read the portfolio and send the donor report', 'Director', "The portfolio on one screen, an indicator's full history, a quarterly donor report from approved figures, a PDF and a read-only link."],
  ['09-kobo-import', 'Import submissions from KoboToolbox', 'Integrations', 'Connect a Kobo account, map a question to an indicator with a breakdown, and import visits as drafts for review.'],
  ['10-dhis2', 'Bring figures in from DHIS2 and send them back', 'Integrations', 'Connect to DHIS2, map data elements to indicators, import a month into the quarter, and send approved figures back.'],
  ['11-ai-assistant', 'AI that works from your own data', 'AI assistant', 'A form drafted from a description, a framework drafted from a proposal, a flagged figure in review, and a report narrative from approved figures.'],
]
</script>

<div class="videos">
  <figure v-for="[slug, title, role, blurb] in videos" :key="slug">
    <video controls preload="none" playsinline :poster="`/videos/${slug}-poster.jpg`">
      <source :src="`${base}/${slug}-720.mp4`" type="video/mp4" media="(max-width: 800px)" />
      <source :src="`${base}/${slug}-1080.mp4`" type="video/mp4" />
      <track kind="captions" srclang="en" label="English" :src="`/videos/${slug}.vtt`" />
    </video>
    <h3>{{ title }}</h3>
    <p><strong>{{ role }}.</strong> {{ blurb }}</p>
  </figure>
</div>

The videos show the demonstration workspace. Its people and figures are invented.
