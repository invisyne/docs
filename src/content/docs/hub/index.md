---
title: "Hub Overview"
description: "Crawler.Hub is a web-based management platform for registered Edge devices."
---

Crawler.Hub is the central web-based management portal for registered Edge devices. It gives teams a single access point to monitor all deployed devices, track firmware versions, and retrieve software downloads — without requiring physical or network access to individual devices.

Hub is designed for organizations operating multiple Edge units across different sites. Rather than managing each device in isolation, Hub aggregates everything relevant in one place: device status, installed firmware, location, and metadata. Software releases — both Edge firmware and Companion App updates — are published directly in Hub, making it the authoritative source for deployment-relevant downloads.

Access is governed by roles. Each user is assigned either the **User** or **Admin** role. Users can view devices and access software; Admins additionally manage user accounts and invitations for their organization.

<div class="screenshot-frame">
  <img src="/images/hub/hub-login.png" alt="Hub Login" />
</div>

## Functional Scope

Each account has a role — either **User** or **Admin**. Admins can additionally invite new users within their organization and assign roles.

<div class="screenshot-frame">
  <img src="/images/hub/hub-devices.png" alt="Hub Device Overview" />
</div>

<div class="role-badge">User</div>

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-card-title">Devices</div>
    <p>Overview of all registered Edge devices with serial number, name, type, location, and firmware version. Click any device to open the detail view.<sup>*</sup></p>
  </div>
  <div class="feature-card">
    <div class="feature-card-title">Software</div>
    <p>Browse current and previous firmware and Companion App releases. Each version lists new features along with links to documentation, changelog, and download.</p>
  </div>
  <div class="feature-card">
    <div class="feature-card-title">Account Settings</div>
    <p>Edit your personal details (name) and change your password.</p>
  </div>
</div>

<p class="feature-footnote">* Name, location, order number, delivery date, and notes can be edited in the detail view.</p>

<div class="role-badge">Admin</div>

<div class="feature-grid one-col">
  <div class="feature-card">
    <div class="feature-card-title">User Management</div>
    <p>Invite users by email, assign roles (Admin or User), and manage access within the organization.</p>
  </div>
</div>

<p class="feature-footnote">* Admins have access to all User features listed above, plus the additional capabilities shown here.</p>

## Security Notes

<div class="security-grid">
  <div class="security-item">
    <div class="security-item-title">Session Timeout</div>
    <p>Hub automatically logs you out after a period of inactivity. Always log out manually on shared computers.</p>
  </div>
  <div class="security-item">
    <div class="security-item-title">Account Setup</div>
    <p>Accounts are created by an admin. Login credentials are sent to you manually by the super admin. You can change your password at any time.</p>
  </div>
  <div class="security-item">
    <div class="security-item-title">Role-Based Access</div>
    <p>Your access is limited to the functions assigned to your role.</p>
  </div>
  <div class="security-item">
    <div class="security-item-title">HTTPS Only</div>
    <p>Hub is accessible exclusively via an encrypted HTTPS connection.</p>
  </div>
</div>
