# Dileepkumar Bank Frontend Documentation

## Overview
Dileepkumar Bank Frontend is a premium, modern banking web application built with React, Vite, Redux Toolkit, and Redux Saga. It provides a secure, polished banking experience with distinct portals for **Premium Clients** (managing wealth, transfers, and insights) and **Bank Employees** (managing operations, KYC, and servicing).

## Why this project exists
This project demonstrates how a senior full-stack developer structures a scalable, corporate-grade financial web application with:
- A premium, bespoke UI using Vanilla CSS design tokens.
- Modular feature-based architecture (Customer Portal vs. Employee Console).
- Predictable state management via Redux Toolkit.
- Built-in UI testing (Vitest and React Testing Library).
- Comprehensive documentation and auditing.

## Architecture
- **App entry:** `src/main.jsx`
- **Routing:** `src/App.jsx`
- **Authentication:** `src/features/auth/components/Login.jsx` (Handles dynamic role-based routing)
- **Client Experience:** `src/features/dashboard/components/Dashboard.jsx`
- **Employee Experience:** `src/features/dashboard/components/EmployeeDashboard.jsx` & `EmployeeOperations.jsx`
- **Shared state:** `src/store/store.js` & `dashboardSlice.js`
- **Styling:** Global design tokens in `index.css` and feature-specific CSS modules.

## How to use it
1. Install dependencies with `npm install`.
2. Run security checks using `npm audit`. (Reports are saved in `reports/generated_reports/`).
3. Start the development server with `npm run dev`.
4. Open the login page.
5. **Client Login:** Sign in with any standard credentials to access the Portfolio Overview.
6. **Employee Login:** Type "employee" in the Client ID field to access the secure Employee Console.

## Advanced Features
- **Split-Screen Authentication:** Modern login layout featuring corporate branding.
- **Role-Based Views:** Employee operations include KYC verification, contact updates, and fee reversals.
- **Dynamic Assets:** Fully scalable CSS-driven SVGs for data visualization (Wealth Insights).

## Final result
The final result is a polished, highly proficient corporate banking frontend that serves both the end-user (clients) and the internal operations team (employees), complete with no known critical vulnerabilities and fully passing test suites.
