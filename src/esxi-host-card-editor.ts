import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { EsxiHostCardConfig, Hass } from './types.js';

const SCHEMA = [
  { name: 'host_id', selector: { text: {} } },
];

const LABELS: Record<string, string> = {
  host_id: "Identifiant de l'hôte ESXi Stats",
};

const HELPERS: Record<string, string> = {
  host_id:
    "Hostname saisi lors de la config de l'intégration. Visible dans sensor.esxi_host_<host_id>_cpu_usage.",
};

export class EsxiHostCardEditor extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private _config?: EsxiHostCardConfig;

  setConfig(config: EsxiHostCardConfig) {
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
  customElements.define('esxi-host-card-editor', EsxiHostCardEditor);
}
