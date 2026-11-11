import { LitElement, html, svg, nothing, css } from "lit";
import { property, state } from "lit/decorators.js";
import type { Hass, EsxiVmCardConfig, EsxiVmEntityIds } from "./types.js";
import { rawPct, gaugeColor, formatUptime, getState, getFloat } from "./utils.js";

export function buildVmEntityIds(vmId: string): EsxiVmEntityIds {
  const sp = `sensor.vm_${vmId}_${vmId}_`;
  return {
    cpuPct: `${sp}cpu_use_pct`,
    cpuCount: `${sp}cpu_count`,
    memUsed: `${sp}memory_used_mb`,
    memAlloc: `${sp}memory_allocated_mb`,
    diskUsed: `${sp}used_space_gb`,
    snapshots: `${sp}snapshots`,
    name: `${sp}name`,
    guestOs: `${sp}guest_os`,
    guestIp: `${sp}guest_ip`,
    state: `${sp}state`,
    uptimeHours: `${sp}uptime_hours`,
    hostName: `${sp}host_name`,
    toolsStatus: `${sp}tools_status`,
    createSnapshot: `button.vm_${vmId}_esxi_create_snapshot_${vmId}`,
    reboot: `button.vm_${vmId}_esxi_reboot_${vmId}`,
    powerSwitch: `switch.vm_${vmId}_esxi_vm_${vmId}`,
  };
}

export class EsxiVmCard extends LitElement {
  @property({ attribute: false }) hass!: Hass;
  @state() private _config!: EsxiVmCardConfig;
  @state() private _expanded = false;
  @state() private _busy: string | null = null;

