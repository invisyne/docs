---
title: Changelog
description: Release notes for the Invisyne Edge.
---

## 2.21.0

*2026-04-16*

### Highlights

> Version 2.21.0 brings a complete run data export: measurement data can be downloaded as CSV via configurable runs. A new Gateway reconnect mechanism additionally enables manual restoration of connections directly from the user interface.

---

### New Features

- **Run Export** — Runs can be downloaded as a CSV file. The interface shows all completed runs and provides direct download access to the exported data.
- **Run Configuration** — Runs can be created and configured via the interface. Supported trigger types: alarm trigger (with pre and post time), external trigger (start & stop), time trigger (start & stop), and interval trigger. Existing configurations can be activated and deactivated.
- **Variable Path in Run Configuration** — Run variables now support an additional parameter for the full group path to the variable (e.g. `Device3/Group2/Variable12`).
- **Gateway Endpoint Reconnect** — When connection problems occur, the connection of a Gateway endpoint can be manually forced via the interface. The broker configuration is updated before the reconnect. Connection status and endpoint details are directly viewable.
- **Gateway Insights: Extended System Data** — The system now transmits additional device information to the Hub: device ID, software version, MAC addresses, manufacturer, serial number, and the available storage space of the database partition.

### Bug Fixes

- **Run without Variables** — A run without defined process variables caused an error during CSV export. The run is now no longer activated if no variables are stored.
- **Email Notifications for Alarms** — Email notifications for Grafana alarms could no longer be sent after version 2.18, as the underlying system service was no longer available. The device name is now correctly retrieved via the new OS service.
- **Run Interval Initialisation** — Interval-type runs were not correctly initialised when created: the start time was not set and the first data record was skipped.

---

### Technical Appendix

#### Component Versions

| Group    | Component           | Version   | Notes |
|----------|---------------------|-----------|-------|
| Web UI   | Advanced            | 4.10.13   |       |
| App      | Batching            | 1.0.0     | New   |
| Core     | Notification Hub    | 1.1.0     |       |
| Gateway  | Endpoint AWS        | 1.5.2     |       |
| Gateway  | Dispatcher Insights | 1.11.7    |       |
| System   | Proxy               | 1.20-2.21 |       |
| Host     | Docker Config       | 1.0.2     |       |

#### Breaking Changes

- **Restart required** — This update automatically triggers a device restart. When updating from version 2.20, the system also validates that the required DEB Crawler Packs are installed.

---

## 2.20.0

*2026-03-03*

> **Note: System restart required**
> This update requires a system restart. The restart can be performed at any time, but must occur before a further update is applied.
>
> The update includes a pre-installation validation of the installed packages (prerequisite: version 2.19). If the validation fails, the update process is aborted — no changes are made.

---

### Highlights

> Version 2.20.0 introduces the OPC UA connector: connection to OPC-UA-capable devices with secured connection, variable explorer, and status display. Several bug fixes in the OPC and Gateway areas improve stability.

---

### New Features

- **OPC UA Connector** — Connection to OPC-UA-capable devices is now possible. The connector supports gradual exploration of the device variable tree (no pre-loading of the full structure), secured connections with password authentication, and all common data and access types (Bool, String, DateTime, Array, etc.).
- **OPC Quick Insights** — Connection status, error messages, and warnings from the OPC connector are displayed in the Quick Insights view, analogous to the Simatic connector.
- **OPC Performance Test** — The performance test button for the OPC connector is now active and delivers valid test results.
- **Device ID (Crawler ID)** — Each device receives a unique UUID, which is provided via the system info route. This ID enables reliable assignment of the device in Hub and Companion.
- **Updater: Subversions** — Update bundles can now set a subversion without incrementing the main version. This enables individual components or special features to be retrofitted.

### Bug Fixes

- **OPC: Password Change on Device** — A password change on the OPC device was ignored after the first time and only took effect after a container restart. The cause was a faulty deduplication of configuration messages.
- **OPC: Reconfiguration of Variables** — Changes to variables (e.g. interval, activation) were not applied by the connector. Configuration events are now processed correctly.
- **OPC: Incorrect Performance Test Result** — The performance test did not return a valid result when the sampling rate could not be achieved. The result is now correctly reported as failed.
- **OPC Quick Insights: Unclear Messages** — Status messages for connection and password issues were partially unclear. The messages have been revised and aligned with the format of the Simatic connector.
- **Gateway: Send Switch Required Restart** — The switch in the MX Dispatcher area for controlling the send process only took effect after a device restart. The change is now applied immediately.

---

### Technical Appendix

#### Component Versions

| Component                      | Version          | Notes |
|--------------------------------|------------------|-------|
| OS Image                       |                  |       |
| Web UI Advanced                | 4.9.20           |       |
| Web UI API                     | 1.24.1           |       |
| Source Control (SourceConfig)  | 1.3.1            |       |
| Gateway Manager                | 1.10.0           |       |
| Host Updater                   | 2.4.0            |       |
| Host Proxy                     | 1.20-20260217    |       |
| Source OPC                     | 1.7.2            |       |

#### Breaking Changes

- Upgrade from **v2.19 only** supported. Ensure v2.19 is fully installed before applying this update.

---

## 2.19.0

*2026-01-30*

> **Note: Automatic restart**
> This update automatically restarts the device immediately, as the new updater is required for the second installation step.
>
> The update includes a pre-installation validation of the installed packages (prerequisite: version 2.18). If the validation fails, the update process is aborted — no changes are made.

---

### Highlights

> Version 2.19.0 brings extensive improvements to the Simatic connector: faster connection establishment, gradual exploration without pre-loading the full structure, and optimised RAM usage. The user interface has been extended with status-dependent controls and a clearer variable structure.

---

### New Features

