export type ProfileJSON = {
  id: string; nickname: string; name: string; age: number;
  nationality: string; rating: string; current_team: string | null;
  current_team_url: string | null; image_url: string; url: string;
  social_media: string[];
};

export type YearMapJSON = {
  source: string; player_id: string;
  years: Record<string, Record<string, Record<string, number | string | null>>>;
};

export type PerYearJSON = {
  source: string;
  years: Record<string, Record<string, number | string | null>>;
};

export type WeaponsJSON = {
  source: string;
  weapons: { rank: number; weapon: string; kills: number }[];
};

export type StatsSidesJSON = {
  source: string;
  metrics: Record<string, { combined: number | null; t_side: number | null; ct_side: number | null }>;
};

export type TrophiesJSON = {
  id: string; trophy_count: number;
  trophies: { tournament_id: string | null; tournament_name: string; tournament_url: string; tournament_img_url: string }[];
};

export type TeamAchievementsJSON = {
  id: string; achievement_count: number;
  achievements: {
    placement: string;
    team: { id: string; name: string };
    tournament: { id: string; name: string };
    player_stats_url: string;
  }[];
};

export type PersonalAchievementsJSON = {
  id: string;
  personal_achievements: {
    major_winner_count: string | null;
    major_mvp_count: string | null;
    mvp_winner_count: string | null;
    evp_count: number | null;
    top_20_count: number | null;
    mvp_winner: string[];
    evp_at: string[];
    top_20: { placement: string; year: string; article: string }[];
  };
};

export type TeamsTimelineJSON = {
  source: string; total_periods: number;
  timeline: {
    start: string; end: string | null; team: string;
    team_url: string | null; role_note: string | null; raw_date: string;
  }[];
};

export type LiquipediaResultsJSON = {
  source: string; total_results: number; earliest_date: string; latest_date: string;
  results_by_game: Record<string, number>;
  results: {
    date: string; place: string; tier: string; type: string; game: string;
    tournament: { name: string | null; url: string | null };
    team: { name: string | null; url: string | null; logo: string | null };
    score: string; opponent: string; prize_amount: string | null;
  }[];
};

export type IndividualTotalsJSON = {
  source: string;
  totals: Record<string, number | string | null>;
};
