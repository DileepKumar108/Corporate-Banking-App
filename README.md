# 🏦 Dileepkumar Bank: Enterprise Banking Portal

Welcome to the **Dileepkumar Bank** repository. This project is a hyper-realistic, enterprise-grade banking application built to demonstrate state-of-the-art web security, complex financial data modeling, and stunning UI/UX design.

This application is built as a **Monorepo** containing both the Customer/Retail portal and the Employee/Operations console.

---

## 🌟 The Dileepkumar Bank Experience

Dileepkumar Bank is built on the philosophy of uncompromising security, deep financial analytics, and a premium customer experience. We designed this application to perfectly mimic the architecture and compliance requirements of a Tier-1 Global Financial Institution.

### 🛡️ For Customers (Retail Portal)
When clients log into their Dileepkumar Bank portal, they are greeted with a premium, secure dashboard featuring:
*   **Global SWIFT Wire Transfers:** A fully compliant OFAC/AML wire form requiring BIC/SWIFT routing and remittance justifications.
*   **Wealth Insights:** Real-time analytics breaking down their cash flow, spending habits, and savings goals.
*   **Card Management:** Interactive digital mockups of their "Dileepkumar Reserve" physical cards, with the ability to instantly freeze compromised cards.
*   **Security Center:** Advanced privacy controls including Two-Factor Authentication (2FA) toggles and full historical IP login logs.

### 💼 For Employees (Operations Console)
Bank tellers, underwriters, and relationship managers have access to a completely separate workspace:
*   **Automated Underwriting Engine:** When a client applies for a loan, the backend automatically calculates their Debt-to-Income (DTI) ratio, simulates a FICO score, and issues a strict *Approve/Reject* recommendation.
*   **Real-time Fraud Monitoring:** Every transaction is scored. Transactions over $10,000 automatically trigger CTR (Currency Transaction Reports) and require an employee to either approve or "Freeze & File SAR" (Suspicious Activity Report).
*   **Corporate Treasury:** A dedicated interface for managing institutional clients with multi-million dollar credit facilities and payroll processing batches.

---

## 🛠️ Technology Stack & Architecture

This repository is structured to hold both the frontend and backend in a unified workspace.

*   **Frontend (`/src`)**: A high-performance React application built with Vite and Redux for global state management. Styled with pure Vanilla CSS to ensure maximum control over the deep navy blue and gold aesthetic.
*   **Backend (`/backend`)**: A highly secure Node.js & Express server featuring:
    *   **Asynchronous I/O:** Non-blocking file reads/writes for maximum concurrency.
    *   **Rate Limiting & Anti-DDoS:** Global middleware to prevent API abuse.
    *   **Strict Security Middleware:** Hardened CORS policies, Helmet for HTTP headers, and robust Path Traversal prevention.

## 🚀 How to Run Locally

Because this is a full-stack monorepo, you will need to start both the backend server and the frontend client.

### 1. Start the Backend
The backend runs the API, the underwriting engines, and the secure mock database.
```bash
cd backend
npm install
node server.js
```
*The backend will spin up securely on `http://localhost:3000`.*

### 2. Start the Frontend
In a new terminal window, start the React application.
```bash
npm install
npm run dev
```
*The frontend will spin up on `http://localhost:5173`.*

### 3. Log In
Open your browser to `http://localhost:5173`. You can log in using our default seeded accounts:
*   **Customer Portal:** Username: `client` | Password: `client`
*   **Employee Portal:** Username: `employee` | Password: `employee`

---

*Dileepkumar Bank — Securing your wealth, innovating your future.*
