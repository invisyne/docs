---
title: "Quickstart"
description: "Installation, setup, and first steps for the Crawler.Companion application."
---

## Installation & Deployments

**Installation and Deployment:** Installing the Crawler.Companion is a simple process:

## A. Preperation

1. **Download the installation file:** Obtain the current installation file (EdgeCompanionSetup.exe or similar) from the official download page or from your technical contact.

2. **Administrator rights:** Ensure that you have the required administrator rights for the target system.

3. **Network connection:** Connect the PC on which the Companion will be installed to the same LAN segment (local network) where the Edge devices are located.

## B. Start Process

1. **Start the installation:** Double-click on the downloaded file (EdgeCompanionSetup.exe).

2. **Security prompt:** Confirm the Windows security prompt to allow execution as administrator.

3. ![](../../../assets/images/JGhPjl-8TNFK3Wb1FczPF_windows-sicherheitshinweis.PNG)

3. **License Agreement (EULA):** Read the End User License Agreement and accept it to continue.

---

## Initial Setup - Step by Step

## **1) Start Companion**

- Open the Companion file (no installation necessary). Typically, this is an executable file (.exe on Windows, .app/.dmg on macOS, or an executable binary).
- If prompted: Allow the application (e.g., confirm the operating system's security prompt).

:::tip
** Expected Result** The Companion window opens and displays the user interface.
:::

:::danger
**Troubleshooting**

- If the app doesn't start: Right-click → "Run as administrator" (Windows) or allow starting in macOS settings under "Security & Privacy".
- Check if antivirus/SmartScreen is blocking the file.
:::

---
## **2) Check network / Set IP range**

- Check which subnet the device sends to by default: 
  - **X1:** Devices typically send in 192.168.0.x
  - **X2:** Devices typically send in 192.168.1.x
- Set your PC's IP temporarily so that it is in the same subnet (e.g., 192.168.0.10 for X1 or 192.168.1.10 for X2).

### **Windows**

- Settings → Network & Internet → Change adapter options.
- Right-click on your active adapter → Properties → Internet Protocol Version 4 (TCP/IPv4) → Properties.
- Select "Use the following IP address" and enter e.g., IP 192.168.0.10, Subnet mask 255.255.255.0, Gateway empty or 192.168.0.1.

### **MacOS**

- System Preferences → Network → Select adapter → "Advanced" → TCP/IP.
- Configure: "Manually" → IP 192.168.0.10, Subnet mask 255.255.255.0.

:::tip
**Expected Result** Your PC has an IP in the appropriate subnet and can receive broadcast packets to devices in the same subnet.
:::

:::note
**Troubleshooting**

- Note your normal network configuration beforehand so you can restore it later.
- If your PC is connected via company VPN or special firewall, disable VPN or use an isolated LAN (e.g., via Ethernet directly to a switch).
:::

---
## **3) Search for devices (Broadcast)**

- In Companion: Click on "Search" (magnifying glass).
- The software sends broadcast/discovery requests and lists all found Edges in the local broadcast range.

:::tip
**Expected Result** All reachable Edges appear in the device list with information such as serial number, model, current IP (if available), and status.
:::

:::danger
**Troubleshooting** If no devices appear:

- Check network settings again (Step 2).
- Temporarily disable firewall on the PC or add Companion to exceptions.
- Restart the device (rule out factory settings).
- Check if the PC is physically in the same network/segment as the device (no WiFi/guest network with isolation).
:::

---
## **4) Select device / Open details**

- Click once on the row of the desired Edge in the list.
- The clickable element opens the detail view or network settings of the device.

:::tip
**Expected Result** You see details: current IP (if available), MAC, network mode (DHCP/static), possibly hostname, and buttons for actions (e.g., change IP, Web UI, restart).
:::

:::danger
**Troubleshooting**

- If the detail view remains empty: try double-click or right-click → "Details".
- If multiple identical devices appear, orient yourself by MAC or serial number.
:::

---
## **5) Adjust IP (static vs. DHCP) & Save changes**

- Select in the device's network settings: 
  - **DHCP** if the device should obtain an IP automatically from the router (recommended if a DHCP server is available in the network).
  - **Static IP** if you want to set a fixed address (e.g., 192.168.0.50).
- For static IP, enter: IP, Subnet mask (255.255.255.0), possibly Gateway and DNS.
- Click Save / Apply.

****

:::tip
**Expected Result**

- Companion confirms the change. The device may perform a restart and is then reachable at the new IP.
:::

:::note
**Practical Examples**

- Device X1 static: IP=192.168.0.50, Subnet 255.255.255.0.
- Device X2 static: IP=192.168.1.50, Subnet 255.255.255.0.
:::

:::danger
**Troubleshooting**

- Device restarts but is not reachable: Check if PC is in the same subnet again.
- When setting static IP, watch for IP conflicts (no other machine may have the same IP).
- Use ping \<IP> or arp -a (Windows/macOS) to check if the device responds.
:::

---
## **6) Access Web UI**

- In Companion: Click on Web UI (or open manually in browser http\://\<new-IP> — e.g., http\://192.168.0.50).
- Wait until the web interface loads. A login may be required.

:::tip
**Expected Result** The browser displays the Edge's Web UI (status, logs, configuration).
:::

:::danger
**Troubleshooting**

- Browser warns of insecure connection (HTTP or self-signed certificate) — allow secure exception if device is internal.
- If the page doesn't load: 
  - Ensure no proxy settings are interfering.
  - Check firewall rules on the PC.
  - Try another browser or curl http\://\<IP> in a terminal.
  - If HTTPS is expected, try https\://\<IP> (and accept certificate exception if necessary).
:::

---
## **Additional: Verify & reset PC network configuration**

- After everything is configured, reset the PC network settings to the original state (e.g., DHCP) if you changed them temporarily.
- Check reachability from the normal company network (if the device is to be operated there permanently): possibly connect device to the target network or adjust DNS/firewall.

### **Test commands**

- Windows: ping 192.168.0.50
- macOS / Linux: ping -c 4 192.168.0.50
- Display ARP cache: arp -a

## **Quick Summary / Checklist**

1. Start Companion.

2. Set PC IP to 192.168.0.x (X1) or 192.168.1.x (X2).

3. Click on Search in Companion.

4. Click on desired device in the list → Open details.

5. Select IP mode (DHCP or static) → Save → Restart device.

6. Open Web UI via button or http\://\<new-IP> in browser.

7. Reset PC network and check reachability.

---

## Device Functionality-Overview

## **Device Overview and Filter Functions**

In the main view, you see a table of all detected devices.

- **Filter:** To find devices specifically, you can use the integrated filter functions.
  - Via the filter settings, you can restrict the display according to various criteria (e.g., by software version, status, or device name).

![](../../../assets/images/fEsU4Tgiv5rMf52u00Dn9_filterfunktion-03.PNG)

![](../../../assets/images/91Sj4qOw6pTPBNNRp-R7T_filterfunktion-01.PNG)

![](../../../assets/images/1vriMLwZq3DOHPDBk_WWe_filterfunktion-02.PNG)

---
## **Edit Devices (Details)**

By selecting a device and clicking on the detail view (or a corresponding "Edit" function), you gain access to the following management options:

- **General Properties:** In the detail window, you can view and possibly edit basic device properties. This may include changing the device name or other device-specific settings.

![](../../../assets/images/zuEQB0BwmKGb16PNEvn5r_geratausgewahlt-details.PNG)

---
## **Change Network Settings**

To adjust the IP address or other network settings of a device:

1. Select the device in the overview.

2. Navigate to the **Network Settings** area.

2. ![](../../../assets/images/iFLuTBH7Xe0LZBy25NtM3_gerat-netzwerkeinstellungen.PNG)

3. Choose between **DHCP** (automatic address assignment by the network) or **Static IP** (fixed, manually assigned address).

4. For static IP, enter the new IP address, subnet mask, and gateway.

5. Save the changes. The device will adopt the new settings and will subsequently be reachable at the new address.

---
## **Software Update**

To update the software (firmware/OS) of an Edge device:

:::::WorkflowBlock
:::WorkflowBlockItem
Select the device and navigate to the Update function.

![](../../../assets/images/Tbs7EuB__xyQuCTAUFKLG_gerat-update.PNG)
:::

:::WorkflowBlockItem
The software will show you the currently installed version and available newer versions.
:::

:::WorkflowBlockItem
Select the desired version.
:::

::::WorkflowBlockItem
Start the update process. The device will download and install the update.

:::Paragraph{listStyleType="disc" indent="2"}
**CAUTION:** The update process can take several minutes. Do not restart the device during this time.
:::
::::
:::::

---
## **Data Export (CSV Files)**

To export specific data (e.g., configuration backups or logs) as a CSV file:

1. Select the device and navigate to the Export function.

1. ![](../../../assets/images/hnHo4SbJt79AAJ_X99TP5_gerat-export.PNG)

2. Choose the type of data to be exported (e.g., configuration, measurement data metadata, etc.).

3. Start the export. The data will be saved in CSV format (Comma Separated Values, a simple text format for storing tabular data) on your local computer.

---
## **Access to the WebUI**

You can access the web interface of the Edge device directly from the Crawler.Companion:

1. Select the device.

1. ![](../../../assets/images/AQBsjbgSpeFhSWDxvCRnA_allgemein-webui.PNG)

2. Look for the "Go to WebUI" button or a similar icon (often a browser icon).

2. ![](../../../assets/images/JgPz0VWonQwoAJWN-cxbc_geratausgewahlt-details-webui.PNG)

3. Your default web browser will open and connect to the IP address of the selected device.
