import { describe, it, expect } from "vitest";
import { getProfile, getYearMap, getWeapons } from "./data";

describe("data loaders", () => {
  it("loads profile with expected fields", async () => {
    const p = await getProfile();
    expect(p.id).toBe("2023");
    expect(p.nickname).toBe("FalleN");
    expect(p.image_url).toContain("http");
  });

  it("loads year×map intersection with 15 years", async () => {
    const ym = await getYearMap();
    expect(Object.keys(ym.years)).toHaveLength(15);
    expect(ym.years["2016"]["de_dust2"]).toBeDefined();
  });

  it("loads weapons with AWP ranked 1", async () => {
    const w = await getWeapons();
    expect(w.weapons[0].weapon).toBe("awp");
    expect(w.weapons[0].kills).toBeGreaterThan(18000);
  });
});