- **Simatic: Gradual Exploration** — The variable structure of a Simatic device is now loaded incrementally, without downloading the full structure upfront. This prevents crashes with large program structures and significantly reduces RAM usage.
- **Simatic: Direct Data Block Addressing** — Data blocks are now directly accessible without overlaid group levels.
- **UI: Variable Structure** — Arrays are explicitly labelled as arrays in the variable explorer (displaying the array size). Data blocks and group structures are sorted alphanumerically.
- **UI: Status-dependent Control Lock** — The performance test and import-from-device functions are locked while no connection to the device is established.
- **Configuration Migration** — A separate update package is available for devices with an existing variable configuration, which migrates the configuration to the new Simatic format. Note: after the migration, Grafana dashboards must be reconfigured.
- **Updater: Script Execution** — The update system now supports pre- and post-installation scripts that are executed as part of an update bundle.

### Bug Fixes

- **Simatic: Slow Connection Establishment** — Connection establishment to the PLC could take up to 5 minutes on some devices. Connection handling and status display have been completely redesigned.
- **Simatic: Performance Test Returned Invalid Results** — The performance test did not return valid results when the sampling rate could not be achieved. Results and code structure have been revised.
- **Simatic: Password Protection Always Active on Creation** — When creating a new Simatic device, password protection was always pre-selected, even when no password was entered.
- **Simatic: Disabled Exclude List Ignored Variables** — A disabled exclude list caused temporarily unavailable variables to be permanently ignored. The exclude list is now always active and configurable via parameters.
- **Simatic: Health Status with Wrong Password** — After a password change with an incorrect password, the health status was not correctly set to "Unhealthy". Only a restart of the connector restored the correct state.
- **NTP: Service Inactive after Restart** — The NTP service switched off after a system restart.

---

### Technical Appendix

#### Component Versions

| Component                          | Version       | Notes             |
|------------------------------------|---------------|-------------------|
| OS Image                           |               |                   |
| Web UI Advanced                    | 4.9.17        |                   |
| Source Control (SourceConfig)      | 1.3.0         |                   |
| Host DateTime                      | 1.3.2         |                   |
| Host Updater                       | 2.2.1         |                   |
| Host Dockerenvironment             | 1.0.1         |                   |
| Source Simatic                     | 4.4.2         |                   |
| APP Redprocessor                   | 0.1.0         | newly registered  |
| APP Redprocessor Browser           | 1.0           | newly registered  |
| Source Modbus                      | 3.5.1         | newly registered  |
| Core Gateway Manager               | 1.9.7         | newly registered  |
| Core Auth                          | 1.1.1         | newly registered  |
| Core Database Management           | 1.2.6         | newly registered  |
| Core Grafana Connector             | 1.3.2         | newly registered  |
| Core Notification Hub              | 1.0.21        | newly registered  |
| Core Source Info                   | 1.0.0         | newly registered  |
| Core Struct Import CSV             | 1.2.2         | newly registered  |
| Core Struct Registry               | 1.11.0        | newly registered  |
| Core Struct Templates              | 1.0.5         | newly registered  |

#### Breaking Changes

- Upgrade from **v2.18 only** supported.
- After applying the optional config migration package, Grafana dashboards must be reconfigured.

---

## 2.18.2

*2025-12-05*

> **Critical Patch — Updater**
> Depending on the hardware in use, larger update packages could not be fully uploaded. The upload was aborted with a timeout.

---

### Highlights

> Version 2.18.2 fixes an issue where the upload of larger update packages timed out depending on the hardware. A full fix of the underlying issue in the API service will follow in version 2.19.

---

### Bug Fixes

- **Updater: Upload of larger packages failed** — Depending on the hardware configuration, the high system load during the upload caused the process to abort with a timeout, and the update package was not fully transferred. The upload is now forwarded directly to the updater service.

---

### Technical Appendix

#### Component Versions

| Component      | Version            | Notes |
|----------------|--------------------|-------|
| System Proxy   | new nginx config   |       |

#### Breaking Changes

None.

---

## 2.18.1

*2025-11-08*

> **Critical Patch — Gateway**
> Without this patch, the Gateway service could not retrieve the device's hostname, which is required to authenticate with the cloud. The Gateway function was therefore completely out of service.

---

### Highlights

> Version 2.18.1 is a critical patch that restores the Gateway connection to the cloud.

---

### Bug Fixes

- **Gateway: Connection to cloud interrupted** — After the infrastructure overhaul in version 2.18, the Gateway service could no longer retrieve the device's hostname. The Gateway connection to the cloud was therefore completely interrupted.

---

### Technical Appendix

#### Component Versions

| Component      | Version            | Notes |
|----------------|--------------------|-------|
| System Proxy   | new nginx config   |       |

#### Breaking Changes

None.

---

## 2.18.0

*2025-10-09*

> **Note: Two restarts required**
> This update requires two consecutive restarts, as OS components and the Linux kernel are also being updated.
>
> The update includes a pre-installation validation of the installed packages (prerequisite: version 2.17) as well as a check of the available storage space. If either check fails, the update process is aborted — no changes are made.

---

### Highlights

> Version 2.18.0 brings a completely redesigned update interface and a new Docker infrastructure that enables direct updates of individual components. Network configuration and discovery have been extended for the Companion app. Several stability issues in the Simatic connector have been resolved.

---

### New Features

- **Updater: New Interface** — The updater features a completely redesigned user interface with an update history and a dedicated process page. Available storage space is checked before the update.
- **Setup Wizard: Input Validation** — Invalid inputs are caught and reported immediately during the setup process.
- **Network Configuration (Initial Setup)** — Network interfaces can be configured via the initial setup.
- **Discovery: Extended Device Information** — The Discovery service displays additional fields for discovered devices.
- **Firmware Update via Companion** — The foundation for firmware update functionality via the Companion app has been implemented.

### Bug Fixes

