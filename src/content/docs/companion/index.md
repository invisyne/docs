---
title: "Companion Overview"
description: "Crawler.Companion is a Windows desktop application for discovering and managing Edge (Crawler) devices on the local network."
---

Crawler.Companion is a Windows desktop application for discovering and managing Edge (Crawler) devices on the local network. It is designed for on-site management — while Crawler.Hub provides central management across multiple locations, Companion is used directly on-site by technicians and administrators.

:::note
Your PC must be on the same network as the Edge (Crawler) device.
:::

## Functional Scope

1. **Device Discovery** — Automatic detection of all active Edge (Crawler) devices in the local network
2. **Device Management** — Display device details and edit important parameters
3. **Network Settings** — Configure IP address and other network properties
4. **Software Updates** — Perform firmware and software updates on Edge (Crawler) devices
5. **Data Export** — Export configuration or measurement data as CSV
6. **WebUI Access** — Open the web interface of a selected device directly in the browser

## Safety Notes

:::caution
Crawler.Companion can modify network settings of Edge (Crawler) devices. Incorrect changes can make devices unreachable.
:::

- Only change network settings if you are familiar with the basics of network configuration (IP addresses, subnet masks, gateways).
- Before installing updates, ensure that the power supply to the Edge (Crawler) device is not interrupted.

## Troubleshooting

| Problem | Possible Cause | Solution |
| --- | --- | --- |
| Device not found | Device is switched off or on the wrong network | Check the power supply and ensure the device is in the same subnet as the PC running Companion |
| Network setting error | Incorrect IP address or subnet mask entered | Verify that the static IP address is unused and within the correct IP range |
| No access to WebUI | Device has a new, unknown IP address | Check the current IP address in the device overview and try accessing manually in the browser |
| Update fails | Network connection interruption | Check network stability; ensure no firewall is blocking access |
