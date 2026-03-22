---
layout: home

hero:
  name: "ImpactMEL"
  text: "M&E Built for Serious Teams"
  tagline: From field data entry to donor-ready report — tracked, reviewed, and delivered in one system. No spreadsheets. No reconciliation.
  image:
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" rx="32" fill="#0f2d52"/><rect x="20" y="20" width="160" height="160" rx="20" fill="#1e3a5f" opacity="0.6"/><line x1="50" y1="160" x2="50" y2="95" stroke="#16a34a" stroke-width="14" stroke-linecap="round"/><line x1="90" y1="160" x2="90" y2="55" stroke="#16a34a" stroke-width="14" stroke-linecap="round"/><line x1="130" y1="160" x2="130" y2="75" stroke="#7eb3e0" stroke-width="14" stroke-linecap="round"/><line x1="170" y1="160" x2="170" y2="110" stroke="#7eb3e0" stroke-width="14" stroke-linecap="round"/><polyline points="50,95 90,55 130,75 170,110" stroke="#b8922e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-dasharray="6,3"/><circle cx="50" cy="95" r="5" fill="#b8922e"/><circle cx="90" cy="55" r="5" fill="#b8922e"/><circle cx="130" cy="75" r="5" fill="#b8922e"/><circle cx="170" cy="110" r="5" fill="#b8922e"/><line x1="30" y1="50" x2="180" y2="50" stroke="rgba(255,255,255,0.06)" stroke-width="1"/><line x1="30" y1="80" x2="180" y2="80" stroke="rgba(255,255,255,0.06)" stroke-width="1"/><line x1="30" y1="110" x2="180" y2="110" stroke="rgba(255,255,255,0.06)" stroke-width="1"/><line x1="30" y1="140" x2="180" y2="140" stroke="rgba(255,255,255,0.06)" stroke-width="1"/></svg>'
  actions:
    - theme: brand
      text: Start with the User Manual
      link: /user-manual/overview
    - theme: alt
      text: Watch video guides
      link: /videos/
    - theme: alt
      text: Quick Start →
      link: /guide/quick-start

features:
  - icon: 🎯
    title: Results Framework
    details: Model your full logical framework — Impact → Outcome → Output → Activity. Every indicator traces back to a result. No more disconnected spreadsheets.
    link: /user-manual/overview
    linkText: Learn more

  - icon: 📊
    title: Smart Indicators
    details: Define once, reuse across projects. Set targets per period, add disaggregations by sex or age group, and build formula indicators automatically.
    link: /user-manual/indicators
    linkText: Learn more

  - icon: 📋
    title: Dynamic Data Collection
    details: Build forms with conditional logic. Deploy as a public link — field staff submit from their phone. Data flows straight into indicator reports.
    link: /user-manual/forms
    linkText: Learn more

  - icon: 📄
    title: One-Click Reports
    details: Assemble quarterly donor reports, annual reviews, and evidence packs in seconds. Share via public link or export as a true binary PDF.
    link: /user-manual/reports
    linkText: Learn more

  - icon: 🔐
    title: Role-Based Access
    details: Owner, Admin, Member, Viewer — with permission-level scoping on every screen and every API endpoint. Donors get a read-only public link, no login needed.
    link: /user-manual/roles-permissions
    linkText: Learn more

  - icon: 🌍
    title: Built for Development Orgs
    details: Designed for NGOs, INGOs, government programs, and research institutions. Multi-org, multi-donor, multi-currency. Replaces DevResults at a fraction of the cost.
    link: /guide/introduction
    linkText: Learn more
---

<style>
/* ── Hero badge ──────────────────────────────────────────────── */
.VPHero::before {
  content: 'Enterprise M&E Platform';
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #16a34a;
  background: rgba(22,163,74,0.1);
  border: 1px solid rgba(22,163,74,0.25);
  border-radius: 20px;
  padding: 4px 14px;
  width: fit-content;
  margin-bottom: 20px;
}

/* ── Stats strip ─────────────────────────────────────────────── */
.home-stats {
  display: flex;
  gap: 0;
  justify-content: center;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  padding: 0;
  margin: 0;
}

.home-stat {
  flex: 1;
  text-align: center;
  padding: 32px 24px;
  border-right: 1px solid var(--vp-c-divider);
}

.home-stat:last-child { border-right: none; }

.home-stat-number {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #0f2d52;
  line-height: 1;
  margin-bottom: 6px;
}

.dark .home-stat-number { color: #7eb3e0; }

.home-stat-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

/* ── vs DevResults strip ─────────────────────────────────────── */
.home-vs {
  max-width: 900px;
  margin: 64px auto;
  padding: 0 24px;
}

.home-vs-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-align: center;
  margin-bottom: 32px;
  color: var(--vp-c-text-1);
}

.home-vs table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  font-size: 0.875rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.home-vs th {
  background: #0f2d52;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 14px 20px;
  text-align: left;
}

.home-vs th:first-child { background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); }

.home-vs td {
  padding: 12px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  vertical-align: middle;
}

.home-vs tr:last-child td { border-bottom: none; }
.home-vs tr:nth-child(even) td { background: var(--vp-c-bg-soft); }

.home-vs .yes { color: #16a34a; font-weight: 700; }
.home-vs .no  { color: #9ca3af; }
.home-vs .ltd { color: #d97706; font-weight: 600; }

@media (max-width: 640px) {
  .home-stats { flex-direction: column; }
  .home-stat { border-right: none; border-bottom: 1px solid var(--vp-c-divider); }
  .home-vs { display: none; }
}
</style>

<!-- Stats strip -->
<div class="home-stats">
  <div class="home-stat">
    <div class="home-stat-number">30+</div>
    <div class="home-stat-label">Video guides</div>
  </div>
  <div class="home-stat">
    <div class="home-stat-number">15</div>
    <div class="home-stat-label">Email notifications</div>
  </div>
  <div class="home-stat">
    <div class="home-stat-number">100%</div>
    <div class="home-stat-label">Open API</div>
  </div>
  <div class="home-stat">
    <div class="home-stat-number">1</div>
    <div class="home-stat-label">Source of truth</div>
  </div>
</div>

<!-- vs DevResults -->
<div class="home-vs">
  <div class="home-vs-title">Why teams switch from DevResults</div>
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>DevResults</th>
        <th>ImpactMEL</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Custom date-range reports</td>
        <td class="ltd">Limited</td>
        <td class="yes">✓ Free-form + period-aware</td>
      </tr>
      <tr>
        <td>True binary PDF export</td>
        <td class="no">Print dialog only</td>
        <td class="yes">✓ Binary PDF</td>
      </tr>
      <tr>
        <td>Public shareable report link</td>
        <td class="ltd">Paid tier only</td>
        <td class="yes">✓ Built-in, always free</td>
      </tr>
      <tr>
        <td>Dynamic forms with conditional logic</td>
        <td class="no">Not available</td>
        <td class="yes">✓ Full form builder</td>
      </tr>
      <tr>
        <td>Self-hosted option</td>
        <td class="no">SaaS only</td>
        <td class="yes">✓ Deploy anywhere</td>
      </tr>
      <tr>
        <td>Open REST API + Swagger</td>
        <td class="ltd">Limited</td>
        <td class="yes">✓ Full API + docs</td>
      </tr>
      <tr>
        <td>Google OAuth login</td>
        <td class="yes">✓</td>
        <td class="yes">✓</td>
      </tr>
    </tbody>
  </table>
</div>