- **Simatic: High Memory Load** — The Simatic connector caused uncontrolled memory consumption under certain conditions. The fix from patch 2.17.1 has been incorporated into this version.
- **Simatic: Exclude List Ignored Variables** — A faulty exclude list implementation caused variables to be incorrectly ignored.
- **Simatic: NaN Error in Quick Insights** — When querying the device ID, a NaN error occurred that caused incorrect displays in Quick Insights.
- **IO Load Problem** — A problem with elevated IO load that had existed since version 2.16 was resolved by adjusting the Influx configuration.
- **CSV Config Import: Invalid Characters** — Invalid characters in the address field are now caught during CSV import.

---

### Technical Appendix

#### Component Versions

| Component                    | Version        | Notes                          |
|------------------------------|----------------|--------------------------------|
| OS Image                     |                |                                |
| Web UI Advanced              | 4.9.8          |                                |
| Web UI API                   | 1.20.0         |                                |
| Web UI Basic                 | 2.2.1          |                                |
| Web UI Configuration         | 1.0.3          |                                |
| Core CSV-Config-Import       | 1.2.2          |                                |
| Core Kapacitor               | 1.5.3-udf      |                                |
| Core Watchdog                | 0.1.3          |                                |
| Host Docker Environment      | 1.0.0          |                                |
| Host Discovery               | 2.0.6          |                                |
| Host Network API             | 2.6.5          |                                |
| Host OS Info                 | 1.0.4          |                                |
| Host Secure Pack             | 2025.1         |                                |
| Host Updater                 | 2.1.2          |                                |
| Source Simatic               | 4.3.2          |                                |
| System Grafana               | 7.4.5          |                                |
| System Influx                | 1.8            |                                |
| System Postgres              | 11.4           |                                |
| System Proxy                 | 1.20           |                                |
| System Worker Insights       | 1.20.4         |                                |
| System Worker Measurements   | 1.20.4         |                                |
| APP Docu                     | 1.0.0          | new Compose config only        |
| System Broker                | 3.8.0          | new Compose config only        |

#### Breaking Changes

- Upgrade from **v2.17 only** supported.
- Docker infrastructure overhaul: all services migrated to new Docker Compose structure. Direct per-container updates are now possible.

---

## 2.17.1

*2025-08-28*

> [!CAUTION]
> **Critical Patch — Simatic Connector**
> This patch should be applied to all crawlers promptly. The bug can lead to a **complete failure of the crawler**, as the Simatic service consumes the memory available to other applications.


### Background

During the connection establishment to the PLC, the Simatic service was consuming an excessive amount of memory. As a result, other services no longer had sufficient memory available, which could lead to a total failure of the crawler.


### Changes

| Area | Change |
|---|---|
| Source Simatic | Fixed memory leak during connection establishment to PLC |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Source | Simatic | 4.3.2 |

---

## 2.17.0

*2025-03-17*

> **Note: System restart required**
> This update requires a system restart because duplicates in the core Compose configuration are cleaned up. During the restart, all affected containers will be recreated.

---

### Highlights

> Version 2.17.0 brings extensive enhancements to the Simatic connector: live view, quick preview, password protection, and Quick Insights. The Modbus connector has been extended with IP address change and endianness configuration. The user interface has been updated with a revised navigation menu and improved connection status display.

---

### New Features

- **Simatic: Live View** — The most recent measured value of a variable is displayed directly in the variable browser.
- **Simatic: Quick Preview** — Fast time-series preview of a variable's value as a chart, accessible directly from the browser.
- **Simatic: Password-protected Devices** — Connections to password-protected Simatic devices are supported.
- **Simatic: Quick Insights** — Dynamic connection status and log messages are displayed directly from the Simatic service.
- **Simatic: Improved Timeout Behaviour** — The connection timeout behaviour on connection drops has been revised.
- **Modbus: Change IP Address** — The IP address of a Modbus device can be changed afterwards without having to recreate the device.
- **Modbus: Configurable Endianness** — Big-endian and little-endian are configurable at the device and variable level.
- **UI: Restart Source Extensions from UI** — Simatic and Modbus containers can be restarted directly from the interface.
- **UI: Navigation Menu** — The navigation menu has been revised and improved.

### Bug Fixes

- **WebUI does not start after device restart** — The user interface did not start correctly after a restart of the crawler.
- **Error during Initial Setup** — An error occurred when setting up the device for the first time.
- **Gateway Manager: Configuration Delivery** — The configuration was not correctly delivered to the Gateway Dispatcher (affects only installations with the Gateway function enabled).

---

### Technical Appendix

#### Component Versions

| Component                        | Version   | Notes   |
|----------------------------------|-----------|---------|
| OS Image                         |           |         |
| Web UI Advanced                  | 4.8.18    |         |
| Web UI Basic                     | 2.2.0     |         |
| Web UI API                       | 1.17.6    |         |
| Core Source Control (SourceConfig) | 1.2.1   |         |
| Core Source Info                 | 1.0.0     | new     |
| Source Simatic                   | 4.2.3     |         |
| Source Modbus                    | 3.5.1     |         |
| Gateway Manager                  | 1.9.7     |         |

#### Breaking Changes

None.

---

## 2.16.1

*2025-02-26*

> **Critical Patch — Gateway**
> After a system restart, no measurement data was being sent toward the cloud. The Gateway function was therefore completely out of service.

---

### Highlights

> Version 2.16.1 is a critical patch that restores Gateway data transmission after a device restart.

---

### Bug Fixes

- **Gateway: Data not sent after restart** — After a system restart, continuous measurement values were no longer transmitted to the cloud. Structural data and insights were sent correctly; only the measurement data was missing. The issue could only be worked around by manually changing a variable on the Gateway.

---

### Technical Appendix

#### Component Versions

| Component        | Version | Notes |
|------------------|---------|-------|
| Gateway Manager  | 1.9.6   |       |

#### Breaking Changes

None.

---

## 2.16.0

