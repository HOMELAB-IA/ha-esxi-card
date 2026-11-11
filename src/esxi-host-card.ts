import { LitElement, html, svg, nothing, css } from "lit";
import { property, state } from "lit/decorators.js";
import type { Hass, EsxiHostCardConfig, EsxiHostEntityIds } from "./types.js";
import { rawPct, gaugeColor, formatUptime, getState, getFloat } from "./utils.js";

export function buildHostEntityIds(hostId: string): EsxiHostEntityIds {
  const sp = `sensor.esxi_host_${hostId}_${hostId}_`;
  return {
    cpuUsage: `${sp}cpuusage_ghz`,
    cpuTotal: `${sp}cputotal_ghz`,
    memUsage: `${sp}memusage_gb`,
    memTotal: `${sp}memtotal_gb`,
    name: `${sp}name`,
    version: `${sp}version`,
    build: `${sp}build`,
    state: `${sp}state`,
    vms: `${sp}vms`,
    uptimeHours: `${sp}uptime_hours`,
    maintenanceMode: `${sp}maintenance_mode`,
    powerPolicy: `select.esxi_host_${hostId}_${hostId}_power_policy`,
    license: `sensor.esxi_host_${hostId}_esxi_license_${hostId}`,
    reboot: `button.esxi_host_${hostId}_esxi_reboot_${hostId}`,
  };
}

export class EsxiHostCard extends LitElement {
  @property({ attribute: false }) hass!: Hass;
  @state() private _config!: EsxiHostCardConfig;
  @state() private _expanded = false;
  @state() private _rebooting = false;

  static getStubConfig(): EsxiHostCardConfig {
    return { type: "custom:esxi-host-card", host_id: "esxi_host_name" };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("esxi-host-card-editor");
  }

  setConfig(config: EsxiHostCardConfig): void {
    if (!config.host_id) throw new Error("host_id requis");
    this._config = config;
  }

  getCardSize(): number {
    return this._expanded ? 6 : 4;
  }

  render() {
    if (!this.hass || !this._config) return nothing;
    const ids = buildHostEntityIds(this._config.host_id);

    const name = getState(this.hass, ids.name);
    const version = getState(this.hass, ids.version);
    const build = getState(this.hass, ids.build);
    const hostState = getState(this.hass, ids.state);

    const cpuUsed = getFloat(this.hass, ids.cpuUsage);
    const cpuTotal = getFloat(this.hass, ids.cpuTotal);
    const cpuPct = rawPct(cpuUsed, cpuTotal);

    const memUsed = getFloat(this.hass, ids.memUsage);
    const memTotal = getFloat(this.hass, ids.memTotal);
    const memPct = rawPct(memUsed, memTotal);

    const vms = getState(this.hass, ids.vms);
    const uptimeHours = getFloat(this.hass, ids.uptimeHours);
    const maintenance = getState(this.hass, ids.maintenanceMode);
    const powerPolicy = getState(this.hass, ids.powerPolicy);

    return html`
      <div class="card">
        <div class="header" @click=${this._toggle}>
          <div class="icon-block" style="background:rgba(3,169,244,.14)">
            <ha-icon icon="mdi:server-network" style="color:#03a9f4;--mdc-icon-size:24px"></ha-icon>
          </div>
          <div class="title-block">
            <div class="host-name">${name}</div>
            <div class="host-sub">${version} · build ${build}</div>
          </div>
          <div class="status">
            <span class="dot" style="background:${hostState === "poweredOn" ? "#4caf50" : "#6f6f6f"}"></span>
            ${hostState}
          </div>
          <ha-icon
            icon=${this._expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
            class="chevron"
          ></ha-icon>
        </div>

        <div class="body-grid">
          <div class="gauge-wrap">
            ${this._arcGauge(148, 13, cpuPct)}
            <div class="gauge-labels">
              <div class="gauge-pct">
                ${cpuPct}<span class="gauge-unit">%</span>
              </div>
              <div class="gauge-name">CPU</div>
              <div class="gauge-sub">
                ${isNaN(cpuUsed) ? "—" : cpuUsed} / ${isNaN(cpuTotal) ? "—" : cpuTotal} GHz
              </div>
            </div>
          </div>

          <div class="side">
            <div class="mem-row">
              <div class="donut-wrap">
                ${this._donut(54, 6, memPct)}
                <span class="donut-pct">${memPct}</span>
              </div>
              <div>
                <div class="mem-label">Mémoire</div>
                <div class="mem-sub">
                  ${isNaN(memUsed) ? "—" : memUsed} / ${isNaN(memTotal) ? "—" : memTotal} Go
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="stats-row">
              <div>
                <div class="stat-label">VMs</div>
                <div class="stat-value">${vms}</div>
              </div>
              <div>
                <div class="stat-label">Uptime</div>
                <div class="stat-value">${formatUptime(uptimeHours)}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bar">
          <span class="footer-item">
            <ha-icon icon="mdi:power-plug" style="--mdc-icon-size:15px"></ha-icon>${hostState}
          </span>
          <span class="footer-item">
            <ha-icon icon="mdi:wrench" style="--mdc-icon-size:15px"></ha-icon>Maint.
            ${maintenance}
          </span>
          <span class="footer-item">
            <ha-icon icon="mdi:speedometer" style="--mdc-icon-size:15px"></ha-icon>${powerPolicy}
          </span>
        </div>

        ${this._expanded ? this._renderDetails(ids) : nothing}
      </div>
    `;
  }

