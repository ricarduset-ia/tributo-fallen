export const CAREER_START_DATE = new Date("2002-12-31T00:00:00Z");
export const RETIREMENT_DATE = new Date("2026-12-20T00:00:00Z");

export function daysBetween(a: Date, b: Date): number {
  const ms = Math.abs(a.getTime() - b.getTime());
  return Math.round(ms / 86_400_000);
}

export type DurationParts = { days: number; hours: number; minutes: number; seconds: number };

export function diffToParts(target: Date, from: Date = new Date()): DurationParts {
  const ms = target.getTime() - from.getTime();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}