*2025-02-06*

> **Note: Database restarts — brief data loss possible**
> This update restarts the databases. A brief period of data loss will occur as a result. This is technically necessary due to the included database migrations.

> **Note:** This update includes the changes from patch 2.15.1 and can be applied directly on top of version 2.15.0.

---

### Highlights

> Version 2.16.0 introduces controlled transmission of measurement data via the Gateway trigger. IO load problems from earlier versions have been permanently resolved.

---

### New Features

- **Gateway: Controlled Dispatching (Conditional Dispatching)** — When the Gateway is enabled, variables can be selectively sent to the cloud via a source trigger instead of transmitting continuously.
- **Variables: Cascading Deletion** — When a device or group is deleted, the associated variables are automatically deleted along with it.

### Bug Fixes

- **IO Load Problem** — An excessive IO load that had been known since earlier versions was permanently resolved by adjusting the InfluxDB configuration and introducing resource limits.

---

### Technical Appendix

#### Component Versions

| Component          | Version  | Notes |
|--------------------|----------|-------|
| OS Image           |          |       |
| Web UI Advanced    | 4.7.2    |       |
| Web UI API         | 1.16.8   |       |
| Gateway Manager    | 1.9.4    |       |

#### Breaking Changes

- Upgrade from **v2.15 or later** supported (2.15.1 changes included).
- Database migrations are applied during update — brief data loss possible.

---

## 2.15.1

*26 November 2024*

> [!NOTE]
> This patch is bundled with Version 2.16.0 and can therefore be applied directly on top of Version 2.15.0.


### Bug Fixes

#### User Interface (Web UI)

| Area | Description |
|---|---|
| Device Management | Error when reaching the maximum number of devices resolved |
| PLC Creation | Creating PLCs with the same IP address corrected |
| Variable Browser | Individual variables can again be correctly deleted |

#### CSV Importer

| Area | Description |
|---|---|
| Character Encoding | UTF-8 support for files exported from Excel |
| Special Characters | Error with special character "…" (ellipsis) resolved |

#### Simatic Connector

| Area | Description |
|---|---|
| Stability | General stability improvements |
| Reconnect | Reconnection to the PLC corrected |
| ExcludeList | When using absolute addressing, disabling the ExcludeList was not possible — resolved |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced | 4.5.17 |
| Core | CSV Parser | 1.2.1 |

---

## 2.15.0

*9 October 2024*

### New Features

#### Performance Analysis

- Target/actual comparison of sampling rate: the measured sampling rate of the PLC is compared against the configured rate to ensure no data is missed or distorted

#### Partial Exploration

- When importing measured variables, groups and variables are now loaded partially — improved performance with large data structures

#### Documentation (Offline Manual)

- Crawler documentation in PDF format available directly in the Web UI (Advanced and Basic UI)

#### Basic UI — Device Page

- New page showing all devices with their current connection status


### Improvements

#### CSV Import (Advanced UI)

| Improvement | Description |
|---|---|
| Excel Compatibility | CSV files from Excel are supported (automatic conversion to UTF-8) |
| Group Structures | Importing group structures via path specification (any hierarchy depth) |
| Duplicate Detection | Duplicate addresses within a group are detected and reported |
| Optional Columns | Column "Crawler Data Type" is optional; column "isActive" can be empty (default: `true`) |
| Error Messages | Improved error messages for invalid CSV files (e.g. empty file) |

#### General (Advanced UI)

| Area | Change |
|---|---|
| Notifications | Reduced number of duplicate notifications |

#### Simatic Connector

- General functional improvements


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced | 4.5.13 |
| Web UI | Basic | 2.1.6 |
| Web UI | API | 1.16.7 |
| Core | CSV Parser | 1.1.8 |
| Source | Simatic | 4.0.2 |


> The update bundle supports migration from **Version 2.14 to 2.15**. Ensure that Version 2.14 is fully installed before applying the update.

---

## 2.14.4

*28 August 2024*

> [!WARNING]
> **Restart Required**
> After the update, the Crawler must be restarted; otherwise the changes will not take effect.

> [!NOTE]
> This patch includes all changes from Version 2.14.3 and fully supersedes it.


### Background

This patch consolidates the stability measures from 2.14.3 and supplements them with a new Simatic version that combines all features from Version 2.13 and 2.14.0, as well as the capability for partial exploration.


### Changes

| Area | Change |
|---|---|
| Core Dumps | Disabled in system services and connectors |
| Log Files | Size limited to max. 10 MB, max. 3 files per service |
| Host Service | Existing log data is cleaned up during the update |
| Source Simatic | Update to Version 4.0.1 — revised service with partial exploration and Arcon abstraction |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Core | Source Control (SourceConfig) | 1.1.2 |
| Source | Simatic | 4.0.1 |

---

## 2.14.3

*1 August 2024*

> [!WARNING]
> **Restart Required**
> After the update, the Crawler must be restarted; otherwise the changes will not take effect.


### Background

This patch improves overall system stability by disabling core dumps and limiting log file sizes. Both measures reduce uncontrolled memory consumption during operation.


### Changes

| Area | Change |
|---|---|
| Core Dumps | Disabled in system services and connectors |
| Log Files | Size limited to max. 10 MB, max. 3 files per service |
| Host Service | Existing log data is cleaned up during the update |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Core | Source Control (SourceConfig) | 1.1.2 |

---

## 2.14.2

*7 July 2024*

### Background

This patch restores support for newer Simatic controllers configured with TIA Portal V18 or later. The connection initialisation has been corrected.


### Changes

| Area | Change |
|---|---|
| Source Simatic | Update to Version 3.5.6 |
| TIA V18+ | Support for controllers from TIA Portal V18 onwards restored |
| Init String | Minimum length of the init string is handled correctly when it has not been set |
| Accon Lib | Library for controller communication updated |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Source | Simatic | 3.5.6 |

