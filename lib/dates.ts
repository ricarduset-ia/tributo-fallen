// São Paulo is UTC-3 year-round (Brazil abolished DST in 2019).
// Both anchor dates are midnight SP local time.
export const CAREER_START_DATE = new Date("2002-12-31T00:00:00-03:00");
export const RETIREMENT_DATE = new Date("2026-12-20T00:00:00-03:00");

const SP_OFFSET_MS = 3 * 60 * 60 * 1000;
const MS_PER_DAY = 86_400_000;

/** Epoch-day index for a date as seen in São Paulo (calendar-date resolution). */
function spCalendarDay(d: Date): number {
  return Math.floor((d.getTime() - SP_OFFSET_MS) / MS_PER_DAY);
}

/**
 * Integer calendar-day difference between two dates in São Paulo time.
 * Does NOT depend on time-of-day: e.g. any moment on 2026-04-21 SP vs any moment
 * on 2002-12-31 SP yields the same integer diff (8512).
 */
export function daysBetween(a: Date, b: Date): number {
  return Math.abs(spCalendarDay(a) - spCalendarDay(b));
}

export type DurationParts = { days: number; hours: number; minutes: number; seconds: number };

/**
 * Split a remaining duration into days/hours/min/sec using São Paulo calendar semantics:
 *   - `days` = number of SP calendar days from today (inclusive) until the target day.
 *     It decrements by 1 only when SP midnight is crossed, regardless of time of day.
 *   - `hours/min/sec` = time remaining until the NEXT SP midnight (or until target, whichever is sooner).
 *
 * Example: on 2026-04-21 at any time in SP, retirement on 2026-12-20 shows `days: 243`.
 * On 2026-04-22 at any time in SP, it becomes `days: 242`.
 */
export function diffToParts(target: Date, from: Date = new Date()): DurationParts {
  const totalMs = target.getTime() - from.getTime();
  if (totalMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const todayMidnightSP_UTC = spCalendarDay(from) * MS_PER_DAY + SP_OFFSET_MS;
  const nextMidnightSP_UTC = todayMidnightSP_UTC + MS_PER_DAY;

  // If retirement happens today (in SP), days = 0 and time ticks down to target directly.
  const retirementIsToday = target.getTime() <= nextMidnightSP_UTC;
  const days = retirementIsToday
    ? 0
    : Math.ceil((target.getTime() - todayMidnightSP_UTC) / MS_PER_DAY);

  // Time until next SP midnight (capped so we never display "24:00:00" at the exact boundary).
  const msToNext = Math.min(nextMidnightSP_UTC - from.getTime(), totalMs, MS_PER_DAY - 1);
  const totalSec = Math.floor(msToNext / 1000);
  const hours = Math.floor(totalSec / 3600) % 24;
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  return { days, hours, minutes, seconds };
}
