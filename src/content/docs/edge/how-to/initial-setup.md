---
title: "Initial Setup"
description: "This guide contains information for the initial setup of the Edge (Crawler)."
---

This guide contains information for the initial setup of the Edge (Crawler). A wizard will guide you through several steps. The Edge (Crawler) is not ready for operation until the wizard has been completed.

:::caution
💡  Please note that after completing the wizard, the Edge (Crawler) must be restarted. This may take a few minutes.
:::

---
# Connecting to the Edge (Crawler)

:::tip
🌏 💻  The Edge (Crawler) is accessed via a **browser**.
*           It is recommended to use Chrome, Edge, or Firefox.*
:::

To connect to the Edge (Crawler), you must be connected via the network. Upon delivery or after resetting to factory settings, the IP addresses are set to default values:

- X1: 192.168.0.5
- X2: 192.168.1.5

If the Edge (Crawler) is on a different subnet, the *Discovery Tool* can help. This allows you to configure the X1 adapter so that you can subsequently access the web interface directly.

---
# Setup Wizard

The wizard is used to perform the initial configuration of the Edge (Crawler) system. This process will be required again after resetting the Edge (Crawler).

---
## Language

![](../../../../assets/images/x1alKZp6lyxr-fbTtpQGS_7f7e5f5a-bca8-49ab-98fc-4a2c4237de6b.png)

- Select the language
- Current options: German and English
- Note: This setting is local to the browser only, not shared across users
- Can be changed later: yes

---
## Name and Location Identifier

![](../../../../assets/images/a-OsD-8bXRxnwjsQCW8L0_263ac1d6-ad55-4e84-b3be-580a45f8c2dc.png)

- Required entries:
  - Name = identifier in the network, in the display, and in the gateway
    - ⚠ Cannot be changed later (factory reset required)
    - Length limit: max. 20 characters
      *(it is recommended not to use special characters or spaces)*
  - Location ID / Functional designation = free-form entries, used for assignment
    - Can be changed later
    - May be used by data forwarding functions in some cases

---
## Security

![](../../../../assets/images/xFG8jzw_vn_exe19_2qxN_bd868d7a-2df6-423c-9a5e-bff2e4aec58f.png)

In the next step, the password for the settings area of the Edge (Crawler) must be set. This password can be changed later.

:::note
- The password must be at least 6 characters long.
- The username "admin" and the password set here during setup are required to log in.
:::

---
## Time and Date

![](../../../../assets/images/Rui9C5o0WnVl2PK7A2KcL_88b9f2f9-edb8-42cc-85a8-9f203d50ae05.png)

### General

- Both manual and automatic (NTP server) modes are supported

![](../../../../assets/images/4rIBbIJzqOw3jY0-b5pm6_6da4de6f-8d64-4bb7-9f78-1957fafd8aee.png)

Mode can be switched

- Specify the time zone (select from list)

### Automatic (via NTP server)

- Automatic synchronization (interval???)
- Uses the specified server, which can be changed
- Prerequisite: the server must be reachable from the Edge (Crawler) (regardless of which `LAN adapter` is used)

![](../../../../assets/images/Ss9ye-RBXOTtskYXePN43_6ead054f-276a-408b-8f87-601a7a771231.png)

### Manual

- Switch to "manual"
- Time and date can be entered manually
- Time refers to the selected time zone

![](../../../../assets/images/M9EB-z9cuRGbD2u2_nh5N_aadcc55a-537e-4386-a5bb-47297dab94ea.png)

---
## Network Settings

![](../../../../assets/images/V_Nczs6Jtzcz0s7MtbLnw_927a33c3-432e-4e37-9612-944e3067d72e.png)

- Depending on the device, there are multiple network adapters
- Each adapter has a preset IP address upon delivery or after a factory reset
- Depending on the hardware variant (e.g. WAGO or Siemens), the network adapters on the device are labeled X1 (=eth0) and X2 (=eth1)

**Siemens:**

![](../../../../assets/images/3KF07gM4AtNX1tbb3PAAH_31d569fb-0578-4caf-9f6d-8208bf6c4fd9.jfif)

**WAGO:**

![](../../../../assets/images/h3TMS_WgYJdIBIdk17Z5U_8b3534a5-b223-486d-bdd6-2d00235f3dad.jfif)

When used as a VM, the number of network adapters may differ.

---
### Adapter

- For each port/adapter, the following can be configured:
  - IP address
  - Subnet mask
  - Default gateway
  - Enable/disable DHCP

![](../../../../assets/images/musrzhm8p20NsmpkeYVUa_d8b18e61-d175-41db-a216-09bb7ec893a4.png)

### DNS + Domain

- In addition, domain and DNS can be specified across all adapters
- All entries are optional
- Up to 5 DNS servers can be specified
- Individual DNS entries can be deleted

![](../../../../assets/images/jZZo3hKtul3yab7UoA8Tq_fb430aab-4258-43f4-bd31-94b4335c2ded.png)

---
## Finish

![](../../../../assets/images/xw_nuC9k3G67iwYiAPWQf_1afbc729-882a-414d-93ca-65c125ab77ae.png)

The initial setup is complete. Pressing the "Finish" button will restart the Edge (Crawler). You can then proceed with setting up data recording.
