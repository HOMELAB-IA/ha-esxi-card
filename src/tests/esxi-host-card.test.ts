import { describe, it, expect } from "vitest";
import { buildHostEntityIds } from "../esxi-host-card.js";

describe("buildHostEntityIds", () => {
  const ids = buildHostEntityIds("esxi_dell");

  it("cpuUsage", () => expect(ids.cpuUsage).toBe("sensor.esxi_host_esxi_dell_esxi_dell_cpuusage_ghz"));
  it("cpuTotal", () => expect(ids.cpuTotal).toBe("sensor.esxi_host_esxi_dell_esxi_dell_cputotal_ghz"));
  it("memUsage", () => expect(ids.memUsage).toBe("sensor.esxi_host_esxi_dell_esxi_dell_memusage_gb"));
  it("memTotal", () => expect(ids.memTotal).toBe("sensor.esxi_host_esxi_dell_esxi_dell_memtotal_gb"));
  it("name", () => expect(ids.name).toBe("sensor.esxi_host_esxi_dell_esxi_dell_name"));
  it("state", () => expect(ids.state).toBe("sensor.esxi_host_esxi_dell_esxi_dell_state"));
  it("vms", () => expect(ids.vms).toBe("sensor.esxi_host_esxi_dell_esxi_dell_vms"));
  it("uptimeHours", () => expect(ids.uptimeHours).toBe("sensor.esxi_host_esxi_dell_esxi_dell_uptime_hours"));
  it("maintenanceMode", () =>
    expect(ids.maintenanceMode).toBe("sensor.esxi_host_esxi_dell_esxi_dell_maintenance_mode"));
  it("powerPolicy", () =>
    expect(ids.powerPolicy).toBe("select.esxi_host_esxi_dell_esxi_dell_power_policy"));
  it("license (pattern différent)", () =>
    expect(ids.license).toBe("sensor.esxi_host_esxi_dell_esxi_license_esxi_dell"));
  it("reboot (pattern différent)", () =>
    expect(ids.reboot).toBe("button.esxi_host_esxi_dell_esxi_reboot_esxi_dell"));
});
