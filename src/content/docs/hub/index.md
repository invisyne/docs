---
title: "Hub Overview"
description: "Crawler.Hub is a web-based management platform for registered Edge (Crawler) devices."
---

Crawler.Hub is a web-based management platform for registered Edge (Crawler) devices. Users maintain a central overview of all their devices, firmware versions, and software downloads — without requiring direct device access. Visibility and access are determined by the assigned role.

## Functional Scope

Each account has a role — either **User** or **Admin**. Admins can additionally invite new users within their organization and assign roles.

### User

- **Devices** — Overview of all registered Edge (Crawler) devices with serial number, name, type, location, and firmware version. Click any device to open the detail view and edit its information (name, location, order number, delivery date, notes).*
- **Software** — Browse current and previous firmware and Companion App releases. Each version lists new features along with links to documentation, changelog, and download.
- **Account Settings** — Edit your personal details (name, email address) and change your password.

\* Name, location, order number, delivery date, and notes can be edited in the detail view.

### Admin

In addition to the above, administrators have access to:

- **User Management** — Invite users by email, assign roles (Admin or User), and manage access within the organization.

## Security Notes

- **Session timeout:** Hub automatically logs you out after a period of inactivity. Always log out manually on shared computers.
- **Two-factor authentication:** Hub uses email-based verification codes during login.
- **Role-based access:** Your access is limited to the functions assigned to your role.
- **HTTPS only:** Hub is accessible exclusively via an encrypted HTTPS connection.
