export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface Hass {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ): Promise<void>;
}

export interface EsxiHostCardConfig {
  type: string;
  host_id: string;
}

export interface EsxiVmCardConfig {
  type: string;
  vm_id: string;
  disk_capacity_gb?: number;
  esxi_console_url?: string;
}

export interface EsxiHostEntityIds {
  cpuUsage: string;
  cpuTotal: string;
  memUsage: string;
  memTotal: string;
  name: string;
  version: string;
  build: string;
  state: string;
  vms: string;
  uptimeHours: string;
  maintenanceMode: string;
  powerPolicy: string;
  license: string;
  reboot: string;
}

export interface EsxiVmEntityIds {
  cpuPct: string;
  cpuCount: string;
  memUsed: string;
  memAlloc: string;
  diskUsed: string;
  snapshots: string;
  name: string;
  guestOs: string;
  guestIp: string;
  state: string;
  uptimeHours: string;
  hostName: string;
  toolsStatus: string;
  createSnapshot: string;
  reboot: string;
  powerSwitch: string;
}
