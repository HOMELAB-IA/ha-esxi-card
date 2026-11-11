import { describe, it, expect } from "vitest";
import { rawPct, clampPct, gaugeColor, formatUptime } from "../utils.js";

describe("rawPct", () => {
  it("retourne 0 si total=0", () => expect(rawPct(10, 0)).toBe(0));
  it("retourne 0 si NaN", () => expect(rawPct(NaN, 100)).toBe(0));
  it("calcule le pourcentage", () => expect(rawPct(50, 100)).toBe(50));
  it("peut dépasser 100 (over-provisionné)", () => expect(rawPct(8.1 * 1024, 8 * 1024)).toBe(101));
  it("arrondit", () => expect(rawPct(1, 3)).toBe(33));
});

describe("clampPct", () => {
  it("clamp à 100", () => expect(clampPct(101)).toBe(100));
  it("clamp à 0", () => expect(clampPct(-5)).toBe(0));
  it("laisse 50 inchangé", () => expect(clampPct(50)).toBe(50));
});

describe("gaugeColor", () => {
  it("bleu < 60", () => expect(gaugeColor(50)).toBe("#03a9f4"));
  it("orange >= 60", () => expect(gaugeColor(60)).toBe("#ff9800"));
  it("orange 70", () => expect(gaugeColor(70)).toBe("#ff9800"));
  it("rouge >= 85", () => expect(gaugeColor(85)).toBe("#f44336"));
  it("rouge 100", () => expect(gaugeColor(100)).toBe("#f44336"));
});

describe("formatUptime", () => {
  it("affiche jours", () => expect(formatUptime(195 * 24)).toBe("195 j"));
  it("affiche heures < 1 jour", () => expect(formatUptime(5)).toBe("5 h"));
  it("retourne — pour NaN", () => expect(formatUptime(NaN)).toBe("—"));
  it("1 jour exact", () => expect(formatUptime(24)).toBe("1 j"));
});
