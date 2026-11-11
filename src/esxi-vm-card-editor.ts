import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { EsxiVmCardConfig, Hass } from './types.js';

const SCHEMA = [
  { name: 'vm_id', selector: { text: {} } },
  {
    name: 'disk_capacity_gb',
    selector: { number: { min: 10, max: 102400, step: 1, mode: 'box', unit_of_measurement: 'Go' } },
  },
  { name: 'esxi_console_url', selector: { text: { type: 'url' } } },
];

const LABELS: Record<string, string> = {
  vm_id: 'Identifiant de la VM ESXi Stats',
  disk_capacity_gb: 'Capacité disque totale (Go)',
  esxi_console_url: 'URL de la console web ESXi (optionnel)',
};

const HELPERS: Record<string, string> = {
  vm_id: 'Visible dans sensor.vm_<vm_id>_cpu_usage. Correspond au nom de la VM (minuscules, underscores).',
  disk_capacity_gb: 'Utilisé pour la jauge disque. Défaut : 650 Go.',
  esxi_console_url: "Ex : https://192.168.1.10/ui — ouvre la console dans le détail de la carte.",
};

export class EsxiVmCardEditor extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private _config?: EsxiVmCardConfig;

  setConfig(config: EsxiVmCardConfig) {
    this._config = config;
  }

  render() {
    if (!this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(s: { name: string }) => LABELS[s.name] ?? s.name}
        .computeHelper=${(s: { name: string }) => HELPERS[s.name] ?? ''}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: ev.detail.value },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

if (typeof customElements !== 'undefined') {
  customElements.define('esxi-vm-card-editor', EsxiVmCardEditor);
}