---

## 2.14.1

*23 June 2024*

> [!WARNING]
> **Limited Simatic Compatibility**
> This version does **not** support Simatic controllers configured with TIA Portal V18 or later. For TIA V18+, please update to Version 2.14.2.


### Background

The Simatic service from Version 2.14.0 exhibited stability issues. This version includes a downgrade to the last known stable Simatic version (3.5.4). As a result of the downgrade, certain features are temporarily unavailable.


### Changes

| Area | Change |
|---|---|
| Source Simatic | Downgrade to Version 3.5.4 (last stable version) |
| IP Address | Changing the device IP is not possible (temporarily disabled) |
| ExcludeList | Disabling the ExcludeList is not possible (temporarily disabled) |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Source | Simatic | 3.5.4 |

---

## 2.14.0

*13 March 2024*

> [!CAUTION]
> **Not Recommended — Known Stability Issues**
> This version contains known stability issues with the Simatic Connector. It is recommended to update **directly to Version 2.14.4**.

> [!WARNING]
> **Restart Required**
> This update requires a system restart, as configuration changes only take effect after a restart.


### New Features

#### Gateway

| Feature | Description |
|---|---|
| Bulk Editing | Measured variables in the Gateway can be edited and deleted in bulk |
| Meta-Info Import | Measured variables can be imported via meta-information from device measured variables |
| Multiple Dispatchers | Support for multiple dispatchers per endpoint (e.g. periodic + ad-hoc dispatch) |
| Structure Dispatcher | New dispatcher: transfers Crawler device and measured variable structures *(bookable)* |
| Ad-Hoc Dispatcher | New dispatcher: high-resolution data points for individual measured variables within a limited time range *(bookable)* |
| Aggregation Intervals | Intervals 1s and 5s have been removed (excessive system load) |

#### User Interface (Web UI)

| Area | Change |
|---|---|
| Navigation | Navigation to the NuP Dispatcher directly via the Advanced UI |
| Layout | General layout improvements |
| Setup Wizard | Bugfix: display error for network adapter resolved |


### Improvements

#### Gateway — Technical Infrastructure

| Area | Change |
|---|---|
| AWS Endpoint | Adjusted endpoint for improved stability of connection establishment |
| Origin ID | Introduced to support multiple simultaneous dispatchers |
| MXS / MXH | Separate update packages for MXS and MXH (in addition to the standard update) |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced | 4.0.26 |
| Web UI | API | 1.16.3 |
| Gateway | Manager | 1.8.8 |
| Gateway (MXS, MXH) | Dispatcher MX | 2.6.0 |
| Gateway (MXS, MXH) | Structure Dispatcher | 1.2.0 *(new)* |
| Gateway (MXH) | Ad-Hoc Dispatcher | 1.1.1 *(new)* |
| Gateway (MXS, MXH) | AWS Endpoint | 1.3.0 |


> The update bundle supports migration from **Version 2.13 to 2.14**. Ensure that Version 2.13 is fully installed before applying the update.

---

## 2.13.0

*15 January 2024*

> [!CAUTION]
> **Not Recommended — Known Stability Issues**
> This version contains known stability issues with the Simatic Connector. It is recommended to update **directly to Version 2.14.4**.


### New Features

#### CSV Import

- Measured variables can be imported via CSV file for all device types

#### Notification Hub

- Email dispatch for Grafana alarms (new service)


### Improvements

#### User Interface (Web UI)

| Area | Change |
|---|---|
| Device Favourites | Notice displayed when the maximum number of favourites is reached |
| Appearance | Revised design of the Web UI |

#### Simatic Connector

| Area | Change |
|---|---|
| ExcludeList | Complete overhaul (previously: BlackList) — improved functionality |
| ExcludeList | Can be disabled in the UI |
| IP Address | IP address of a device can be changed (connection is rebuilt automatically) |


### Bug Fixes

| Component | Description |
|---|---|
| StructService | During a factory reset, variables in the StructDB were not completely deleted |


### Technical Improvements

#### RabbitMQ — Queue Limits

To prevent cascading issues with a large number of measuring devices, queue lengths have been limited for all workers:

| Worker | prefetch_count |
|---|---|
| system.worker.insights.log | 1000 |
| system.worker.insights.endpoint | 100 |
| system.worker.insights.source | 50 |
| system.worker.measurement | 100 |
| system.worker.measurement.metric | 100 |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced | 4.0.19 |
| Web UI | Basic | 2.0.0 |
| Web UI | API | 1.15.2 |
| Core | Notification Hub | 1.0.21 *(new)* |
| Core | CSV Parser | 1.0.7 *(new)* |
| Source | Simatic | 3.9.5 |


> The update bundle supports migration from **Version 2.12.2 to 2.13**. Ensure that Version 2.12.2 is fully installed before applying the update.

---

## 2.12.2

*24 October 2023*

### Background

When unknown symbolic data types were present on the PLC, log messages were generated at a high frequency, which could cause significant performance degradation depending on the system. Affected data types: `S7_HW_SUBMODULE`, `S7_HW_ANY`, `S7_CONN_OUC`, `S7_Pointer`, `S7_Variant`. These log entries have been disabled.


### Bug Fixes

| Area | Description |
|---|---|
| Source Simatic | High-frequency log messages for unknown PLC data types disabled |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Source | Simatic | 3.5.4 |


> No separate VM package required. The update bundle supports migration from **Version 2.12.1 to 2.12.2**.

---

## 2.12.1

*18 September 2023*

> [!NOTE]
> Version 2.12.0 contained bugs when changing the IP address and during the Simatic Discovery timeout. It is recommended to **skip Version 2.12.0** and update directly to 2.12.1. The update package supports installation based on either 2.11 or 2.12.


### New Features

#### Simatic Connector

| Feature | Description |
|---|---|
| Array Data Type | Simatic now supports the Array data type |

