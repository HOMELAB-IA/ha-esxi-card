import { describe, it, expect } from "vitest";
import { buildVmEntityIds } from "../esxi-vm-card.js";

describe("buildVmEntityIds", () => {
  const ids = buildVmEntityIds("nas_dc_2025");

  it("cpuPct", () => expect(ids.cpuPct).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_cpu_use_pct"));
  it("cpuCount", () => expect(ids.cpuCount).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_cpu_count"));
  it("memUsed", () => expect(ids.memUsed).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_memory_used_mb"));
  it("memAlloc", () => expect(ids.memAlloc).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_memory_allocated_mb"));
  it("diskUsed", () => expect(ids.diskUsed).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_used_space_gb"));
  it("snapshots", () => expect(ids.snapshots).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_snapshots"));
  it("state", () => expect(ids.state).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_state"));
  it("guestOs", () => expect(ids.guestOs).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_guest_os"));
  it("guestIp", () => expect(ids.guestIp).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_guest_ip"));
  it("hostName", () => expect(ids.hostName).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_host_name"));
  it("toolsStatus", () => expect(ids.toolsStatus).toBe("sensor.vm_nas_dc_2025_nas_dc_2025_tools_status"));
  it("createSnapshot", () =>
    expect(ids.createSnapshot).toBe("button.vm_nas_dc_2025_esxi_create_snapshot_nas_dc_2025"));
  it("reboot", () => expect(ids.reboot).toBe("button.vm_nas_dc_2025_esxi_reboot_nas_dc_2025"));
  it("powerSwitch", () => expect(ids.powerSwitch).toBe("switch.vm_nas_dc_2025_esxi_vm_nas_dc_2025"));
});
