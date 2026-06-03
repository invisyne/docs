---
title: "Hub Overview"
description: "Crawler.Hub is a web-based management platform for registered Edge (Crawler) devices."
---

Crawler.Hub is a web-based management platform for registered Edge (Crawler) devices. Users maintain a central overview of all their devices, firmware versions, and software downloads — without requiring direct device access. Visibility and access are determined by the assigned role.

<div class="screenshot-frame">
  <img src="../../../assets/images/hub/hub-login.png" alt="Hub Login" />
</div>

## Functional Scope

Each account has a role — either **User** or **Admin**. Admins can additionally invite new users within their organization and assign roles.

<div class="screenshot-frame">
  <img src="../../../assets/images/hub/hub-devices.png" alt="Hub Device Overview" />
</div>

<div class="role-badge">User</div>

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-card-title">Devices</div>
    <p>Overview of all registered Edge (Crawler) devices with serial number, name, type, location, and firmware version. Click any device to open the detail view.<sup>*</sup></p>
  </div>
  <div class="feature-card">
    <div class="feature-card-title">Software</div>
    <p>Browse current and previous firmware and Companion App releases. Each version lists new features along with links to documentation, changelog, and download.</p>
  </div>
  <div class="feature-card">
    <div class="feature-card-title">Account Settings</div>
    <p>Edit your personal details (name, email address) and change your password.</p>
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

## Security Notes

<div class="security-grid">
  <div class="security-item">
    <div class="security-item-title">Session Timeout</div>
    <p>Hub automatically logs you out after a period of inactivity. Always log out manually on shared computers.</p>
  </div>
  <div class="security-item">
    <div class="security-item-title">Two-Factor Authentication</div>
    <p>Hub uses email-based verification codes during login.</p>
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