#### Modbus Connector

| Feature | Description |
|---|---|
| String Data Type | Modbus now supports the String data type |

#### User Interface (Web UI)

| Area | Change |
|---|---|
| Favourites | Max. 3 device favourites in the Advanced UI |
| Device Limit | Max. 5 devices in the Advanced UI |
| Login Duration | Login validity extended to 1 hour |
| Firefox | Login in Firefox browser is now possible |


### Improvements

#### Gateway

| Area | Change |
|---|---|
| Insights Dispatcher | Send interval extended to 5 minutes (if configured) |
| Cloud Data Load | Reduction of data load towards the cloud — measurement values prioritised over service information |

#### Technical Aspects

| Area | Change |
|---|---|
| Connectors | Limitation of simultaneous connectors to guarantee performance |
| Auth Service | During a reset, the configured password from the app settings is always used |
| Simatic Discovery | Timeout increased to 60 seconds |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced | 3.20.10 |
| Web UI | API | 1.14.6 |
| Web UI | Auth | 1.1.1 |
| Source | Simatic | 3.5.3 |
| Source | Modbus | 3.3.3 |


> The update bundle supports migration from **Version 2.11 or 2.12.0 to 2.12.1**. No separate VM package required.

---

## 2.12.0

*September 2023*

> [!CAUTION]
> **Not Recommended — Known Bugs**
> This version contains bugs when changing the IP address of devices and when the Simatic Discovery times out. It is recommended to **update directly to Version 2.12.1**. The update package for 2.12.1 supports installation based on either 2.11 or 2.12.0.

---

## 2.11.0

*30 May 2023*

### New Features

#### Gateway — Aggregation Intervals

| Feature | Description |
|---|---|
| Interval Selection | When adding a measured variable, the desired aggregation interval is set directly |
| Interval Change | The interval can be changed after the fact |
| Available Intervals | 1s, 15s, 30s, 1m, 10m, 30m, 1h |
| Existing Data | Entries already present retain their previous default value of 1 minute after the update |

> Variables with a 10-second interval are automatically changed to 60 seconds during the update.

#### Gateway — Transparency & Display

| Feature | Description |
|---|---|
| Send Backlog | Current mode, timestamp of the most recent and backlogged measurement point, and the last send time are displayed in the web frontend |
| Variable Address | Address of the measured variables configured in the Gateway is displayed |


### Improvements

#### Gateway — Technical Infrastructure

- Health checks available for Manager, Dispatcher, and Endpoint
- All Gateway projects migrated to .NET 6.0
- Improved logging levels and queue names
- Manager: unnecessary Kapacitor tasks are deleted automatically
- Manager: variable configuration changes propagate the full data set
- API error messages use RFC7807 format


### Updated Components

| Group | Component | Version |
|---|---|---|
| UI | Advanced UI | 3.18.4 |
| UI | Web API | 1.14.3 |
| Gateway | Manager | 1.7.8 |
| Gateway | Dispatcher MX | 2.5.0 |
| Gateway | Endpoint AWS | 1.1.4 |


> No separate VM package required. The update bundle supports migration from **Version 2.10 to 2.11**.

---

## 2.10.0

*20 February 2023*

### New Features

#### User Interface (Web UI)

| Feature | Description |
|---|---|
| Login for Settings | The settings page requires a login (user: `admin`) |
| Password Management | Password is set during initial setup and can be changed at any time in the settings |
| Factory Reset | Password is also reset when performing a factory reset |

#### Network

| Feature | Description |
|---|---|
| Primary Adapter | A primary network adapter must be defined for internet requests (routing) |
| Default Adapter | On delivery and after a factory reset, the **X1 adapter** is configured as the primary adapter |
| Discovery Tool | Network settings via the DiscoveryTool always refer to the first adapter, regardless of the configured primary adapter |


### Improvements

#### Docker Infrastructure

- Docker infrastructure updated
- Containerd configuration adjusted (fixes errors in Suspend Mode on VMs)
- I/O load reduced through configuration adjustments
- `compose-up.sh` is now included in the update package (previously, the local file was modified directly)
- Health checks added for Web UI Advanced and Auth Service


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced UI | 3.17.4 |
| Web UI | Web API | 1.14.2 |
| Core | Auth Service | 1.0.0 *(new)* |


> The update bundle supports migration from **Version 2.9 to 2.10**.

---

## 2.9.0

*1 December 2022*

### New Features

#### Gateway — Catch-Up Mechanism

| Feature | Description |
|---|---|
| Current Data Packets | After a connection drop, current data packets are sent regularly alongside historical data |

#### User Interface (Web UI)

| Feature | Description |
|---|---|
| Start Page | When accessing the Crawler address, the user UI (Basic UI) opens first; the settings pages can be reached via a button |
| Connection Status | The connection status of configured field devices is displayed on the device pages and device list; connection changes are shown as notifications |
| Notifications | Improved notifications and alerts |


### Bug Fixes

| Area | Description |
|---|---|
| Basic UI | Node Red can be called embedded in the Basic UI |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced UI | 3.16.1 |
| Web UI | Basic UI | 1.2.3 |
| Gateway | Dispatcher MX | 2.1.6 |


> The update bundle supports migration from **Version 2.8 to 2.9**.

---

## 2.8.0

*6 September 2022*

### New Features

#### Database Management

| Feature | Description |
|---|---|
| Overview | Display of all Influx databases |
| Clear Database | Individual databases can be cleared |
| Retention Policies | Retention policies can be configured |
| Disk Forecast | Display of current disk usage and rough forecast for when the disk will be full |

#### Watchdog

| Feature | Description |
|---|---|
| Individual Filtering | Watchdog with configurable filters for individual monitoring |
| UI Integration | Device connection status displayed directly in the Web UI |
| Gateway Integration | Watchdog data is integrated into the Insights Dispatcher (Gateway) |


