import fs from "node:fs/promises";
import path from "node:path";
import type {
  ProfileJSON, YearMapJSON, PerYearJSON, WeaponsJSON, StatsSidesJSON,
  TrophiesJSON, TeamAchievementsJSON, PersonalAchievementsJSON,
  TeamsTimelineJSON, LiquipediaResultsJSON, IndividualTotalsJSON,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "public", "data");

async function load<T>(file: string): Promise<T> {
  const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

export const getProfile = () => load<ProfileJSON>("fallen_profile.json");
export const getYearMap = () => load<YearMapJSON>("fallen_year_map.json");
export const getPerYear = () => load<PerYearJSON>("fallen_per_year.json");
export const getWeapons = () => load<WeaponsJSON>("fallen_weapons.json");
export const getStatsSides = () => load<StatsSidesJSON>("fallen_stats_sides.json");
export const getTrophies = () => load<TrophiesJSON>("fallen_trophies.json");
export const getTeamAchievements = () => load<TeamAchievementsJSON>("fallen_team_achievements.json");
export const getPersonalAchievements = () => load<PersonalAchievementsJSON>("fallen_personal_achievements.json");
export const getTeamsTimeline = () => load<TeamsTimelineJSON>("fallen_teams_timeline.json");
export const getLiquipediaResults = () => load<LiquipediaResultsJSON>("fallen_liquipedia_results.json");
export const getIndividualTotals = () => load<IndividualTotalsJSON>("fallen_individual_totals.json");

export const MAPS = [
  "de_ancient","de_anubis","de_cache","de_cobblestone","de_dust2","de_inferno",
  "de_mirage","de_nuke","de_overpass","de_season","de_train","de_tuscan","de_vertigo",
] as const;
export type MapId = (typeof MAPS)[number];

export const YEARS = Array.from({ length: 15 }, (_, i) => String(2012 + i));
