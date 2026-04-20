import { describe, it, expect } from "vitest";
import { daysBetween, diffToParts, RETIREMENT_DATE, CAREER_START_DATE } from "./dates";

describe("dates", () => {
  it("computes integer days between two dates", () => {
    expect(daysBetween(new Date("2026-04-17"), new Date("2002-12-31"))).toBe(8508);
  });

  it("returns the exact retirement date", () => {
    expect(RETIREMENT_DATE.toISOString().slice(0, 10)).toBe("2026-12-20");
  });

  it("returns the exact career-start date", () => {
    expect(CAREER_START_DATE.toISOString().slice(0, 10)).toBe("2002-12-31");
  });

  it("diffToParts breaks a duration into days/hours/min/sec", () => {
    const now = new Date("2026-12-19T23:00:00Z");
    const parts = diffToParts(RETIREMENT_DATE, now);
    expect(parts.days).toBe(0);
    expect(parts.hours).toBe(1);
    expect(parts.minutes).toBe(0);
    expect(parts.seconds).toBe(0);
  });

  it("diffToParts returns zeros when target is past", () => {
    const parts = diffToParts(new Date("2020-01-01"), new Date("2026-01-01"));
    expect(parts).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
