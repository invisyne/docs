---
title: "Visualizing Measured Values"
description: "The visualization platform Grafana is used for visualizing measured values and other data. It offers a wide range of options for displaying data."
---

:::tip
 Valid from Edge (Crawler) version = **2.7.1**
:::

## General information about visualization (Grafana)

- The visualization platform "Grafana" is used for visualizing measured values and other data.
- It offers a wide range of options for displaying data
- Depending on the data points and use case, various display options are available
- Multiple panels can be configured in a dashboard
- Each panel can include several measured variables and be configured individually.
- Tutorials and general tips & tricks for Grafana
  - [Grafana documentation | Grafana documentation ](https://grafana.com/docs/grafana/v7.4/)
  - [Tutorials | Grafana Labs](https://grafana.com/tutorials/)
  - [Tips for Designing Grafana Dashboards](https://www.percona.com/blog/designing-grafana-dashboards/)
  - …

![](../../../../assets/images/mEJxXv-fIiPj5ye_5oWQQ_4ef10733-2865-4726-99ab-70c1d6cba655.png)

:::note
ℹ The Edge (Crawler) uses Grafana version 7.4.
:::

---
## Viewer vs. Editor

No login is required to view previously configured dashboards. If you want to create new dashboards or panels, or edit existing ones, you must log in with an "Editor" account.

To log in, click the icon in the lower left area. You will then be prompted for a `username and password`.

![](../../../../assets/images/32agWcXqkSoIr_ihLngAm_a610a4b9-56d0-4802-b533-5ea9436d77d7.gif)

## Creating dashboards

To create a new dashboard, click the "+" symbol in the left menu bar and select "Dashboard". A page with a blank panel will open.

You can now add content to the dashboard and configure advanced settings.

![](../../../../assets/images/v-PF6ACKugWYgVL2vufIp_9b7a0d95-1c78-4029-82be-f8dfd8c4b5e7.png)

![](../../../../assets/images/pI0Ss8kjtveIQd3WdcMKc_2a350a82-24c9-45cc-9d51-534372fb16aa.png)

:::caution
For the dashboard to persist, it must first be **saved**. To do so, click the 💾 symbol in the upper right area.

In the dialog that opens, you can give the dashboard a name (can be changed later) and sort it into a folder. Then click "Save".
:::

![](https://app.archbee.com/api/optimize/5QJBvgamF9LtImfLB456o/JdMThWchYHqpthwj6FkU__a4af0ef0-8615-4fc5-8267-ff03ad19e583.gif "Creating and saving a new dashboard")

### Creating folders

Folders are used to organize dashboards. You can create as many folders as you like and assign dashboards to them.

![](../../../../assets/images/UBxOfgr4f7qQ_u1OuwGLK_258ba3a0-24d8-45c7-99b7-e25a6234ef5e.gif)

To create a folder, click the "+" symbol in the left menu and select "Folder" from the submenu.

Enter the desired name for the folder and confirm with "Create".

![](../../../../assets/images/g0MGUFIAINugOcd_gSDPf_6a18c1f6-ed48-4bd9-a17c-ad61c872fac8.png)

![](../../../../assets/images/dLspt0YbLdpmHIJ1p3Zto_62de681f-d95c-4329-a2c0-dd271ea2e8f4.png)

### Export/Import of dashboards

You can export dashboards and import them on another device or for restoration.

![](../../../../assets/images/pY8fJRbm7UDS-3f6ABJoQ_4273f10f-0b18-4624-b628-95db5f364dac.png)

Open a dashboard that you want to **export**. Click the "Share" symbol in the upper left area (next to the title) and select the "Export" option. Use "Save to file" to download the dashboard (settings and panels) as a file.

To **import** an exported dashboard, first click the "+" symbol in the left menu and select "Import". In the following dialog you can select the dashboard file (file extension = .json). You can then change the name, folder, and UID of the dashboard. If a dashboard with the same name or UID already exists, the corresponding information must be adjusted. You can also overwrite the existing dashboard.

![](https://app.archbee.com/api/optimize/5QJBvgamF9LtImfLB456o/CEqGG03aEmZ_WikrQHL1V_527135dd-01da-4713-a07b-a37fccfad451.gif "Export and import of a dashboard")

## Adding content to a dashboard

A dashboard consists mainly of so-called panels. These can be created and configured individually.

![](../../../../assets/images/HlERS388cP1Wbba7VFOyh_51d5dc27-a3cb-42e0-b6cb-928ab9854acc.png)

To create a new panel, click the "+" symbol in the upper right area (to the left of the save symbol).

A new panel is always inserted at the top and can then be placed individually within the dashboard. Select "+ Add new panel" in the added box. You will be directed to the editor page for a panel. This area allows configuration of the data source and the display.

![](../../../../assets/images/bCvzip4vhYgt_H5xLL8mR_5ad99297-d4e7-4ec6-8237-ff5befc7e1a3.gif)

### Selecting a measured variable

For data to be displayed in a panel, at least one measured variable must be selected. This is done in the lower area, below the display preview.

![](../../../../assets/images/BTGVpGd3Ghsgq_9K6oT7n_ddfe4ece-7576-400e-8087-cb2f38e8a9de.png)

1. **Select Measurement***:* Select source here. If this is not available for selection, no values have been recorded yet for configured measured variables. If you still want to set up the visualization, you can also enter source manually (note lowercase spelling).

2. **Select field device**: Click the "+" symbol to the right of "WHERE" and select "device\_name". Then click "select tag value" and choose the desired device.

3. **Select folder**: To select a measured variable, you must first select the folder in which the measured variable was created (see How-To: Adding measured variables, How-To: Editing configured measured variables). To do this, click the "+" symbol again and select "group\_\*". Then click "select tag value" and choose the desired folder. Repeat these steps until you have reached the target folder.

4. **Select measured variable**: Click the "+" symbol again and select "variable". Select the desired measured variable from the list. You can filter the selection by entering text.

Provided that values have already been recorded for the selected measured variable in the current time range, they should be shown in the preview area.

:::caution
If the selection of the measured variable has not yet been completed (e.g. only the device has been selected), values will already be displayed in the preview. These are not correct and represent a combination of multiple measured variables. It is therefore crucial to have selected a measured variable ("variable") at the end.
:::

![](../../../../assets/images/C_t2FQzv6JqaX_2r_2GUb_f8bcc5fe-4faf-4db2-8019-15d0c5adaa88.gif)

### Measured variables of type "String"

Measured variables that are stored in the Edge (Crawler) as a string `(e.g. S7_DWORD`, see *Specification: Protocols and Field Devices*) require a change to the "field" value. To do this, click on "value" in the "Select" area. Enter the text `"stringValue"` (⚠ note case sensitivity).

![](../../../../assets/images/ACfznD9vgz55KoiKz1Mnn_ba9efcf4-6e6e-4e77-9487-2df8bfad28ab.png)

### Changing and adjusting the display type ("Visualization")

![](../../../../assets/images/jRQNreJaNDKnXsqWuR_hR_901184c9-836a-4718-adeb-eab11323d625.png)

Grafana offers a variety of display options. These include charts (line, bar), individual values, gauges, or tables. Depending on the display type, different settings (axes, legend, colors, labels) can be configured. The official *documentation* and *tutorials* from Grafana are referenced here.

All settings can be made in the right-hand area.