### Improvements

#### User Interface (Web UI)

- Revised device pages and settings pages
- New alerts and notifications on device pages
- Renaming of "Variables" to **Measured Variables** throughout the UI
- Network settings are only applied after confirming "Complete"
- VariableBrowser: Navigation structure is preserved when changes are made to measured variables

#### Simatic Connector

- Bugfix: Asynchronicity issue in the publisher library resolved
- Bugfix: Measured variables that could not be retrieved from the PLC are now retried multiple times before being discarded


### Updated Components

| Group | Component | Version |
|---|---|---|
| Core | Database Manager | 2.6.1 |
| Source | Simatic | 3.4.7 |
| Web UI | Advanced UI | 3.13.9 |
| Web UI | Basic UI | 1.1.0 |
| Web UI | Web API | 1.0.13.7 |
| Core | Watchdog | 0.1.3 |
| Gateway | Dispatcher Insights | 1.10.0 |


> The update bundle supports migration from **Version 2.7.1 to 2.8**.

---

## 2.7.1

*2022-07-28*

### New Features

#### Source Connectors

| Area | Change |
|---|---|
| Remote-Controlled Connectors | Connectors can be marked as "remote-controlled" and will then not be created, started, stopped, or deleted by the SourceConfig service |

#### Grafana Connector

| Area | Change |
|---|---|
| Group Selection | In addition to "Device + Measurement Variable", the group structure can now also be used for dashboard selection; existing dashboards remain compatible |


### Bug Fixes

| Area | Description |
|---|---|
| StructService | IPCC events when deleting a measurement variable were not sent correctly in all cases |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Core | StructService | 1.11.0 |
| Core | SourceConfig | 1.0.2 |
| Core | Grafana Connector | 1.3.1 |
| Core | Device Config Management | 1.0.5 |


> The update bundle supports a migration from **version 2.7 to 2.7.1**.

---

## 2.7.0

*2022-07-11*

### New Features

#### Crawler Insights

| Feature | Description |
|---|---|
| Field Device Monitoring | Collection of critical information from configured field devices (Simatic and Modbus) |
| Connection Status | Retrieval of connection status and additional device data |
| Local Storage | Storage in InfluxDB for local visualization and analysis |
| Pre-installed Dashboards | Insights: System, Insights: Field Devices *(new)*, Insights: Logs *(new)* |
| Cloud Transmission | Transmission to the cloud (AWS Endpoint): system metrics, field device states, crawler service data |


### Improvements

#### Grafana

- System Metric Dashboard extended with information from additional partitions

#### Simatic Connector

- Bug fix: occasional crash of data recording during connection interruptions (0 measurement points) resolved


### Updated Components

| Group | Component | Version |
|---|---|---|
| Source | Simatic | 3.4.3 |
| Source | Modbus | 3.2.3 |
| Core | SourceConfig | 1.0.0 |
| Gateway | Endpoint AWS | 1.1.0 |
| Gateway | Dispatcher Insights | 1.9.0 |


> The update bundle supports a migration from **version 2.6.1 to 2.7**.

---

## 2.6.1

*2022-05-31*

### Bug Fixes

| Area | Description |
|---|---|
| Simatic Connector | Configured measurement variables that no longer exist on the PLC no longer cause a crash |
| Simatic Connector | Fetching the structure (symbolic) no longer affects data recording; frequent errors during structure discovery should also no longer occur |
| Grafana Connector | Structures are fetched initially and on IPCC events and cached in RAM; requests are therefore always served from the cache (performance optimization) |
| System Metrics | System metrics function for Docker containers restored |


> The update bundle supports a migration from **version 2.6 to 2.6.1**.

---

## 2.6.0

*2022-04-26*

### New Features

#### Gateway — New Architecture

With version 2.6, the Gateway is split into three independent services: **Manager**, **Dispatcher**, and **Endpoint**.

| Feature | Description |
|---|---|
| Transmission Control | Stopping data transmission keeps the connection active; transmission can be stopped per Dispatcher |
| Connection Configuration | Connection data and credentials can be configured via the Web UI |
| Connection Status | The connection status to the Endpoint is displayed in the Web UI |
| Measurement Variable Management | Already configured measurement variables can be selected, adjusted, or removed for transmission via the Gateway (selection via Variable Browser) |

#### DataProcessor

| Feature | Description |
|---|---|
| Event Detection | Event detection now works correctly (buffer adjustment in Telegraf) |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced UI | 3.10.18 |
| Web UI | Web API | 1.0.12.5 |
| Gateway | Manager | 1.0.0 *(new)* |
| Gateway | Dispatcher MX | 1.0.0 *(new)* |
| Gateway | Endpoint AWS | 1.0.0 *(new)* |
| Core | Telegraf | 1.20.4 |


> The update bundle supports a migration from **version 2.5 to 2.6**.

---

## 2.5.0

*2022-03-11*

### New Features

#### System Status

| Feature | Description |
|---|---|
| Health Overview | An overview of the health status of system and core services is displayed under "Settings" |
| Usage Lock | The UI blocks operation as long as not all system and core services are available (e.g. after a restart) |

#### DataProcessor

| Feature | Description |
|---|---|
| Revised UI | Wizard-guided setup of calculations; variable selection is done via the Variable Browser |

#### Variable Browser (manual)

| Feature | Description |
|---|---|
| Create Measurement Variables | Measurement variables can be created manually by entering all required parameters |
| Delete Measurement Variables | Individual or multiple measurement variables can be deleted |

#### Simatic S7 — Selective Import

| Feature | Description |
|---|---|
| Selective Import | Individual variables from a Simatic S7 (symbolic addressing) can be selectively added to existing measurement variables |
| Highlighting | Already imported variables and variables that no longer exist are visually highlighted |
| Structure Preservation | Existing structures are not deleted during import |


### Improvements

#### User Interface (Web UI)

