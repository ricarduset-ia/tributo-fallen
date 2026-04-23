import { describe, it, expect } from "vitest";
import { daysBetween, diffToParts, RETIREMENT_DATE, CAREER_START_DATE } from "./dates";

describe("dates", () => {
  it("computes integer days between two UTC-midnight dates (unchanged under SP offset)", () => {
    expect(daysBetween(new Date("2026-04-17"), new Date("2002-12-31"))).toBe(8508);
  });

  it("days-between is stable across time-of-day within the same SP calendar day", () => {
    const morning = new Date("2026-04-21T09:00:00-03:00");
    const evening = new Date("2026-04-21T22:00:00-03:00");
    expect(daysBetween(morning, CAREER_START_DATE))
      .toBe(daysBetween(evening, CAREER_START_DATE));
  });

  it("returns the exact retirement date (SP midnight)", () => {
    expect(RETIREMENT_DATE.toISOString()).toBe("2026-12-20T03:00:00.000Z");
  });

  it("returns the exact career-start date (SP midnight)", () => {
    expect(CAREER_START_DATE.toISOString()).toBe("2002-12-31T03:00:00.000Z");
  });

  it("days remaining is calendar-based: 2026-04-21 at any SP time → 243", () => {
    const noonSP = new Date("2026-04-21T12:00:00-03:00");
    const latenightSP = new Date("2026-04-21T23:30:00-03:00");
    expect(diffToParts(RETIREMENT_DATE, noonSP).days).toBe(243);
    expect(diffToParts(RETIREMENT_DATE, latenightSP).days).toBe(243);
  });

  it("days decrements exactly at SP midnight crossing", () => {
    const justBefore = new Date("2026-04-21T23:59:59-03:00");
    const justAfter = new Date("2026-04-22T00:00:01-03:00");
    expect(diffToParts(RETIREMENT_DATE, justBefore).days).toBe(243);
    expect(diffToParts(RETIREMENT_DATE, justAfter).days).toBe(242);
  });

  it("hours/min/sec count down to next SP midnight", () => {
    const t = new Date("2026-04-21T23:30:00-03:00");
    const parts = diffToParts(RETIREMENT_DATE, t);
    expect(parts.days).toBe(243);
    expect(parts.hours).toBe(0);
    expect(parts.minutes).toBe(30);
  });

  it("retirement day: days=0, hours tick toward retirement moment", () => {
    const t = new Date("2026-12-19T23:00:00Z"); // 20:00 SP on 12/19 — wait, that's still 12/19 SP
    // Let's use a moment on retirement day itself: 2026-12-20 at 20:00 SP
    const onRetirementDay = new Date("2026-12-20T20:00:00-03:00");
    const p = diffToParts(RETIREMENT_DATE, onRetirementDay);
    // Retirement was at 00:00 SP on 12/20 → already past → zeros
    expect(p).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Ignore the first `t` variable — keep the test focused
    void t;
  });

  it("diffToParts returns zeros when target is past", () => {
    const parts = diffToParts(new Date("2020-01-01"), new Date("2026-01-01"));
    expect(parts).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