  private _renderDetails(ids: EsxiHostEntityIds) {
    const rows = [
      { icon: "mdi:tag-outline", label: "Version", id: ids.version },
      { icon: "mdi:pound", label: "Build", id: ids.build },
      { icon: "mdi:power-plug", label: "État", id: ids.state },
      {
        icon: "mdi:clock-outline",
        label: "Uptime",
        id: ids.uptimeHours,
        fmt: (v: string) => `${parseFloat(v).toFixed(1)} Hours`,
      },
      { icon: "mdi:monitor-multiple", label: "Machines virtuelles", id: ids.vms },
      { icon: "mdi:speedometer", label: "Power policy", id: ids.powerPolicy },
      { icon: "mdi:wrench", label: "Mode maintenance", id: ids.maintenanceMode },
      { icon: "mdi:certificate", label: "Licence ESXi", id: ids.license },
    ];

    return html`
      <div class="details">
        ${rows.map(
          (r) => html`
            <div class="detail-row">
              <ha-icon icon="${r.icon}" style="--mdc-icon-size:18px;color:#6f6f6f"></ha-icon>
              <span class="detail-label">${r.label}</span>
              <span class="detail-value">
                ${r.fmt
                  ? r.fmt(getState(this.hass, r.id))
                  : getState(this.hass, r.id)}
              </span>
            </div>
          `
        )}
        <div class="detail-row">
          <ha-icon icon="mdi:restart" style="--mdc-icon-size:18px;color:#6f6f6f"></ha-icon>
          <span class="detail-label">Redémarrer l'hôte</span>
          <button
            class="action-link"
            @click=${() => this._reboot(ids.reboot)}
            ?disabled=${this._rebooting}
          >
            ${this._rebooting ? "En cours…" : "Appuyer"}
          </button>
        </div>
      </div>
    `;
  }

  private _arcGauge(size: number, strokeW: number, pct: number) {
    const r = (size - strokeW) / 2;
    const c = 2 * Math.PI * r;
    const arc = (270 / 360) * c;
    const off = arc * (1 - pct / 100);
    const mid = size / 2;
    const col = gaugeColor(pct);
    return svg`
      <svg width="${size}" height="${size}" style="display:block">
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="rgba(255,255,255,.085)" stroke-width="${strokeW}"
          stroke-dasharray="${arc} ${c}" stroke-linecap="round"
          transform="rotate(135 ${mid} ${mid})"/>
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="${col}" stroke-width="${strokeW}"
          stroke-dasharray="${arc} ${c}" stroke-dashoffset="${off}"
          stroke-linecap="round" transform="rotate(135 ${mid} ${mid})"/>
      </svg>`;
  }

