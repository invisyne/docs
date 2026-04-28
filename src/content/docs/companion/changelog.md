---
title: Changelog
description: Release notes for the Invisyne Companion.
---

## 1.1.0

*2026-04-16*

### Highlights

> Version 1.1.0 adds a run data export to Companion: measurement data can be downloaded as a CSV file over a defined time period.

---

### New Features

- **Run Data Export** — Measurement data can be downloaded as a CSV file via a new run export. For time intervals exceeding 8 hours, a notice is displayed as the file size and export duration may increase accordingly. The full signal path is included in the filename to avoid duplicates.

### Bug Fixes

None.

---

### System Requirements

| Requirement    | Details                                                                 |
|----------------|-------------------------------------------------------------------------|
| Operating System | Windows                                                               |
| Network        | PC must be on the same local network (LAN) as the Edge device           |
| Compatibility  | Invisyne Edge version 2.21 or later                                     |

---

## 1.0.2

*2026-03-27*

### Highlights

> First release of Invisyne Companion — a Windows desktop application for local management of Invisyne Edge devices on the network.
> Devices on the same local network are automatically discovered and displayed in a unified device list.

---

### New Features

- **Device Discovery** — Automatic search and listing of all Invisyne Edge devices on the same local network. Devices can be found and identified without manual IP entry.

- **Local Management** — Network parameters (IP address, DNS, gateway) can be set directly. Live status and technical device data are accessible; direct navigation to the device's WebUI is available.

- **Firmware & Software Updates** — Firmware and software updates can be installed directly on Edge devices.

- **Data Backup & Export** — Device data (configurations, logs) can be backed up and exported as CSV.

### Bug Fixes

- **Device Discovery on All Network Adapters** — Crawlers were not reliably discovered on systems with multiple network adapters. Discovery now runs stably on all available adapters without Windows Firewall conflicts.

---

### System Requirements

| Requirement    | Details                                                                 |
|----------------|-------------------------------------------------------------------------|
| Operating System | Windows                                                               |
| Network        | PC must be on the same local network (LAN) as the Edge device           |
| Compatibility  | Invisyne Edge version 2.19 or later                                     |
