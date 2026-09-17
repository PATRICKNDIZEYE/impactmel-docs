import { apiGet } from './browser.mjs'

const pick = (rows, score) =>
  rows.length ? rows.map((r) => [score(r), r]).sort((a, b) => b[0] - a[0])[0][1] : null

export async function discoverWorld(page) {
  const me = await apiGet(page, '/auth/profile')
  const orgId = me.orgId ?? me.organizationId ?? me.organization?.id
  if (!orgId) throw new Error('signed-in profile carries no organisation id')

  const programmes = await apiGet(page, '/programs')
  const projects = await apiGet(page, '/projects')

  // A programme worth photographing has several projects under it.
  const byProgramme = new Map()
  for (const p of projects) {
    const key = p.programId ?? p.programmeId
    if (!key) continue
    byProgramme.set(key, [...(byProgramme.get(key) ?? []), p])
  }
  const programme = pick(programmes, (pr) => (byProgramme.get(pr.id)?.length ?? 0))

  // Indicators per project, so the chosen project is one with real content.
  const candidates = (byProgramme.get(programme?.id) ?? projects).slice(0, 8)
  const withCounts = []
  for (const p of candidates) {
    let indicators = []
    try {
      indicators = await apiGet(page, `/indicators?projectId=${p.id}`)
    } catch {
      indicators = []
    }
    withCounts.push({ project: p, indicators })
  }
  const best = pick(withCounts, (c) => c.indicators.length) ?? { project: projects[0], indicators: [] }
  const project = best.project

  // An indicator with a measured history: the detail page's "Performance by
  // period" panel is empty otherwise, and that panel is the figure.
  let indicator = pick(best.indicators, (i) => Number(i.reportedCount ?? i.submissionCount ?? 0)) ?? best.indicators[0] ?? null
  if (indicator && !indicator.direction) indicator = best.indicators[0] ?? indicator

  const soft = async (endpoint) => {
    try {
      return await apiGet(page, endpoint)
    } catch {
      return []
    }
  }

  const forms = await soft('/forms')
  const reports = await soft('/reports/org')
  const activities = project ? await soft(`/activities?projectId=${project.id}`) : []
  const periods = await soft('/reporting-periods')

  const form = pick(
    forms.filter((f) => f.status === 'published' || f.isPublished),
    (f) => Number(f.responseCount ?? 0),
  ) ?? forms[0] ?? null

  const world = {
    orgId,
    orgName: me.organization?.name ?? me.orgName ?? 'Meridian Impact Alliance',
    programId: programme?.id ?? null,
    programName: programme?.name ?? null,
    projectId: project?.id ?? null,
    projectName: project?.name ?? null,
    indicatorId: indicator?.id ?? null,
    indicatorName: indicator?.name ?? null,
    formId: form?.id ?? null,
    formName: form?.name ?? form?.title ?? null,
    reportId: pick(reports, (r) => (r.sharedAt || r.shareToken ? 2 : 1))?.id ?? reports[0]?.id ?? null,
    activityId: pick(activities, (a) => Number(a.participantCount ?? 0))?.id ?? activities[0]?.id ?? null,
    periodId: pick(periods, (p) => (p.status === 'open' ? 2 : 1))?.id ?? periods[0]?.id ?? null,
    counts: {
      programmes: programmes.length,
      projects: projects.length,
      indicatorsInProject: best.indicators.length,
      forms: forms.length,
      reports: reports.length,
      activities: activities.length,
      periods: periods.length,
    },
  }
  return world
}

export function describeWorld(w) {
  return [
    `org        ${w.orgName} (${w.orgId})`,
    `programme  ${w.programName ?? '—'}`,
    `project    ${w.projectName ?? '—'} · ${w.counts.indicatorsInProject} indicators`,
    `indicator  ${w.indicatorName ?? '—'}`,
    `form       ${w.formName ?? '—'}`,
    `report     ${w.reportId ?? '—'}`,
    `activity   ${w.activityId ?? '—'}`,
    `period     ${w.periodId ?? '—'}`,
    `totals     ${JSON.stringify(w.counts)}`,
  ].join('\n')
}
