#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../../hltv-api/data");
const DST = resolve(__dirname, "../public/data");

if (!existsSync(SRC)) {
  console.log(`[sync-data] Source not found: ${SRC} — skipping (data already in public/data)`);
  process.exit(0);
}

mkdirSync(DST, { recursive: true });

const wanted = [
  "fallen_profile.json",
  "fallen_stats.json",
  "fallen_stats_sides.json",
  "fallen_individual_totals.json",
  "fallen_career_stats.json",
  "fallen_weapons.json",
  "fallen_per_year.json",
  "fallen_per_map.json",
  "fallen_year_map.json",
  "fallen_trophies.json",
  "fallen_team_achievements.json",
  "fallen_personal_achievements.json",
  "fallen_teams_timeline.json",
  "fallen_liquipedia_results.json",
  "fallen_matches.json",
];

let copied = 0;
for (const name of wanted) {
  const src = join(SRC, name);
  if (!existsSync(src)) { console.warn(`[sync-data] SKIP ${name}`); continue; }
  cpSync(src, join(DST, name));
  copied++;
}
console.log(`[sync-data] copied ${copied}/${wanted.length} files to ${DST}`);
