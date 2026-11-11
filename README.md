# ha-esxi-card

![Banner](docs/banner.png)

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)
[![Release](https://img.shields.io/github/v/release/HOMELAB-IA/ha-esxi-card)](https://github.com/HOMELAB-IA/ha-esxi-card/releases)
[![CI](https://github.com/HOMELAB-IA/ha-esxi-card/actions/workflows/build.yml/badge.svg)](https://github.com/HOMELAB-IA/ha-esxi-card/actions)

Deux cartes Lovelace Home Assistant pour superviser un hôte ESXi et ses machines virtuelles.

> **Prérequis** : intégration [ESXi Stats](https://github.com/wxt9861/esxi_stats) installée via HACS.

## Cartes incluses

### `esxi-host-card`

Carte compacte + expandable pour un hôte ESXi. Affiche CPU (arc gauge 270°), mémoire (donut), nombre de VMs et uptime. Section détail repliable avec tous les attributs et bouton de redémarrage.

### `esxi-vm-card`

Carte compacte + expandable pour une machine virtuelle. Affiche CPU %, mémoire (donut), disque utilisé et snapshots. Section actions repliable : snapshot, démarrer, arrêter, redémarrer, console ESXi.

## Installation

### Via HACS (recommandé)

[![Ouvrir dans HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=HOMELAB-IA&repository=ha-esxi-card&category=plugin)

Ou manuellement :

1. Ouvrir HACS → **Frontend**
2. Cliquer les ⋮ → **Dépôts personnalisés**
3. Ajouter `https://github.com/HOMELAB-IA/ha-esxi-card` — catégorie **Dashboard**
4. Chercher **ESXi Card** et installer
5. Vider le cache du navigateur

### Installation manuelle

1. Télécharger [`esxi-card.js`](https://github.com/HOMELAB-IA/ha-esxi-card/releases/latest/download/esxi-card.js)
2. Copier dans `<config>/www/`
3. Dans HA → **Paramètres → Tableau de bord → Ressources**, ajouter `/local/esxi-card.js`
4. Vider le cache

## Configuration

### esxi-host-card

```yaml
type: custom:esxi-host-card
host_id: mon_hote   # nom de l'hôte tel que défini dans l'intégration ESXi Stats
```

> **Trouver le `host_id`** : dans HA → Paramètres → Intégrations → ESXi Stats → entités. Les capteurs sont nommés `sensor.esxi_<host_id>_cpu_usage`, `sensor.esxi_<host_id>_memory_used`, etc.

| Paramètre | Type | Requis | Description |
|---|---|---|---|
| `host_id` | `string` | ✅ | Identifiant de l'hôte dans ESXi Stats (correspond au `hostname` saisi lors de la configuration de l'intégration) |

### esxi-vm-card

```yaml
type: custom:esxi-vm-card
vm_id: ma_vm                  # identifiant de la VM dans ESXi Stats
disk_capacity_gb: 650         # optionnel — capacité disque totale en Go (défaut : 650)
esxi_console_url: https://ADRESSE_ESXI/ui   # optionnel — URL console ESXi
```

> **Trouver le `vm_id`** : les capteurs VM sont nommés `sensor.vm_<vm_id>_cpu_usage`, `sensor.vm_<vm_id>_memory_used`, etc. Le `vm_id` correspond au nom de la VM tel qu'il apparaît dans vCenter/ESXi.

| Paramètre | Type | Requis | Description |
|---|---|---|---|
| `vm_id` | `string` | ✅ | Identifiant de la VM dans ESXi Stats (nom de la VM dans vCenter, en minuscules et underscores) |
| `disk_capacity_gb` | `number` | ❌ | Capacité disque totale en Go (défaut : 650) |
| `esxi_console_url` | `string` | ❌ | URL de la console web ESXi — ex. `https://192.168.1.10/ui` ou `https://esxi.domaine.local/ui` |

## Dépendances

- [ESXi Stats](https://github.com/wxt9861/esxi_stats) — intégration HACS qui expose les entités `sensor.esxi_host_*` et `sensor.vm_*`
- Home Assistant ≥ 2024.1.0

## Licence

MIT
