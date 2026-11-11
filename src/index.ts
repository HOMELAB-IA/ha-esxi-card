import "./esxi-host-card.js";
import "./esxi-vm-card.js";

if (typeof window !== "undefined") {
  const w = window as any;
  w.customCards = w.customCards || [];
  w.customCards.push(
    {
      type: "esxi-host-card",
      name: "ESXi Host Card",
      description: "Carte de monitoring pour un hôte ESXi",
      preview: false,
      documentationURL: "https://github.com/HOMELAB-IA/ha-esxi-card",
    },
    {
      type: "esxi-vm-card",
      name: "ESXi VM Card",
      description: "Carte de monitoring pour une machine virtuelle ESXi",
      preview: false,
      documentationURL: "https://github.com/HOMELAB-IA/ha-esxi-card",
    }
  );
  console.info(
    "%c ESXi Card %c v0.1.0 ",
    "background:#1c1c1c;color:#03a9f4;font-weight:600",
    "background:#03a9f4;color:#fff"
  );
}