  private _donut(size: number, strokeW: number, pct: number) {
    const r = (size - strokeW) / 2;
    const c = 2 * Math.PI * r;
    const off = c * (1 - pct / 100);
    const mid = size / 2;
    const col = gaugeColor(pct);
    return svg`
      <svg width="${size}" height="${size}" style="display:block">
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="rgba(255,255,255,.085)" stroke-width="${strokeW}"/>
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="${col}" stroke-width="${strokeW}"
          stroke-dasharray="${c}" stroke-dashoffset="${off}"
          stroke-linecap="round" transform="rotate(-90 ${mid} ${mid})"/>
      </svg>`;
  }

  private _toggle() {
    this._expanded = !this._expanded;
  }

  private async _reboot(entityId: string) {
    this._rebooting = true;
    await this.hass.callService("button", "press", { entity_id: entityId });
    setTimeout(() => {
      this._rebooting = false;
    }, 3000);
  }

  static styles = css`
    :host {
      display: block;
      container-type: inline-size;
    }
    .card {
      background: #1c1c1c;
      border-radius: 14px;
      padding: 18px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      margin-bottom: 16px;
    }
    .icon-block {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title-block {
      flex: 1;
      min-width: 0;
    }
    .host-name {
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .host-sub {
      font-size: 12.5px;
      color: #9b9b9b;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: #9b9b9b;
      white-space: nowrap;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .chevron {
      color: #9b9b9b;
      flex-shrink: 0;
    }
    .body-grid {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 16px 18px;
      align-items: center;
    }
    .gauge-wrap {
      position: relative;
      width: 148px;
      height: 148px;
    }
    .gauge-labels {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .gauge-pct {
      font-size: 32px;
      font-weight: 500;
      color: #fff;
      line-height: 1;
    }
    .gauge-unit {
      font-size: 17px;
      font-weight: 400;
    }
    .gauge-name {
      font-size: 10.5px;
      color: #9b9b9b;
      letter-spacing: 0.06em;
      margin-top: 3px;
    }
    .gauge-sub {
      font-size: 10.5px;
      color: #6f6f6f;
      margin-top: 3px;
    }
    .side {
      display: flex;
      flex-direction: column;
      gap: 13px;
    }
    .mem-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .donut-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .donut-pct {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 500;
      color: #fff;
      pointer-events: none;
    }
    .mem-label {
      font-size: 13px;
      color: #e1e1e1;
      font-weight: 500;
    }
    .mem-sub {
      font-size: 11.5px;
      color: #9b9b9b;
      margin-top: 2px;
    }
    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.07);
    }
    .stats-row {
      display: flex;
      gap: 8px;
    }
    .stats-row > div {
      flex: 1;
    }
    .stat-label {
      font-size: 11px;
      color: #9b9b9b;
    }
    .stat-value {
      font-size: 15px;
      font-weight: 500;
      color: #fff;
    }
    .footer-bar {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 12px;
      color: #9b9b9b;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      padding-top: 14px;
      margin-top: 16px;
    }
    .footer-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .details {
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      margin-top: 14px;
      padding-top: 10px;
    }
    .detail-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      font-size: 13px;
    }
    .detail-label {
      flex: 1;
      color: #e1e1e1;
    }
    .detail-value {
      color: #9b9b9b;
    }
    .action-link {
      background: none;
      border: none;
      color: #03a9f4;
      cursor: pointer;
      font-size: 13px;
      padding: 0;
    }
    .action-link:disabled {
      color: #6f6f6f;
      cursor: default;
    }
    @container (max-width: 280px) {
      .body-grid {
        grid-template-columns: 1fr;
      }
      .gauge-wrap {
        margin: 0 auto;
      }
    }
  `;
}

if (typeof customElements !== "undefined") {
  customElements.define("esxi-host-card", EsxiHostCard);
}
