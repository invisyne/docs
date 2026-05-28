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

- **Run Data Export** — Measurement data can be downloaded as a CSV file via a new run export.

- **New CSV Export Format** — All CSV exports (run export and timeframe export) use a unified wide-table format from version 1.1.0 onwards: one time column followed by one column per configured measurement data point. Two header rows — one with short names and one with the full data point path — allow unambiguous identification of identically named data points. The column separator is ";", the decimal separator is ".". The format is optimised for direct use in Excel. The timeframe export no longer splits output across multiple files — all data is written to a single file.

### Bug Fixes

None.

---

### Requirements

- Runs are only available on Crawlers running version 2.21 or later.

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

- **Measurement Data Export** — Configured measurement data points can be exported as CSV over a selectable timeframe. If the export timeframe exceeds the configurable maximum file duration, multiple files are created automatically. The CSV files use a custom format with time, signal, and value columns.

### Bug Fixes

- **Device Discovery on All Network Adapters** — Crawlers were not reliably discovered on systems with multiple network adapters. Discovery now runs stably on all available adapters without Windows Firewall conflicts.

---

### Requirements

| Requirement      | Details                                                                                                                           |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Operating System | Windows 10, 11                                                                                                                    |
| Network          | PC must be physically on the same network as the Edge device                                                                      |
| Compatibility    | Crawler version 2.18 or later required for the updater and full network configuration                                             |