  static getStubConfig(): EsxiVmCardConfig {
    return {
      type: "custom:esxi-vm-card",
      vm_id: "vm_name",
      disk_capacity_gb: 650,
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("esxi-vm-card-editor");
  }

  setConfig(config: EsxiVmCardConfig): void {
    if (!config.vm_id) throw new Error("vm_id requis");
    this._config = config;
  }

  getCardSize(): number {
    return this._expanded ? 7 : 4;
  }

  render() {
    if (!this.hass || !this._config) return nothing;
    const ids = buildVmEntityIds(this._config.vm_id);

    const name = getState(this.hass, ids.name);
    const guestOs = getState(this.hass, ids.guestOs);
    const guestIp = getState(this.hass, ids.guestIp);
    const vmState = getState(this.hass, ids.state);
    const isOn = vmState === "running";

    const cpuPct = Math.round(getFloat(this.hass, ids.cpuPct));
    const cpuCount = getState(this.hass, ids.cpuCount);

    const usedMb = getFloat(this.hass, ids.memUsed);
    const allocMb = getFloat(this.hass, ids.memAlloc);
    const memPct = rawPct(usedMb, allocMb);
    const usedGb = isNaN(usedMb) ? "—" : (usedMb / 1024).toFixed(1);
    const allocGb = isNaN(allocMb) ? "—" : Math.round(allocMb / 1024);

    const diskUsed = getFloat(this.hass, ids.diskUsed);
    const diskCap = this._config.disk_capacity_gb ?? 650;
    const diskPct = rawPct(diskUsed, diskCap);
    const diskColor = diskPct >= 85 ? "#f44336" : diskPct >= 70 ? "#ff9800" : "#9b9b9b";

    const snaps = parseInt(getState(this.hass, ids.snapshots, "0"));
    const snapColor = snaps > 0 ? "#ff9800" : "#fff";

    const uptimeHours = getFloat(this.hass, ids.uptimeHours);
    const hostName = getState(this.hass, ids.hostName).split(".")[0];
    const toolsStatus = getState(this.hass, ids.toolsStatus);

    const iconBg = isOn ? "rgba(76,175,80,.14)" : "rgba(255,255,255,.06)";
    const iconColor = isOn ? "#4caf50" : "#9b9b9b";
    const dotColor = isOn ? "#4caf50" : "#6f6f6f";
    const statusLabel = isOn ? "En marche" : "Arrêtée";

    return html`
      <div class="card">
        <div class="header" @click=${this._toggle}>
          <div class="icon-block" style="background:${iconBg}">
            <ha-icon icon="mdi:monitor" style="color:${iconColor};--mdc-icon-size:24px"></ha-icon>
          </div>
          <div class="title-block">
            <div class="host-name">${name}</div>
            <div class="host-sub">${guestOs}</div>
            <div class="host-ip">${guestIp}</div>
          </div>
          <div class="status">
            <span class="dot" style="background:${dotColor};box-shadow:0 0 8px ${dotColor}"></span>
            ${statusLabel}
          </div>
          <ha-icon
            icon=${this._expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
            class="chevron"
          ></ha-icon>
        </div>

        <div class="body-grid">
          <div class="gauge-wrap">
            ${this._arcGauge(148, 13, isNaN(cpuPct) ? 0 : cpuPct)}
            <div class="gauge-labels">
              <div class="gauge-pct">
                ${isNaN(cpuPct) ? "—" : cpuPct}<span class="gauge-unit">%</span>
              </div>
              <div class="gauge-name">CPU</div>
              <div class="gauge-sub">${cpuCount} vCPU</div>
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
                <div class="mem-sub">${usedGb} / ${allocGb} Go</div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="disk-snap-row">
              <div>
                <div class="stat-label">DISQUE</div>
                <div class="stat-value">
                  ${isNaN(diskUsed) ? "—" : diskUsed.toFixed(1)} Go
                </div>
                <div class="stat-sub" style="color:${diskColor}">${diskPct}% utilisé</div>
              </div>
              <div>
                <div class="stat-label">SNAPSHOTS</div>
                <div class="stat-value" style="color:${snapColor}">${snaps}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bar">
          <span class="footer-item">
            <ha-icon icon="mdi:clock-outline" style="--mdc-icon-size:15px"></ha-icon>
            ${formatUptime(uptimeHours)}
          </span>
          <span class="footer-item">
            <ha-icon icon="mdi:server-network" style="--mdc-icon-size:15px"></ha-icon>
            ${hostName}
          </span>
          <span class="footer-item">
            <ha-icon icon="mdi:check-circle" style="--mdc-icon-size:15px"></ha-icon>
            ${toolsStatus}
          </span>
        </div>

        ${this._expanded ? this._renderActions(ids) : nothing}
      </div>
    `;
  }

  private _renderActions(ids: EsxiVmEntityIds) {
    return html`
      <div class="actions">
        <button
          class="action-btn snapshot"
          @click=${() => this._press(ids.createSnapshot, "createSnapshot")}
          ?disabled=${this._busy === "createSnapshot"}
        >
          <ha-icon icon="mdi:camera-plus" style="--mdc-icon-size:20px"></ha-icon>
          ${this._busy === "createSnapshot" ? "En cours…" : "Créer un snapshot"}
        </button>

        <div class="action-row">
          <button
            class="action-btn start"
            @click=${() => this._switchOn(ids.powerSwitch)}
            ?disabled=${this._busy === "start"}
          >
            <ha-icon icon="mdi:play" style="--mdc-icon-size:20px"></ha-icon>
            Démarrer
          </button>
          <button
            class="action-btn stop"
            @click=${() => this._switchOff(ids.powerSwitch)}
            ?disabled=${this._busy === "stop"}
          >
            <ha-icon icon="mdi:power" style="--mdc-icon-size:20px"></ha-icon>
            Arrêter
          </button>
        </div>

        <button
          class="action-btn reboot"
          @click=${() => this._press(ids.reboot, "reboot")}
          ?disabled=${this._busy === "reboot"}
        >
          <ha-icon icon="mdi:restart" style="--mdc-icon-size:20px"></ha-icon>
          ${this._busy === "reboot" ? "En cours…" : "Redémarrer"}
        </button>

        ${this._config.esxi_console_url
          ? html`
              <button class="action-btn console" @click=${this._openConsole}>
                <ha-icon icon="mdi:open-in-new" style="--mdc-icon-size:20px"></ha-icon>
                Console ESXi
              </button>
            `
          : nothing}
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

  private async _press(entityId: string, key: string) {
    this._busy = key;
    await this.hass.callService("button", "press", { entity_id: entityId });
    setTimeout(() => {
      this._busy = null;
    }, 3000);
  }

  private async _switchOn(entityId: string) {
    this._busy = "start";
    await this.hass.callService("switch", "turn_on", { entity_id: entityId });
    setTimeout(() => {
      this._busy = null;
    }, 3000);
  }

  private async _switchOff(entityId: string) {
    this._busy = "stop";
    await this.hass.callService("switch", "turn_off", { entity_id: entityId });
    setTimeout(() => {
      this._busy = null;
    }, 3000);
  }

  private _openConsole() {
    if (this._config.esxi_console_url) {
      window.open(this._config.esxi_console_url, "_blank", "noopener");
    }
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .host-ip {
      font-size: 11.5px;
      color: #6f6f6f;
      font-family: monospace;
      margin-top: 1px;
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
    .disk-snap-row {
      display: flex;
      gap: 8px;
    }
    .disk-snap-row > div {
      flex: 1;
    }
    .stat-label {
      font-size: 11px;
      color: #9b9b9b;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .stat-value {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      margin-top: 3px;
    }
    .stat-sub {
      font-size: 11px;
      margin-top: 2px;
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
      white-space: nowrap;
    }
    .actions {
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      margin-top: 14px;
      padding-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .action-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .action-btn {
      border-radius: 10px;
      padding: 10px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      border: 1px solid;
      width: 100%;
    }
    .action-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .action-btn.snapshot {
      background: rgba(3, 169, 244, 0.12);
      border-color: rgba(3, 169, 244, 0.35);
      color: #03a9f4;
    }
    .action-btn.start {
      background: rgba(76, 175, 80, 0.12);
      border-color: rgba(76, 175, 80, 0.32);
      color: #4caf50;
    }
    .action-btn.stop {
      background: rgba(244, 67, 54, 0.1);
      border-color: rgba(244, 67, 54, 0.28);
      color: #f44336;
    }
    .action-btn.reboot {
      background: rgba(255, 152, 0, 0.1);
      border-color: rgba(255, 152, 0, 0.3);
      color: #ff9800;
    }
    .action-btn.console {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      color: #bdbdbd;
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
  customElements.define("esxi-vm-card", EsxiVmCard);
}
