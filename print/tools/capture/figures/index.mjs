import { ROLES } from '../lib/browser.mjs'
import overview from './01-overview.mjs'
import programmes from './02-programmes.mjs'
import data from './03-data.mjs'
import reporting from './04-reporting.mjs'
import analysis from './05-analysis.mjs'

const groups = [overview, programmes, data, reporting, analysis]

export const RECIPES = groups.flat()

const seen = new Set()
for (const r of RECIPES) {
  if (!r.key) throw new Error('a recipe has no key')
  if (seen.has(r.key)) throw new Error(`duplicate figure key '${r.key}'`)
  seen.add(r.key)
  if (!ROLES[r.as]) throw new Error(`figure '${r.key}' wants role '${r.as}', which does not exist`)
  if (!r.url) throw new Error(`figure '${r.key}' has no url`)
  if (!r.chapter) throw new Error(`figure '${r.key}' has no chapter`)
}
