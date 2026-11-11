import type { Hass } from "./types.js";

export function rawPct(used: number, total: number): number {
  if (isNaN(used) || isNaN(total) || total === 0) return 0;
  return Math.round((used / total) * 100);
}

export function clampPct(pct: number): number {
  return Math.min(100, Math.max(0, pct));
}

export function gaugeColor(pct: number): string {
  if (pct >= 85) return "#f44336";
  if (pct >= 60) return "#ff9800";
  return "#03a9f4";
}

export function formatUptime(hours: number): string {
  if (isNaN(hours)) return "—";
  const days = Math.floor(hours / 24);
  if (days >= 1) return `${days} j`;
  return `${Math.round(hours)} h`;
}

export function getState(hass: Hass, entityId: string, fallback = "—"): string {
  return hass.states[entityId]?.state ?? fallback;
}

export function getFloat(hass: Hass, entityId: string): number {
  return parseFloat(hass.states[entityId]?.state ?? "NaN");
}
