export const MAPS = [
  "de_ancient","de_anubis","de_cache","de_cobblestone","de_dust2","de_inferno",
  "de_mirage","de_nuke","de_overpass","de_season","de_train","de_tuscan","de_vertigo",
] as const;
export type MapId = (typeof MAPS)[number];

export const YEARS = Array.from({ length: 15 }, (_, i) => String(2012 + i));