- Angular framework updated to version 13
- Various bug fixes: network settings, loading animations, Firefox layout, translation errors


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced UI | 3.9.33 |


> No separate download paths are stored for this version.

---

## 2.4.2

*2022-02-21*

> [!WARNING]
> **Host Updater must be updated before installation**
> The update package from version 2.4.1 overwrote the manually updated Host Updater. Before installing this package, the Host Updater must therefore be manually updated again.


### Bug Fixes

| Area | Description |
|---|---|
| Modbus & Simatic | Fixed an error when advancing the crawler's system clock |
| Simatic | Measurement variables with the same address are now only fetched once from the PLC; the value is written to all corresponding measurement variables |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Source | Modbus | 3.0.11.1 |
| Source | Simatic | 3.2.0 |

---

## 2.4.1

*2022-01-21*

> [!WARNING]
> **Host Updater is overwritten by this update**
> The update package overwrites the manually updated Host Updater. Before installing the next update package (version 2.4.2), the Host Updater must therefore be manually updated again.


### New Features

#### Network

| Feature | Description |
|---|---|
| DNS Configuration | Up to 5 DNS entries can be configured |
| Multiple Adapters | All available network adapters (all eth adapters) can be configured |
| Hot-Apply | Network changes can be applied without a restart |

#### Date and Time

| Feature | Description |
|---|---|
| Time Setting | Date, time, and time zone can be changed without resetting to factory defaults |
| NTP Configuration | NTP address and activation state are configurable |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced UI | 3.7.83 |

---

## 2.4.0

*2021-09-20*

### New Features

#### Source Extension — New Architecture

| Feature | Description |
|---|---|
| Automated Orchestration | Connectors are managed automatically — no manual creation of containers required |
| Connection Status | Connection status is determined via Docker container health checks |
| Metric & Alignment | Configuration of measurement method and time alignment directly in the UI (per device and per measurement variable) |

#### New Updater Service

| Feature | Description |
|---|---|
| Updater (Beta) | New Updater service for more convenient software updates |

#### Basic UI

| Feature | Description |
|---|---|
| New Basic UI | Supplementary end-user UI alongside the Advanced UI |
| Included Features | DigiDoc, Dashboards, RedProcessor |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Advanced UI | 3.7.17 |
| Web UI | Basic UI | 1.0.7 *(new)* |
| Web UI | Web API | 1.0.9.6 |
| Source | Simatic | 3.0.7 |
| Source | Modbus | 3.0.10 |
| Core | Source-Config | 0.1.10 |
| Core | StructService | 1.10.9 |
| Core | DeviceConfigMgr | 1.0.4 |
| Core | DBMgr | 1.0.2 |
| APP | DigiDoc | 0.1.4 |

---

## 2.3.4

*2021-05-11*

### New Features

#### RedProcessor (Alpha)

| Feature | Description |
|---|---|
| Menu Navigation | RedProcessor is available as a menu item in the main menu; opens in a new tab |


### Bug Fixes

| Area | Description |
|---|---|
| DigiDoc | Uploading new structures can now also be done directly in the UI (previously only possible via Swagger) |
| DigiDoc | The DigiDoc database now starts automatically on system startup |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Web UI | Web Frontend | 3.6.31 |
| APP | RedProcessor | 0.1.0.0 *(new)* |

---

## 2.3.3

### New Features

#### DigiDoc (Beta)

| Feature | Description |
|---|---|
| Documentation | New "Documentation" menu item in the main menu |
| File Explorer | Files can be browsed and downloaded |

> [!NOTE]
> **Known Issue:** In this version, uploading new structures is only possible via Swagger (`http://<IP-CRAWLER>:8028/swagger`). A fix will be included in version 2.3.4.

---

## 2.3.2

### Bug Fixes

| Area | Description |
|---|---|
| Measurement Processing | Invalid measurement values (`NaN`, `INF`) no longer cause data loss for other measurement values |


### Updated Components

| Group | Component | Version |
|---|---|---|
| Source | Modbus | 1.0.12.0 |
| Source | Simatic | 2.5.7.0 |
| Source | OPC UA | 1.0.5.0 |

---

## 2.3.1

### New Features

#### DataProcessor

| Feature | Description |
|---|---|
| Integration | DataProcessor is integrated into the system and accessible from the main menu |


### Bug Fixes

| Area | Description |
|---|---|
| Kapacitor | Fixed incorrect addressing of the Kapacitor (introduced after the migration to Docker-Compose) |

---

## 2.3.0

> [!CAUTION]
> **Not recommended — Known Issues**
> This version contains a bug. It is recommended to update **directly to version 2.3.1**.

---

## 2.2.0

### New Features

#### Infrastructure

| Feature | Description |
|---|---|
| Docker-Compose | Entire service infrastructure migrated to Docker-Compose |
| MQTT-Logger | MQTT-Logger introduced as a replacement for the MessageCenter; integrated into all container services |


> No separate download paths are stored for this version.

---

## 2.1.0

### New Features

#### Gateway

| Feature | Description |
|---|---|
| SSL Support | Gateway now supports SSL-secured connections to the cloud |
| Connection Recovery | Improved behavior when the connection to the cloud is lost |


> No separate download paths are stored for this version.

---

## 2.0.0

### New Features

#### Core Architecture

| Feature | Description |
|---|---|
| Metadata Separation | Separation of measurement metadata storage: UUIDs as tags in InfluxDB, metadata in relational database |
| IPCC | Internal event and command system for propagating changes to device and measurement structures |

#### User Interface (Web UI)

| Feature | Description |
|---|---|
| Modernized UI | Revised and extended user interface |
| Variable Browser | New Variable Browser for an overview and management of measurement variables |

#### Gateway

| Feature | Description |
|---|---|
| New Gateway | New Gateway with support for various customers |


> No separate download paths are stored for this version.
