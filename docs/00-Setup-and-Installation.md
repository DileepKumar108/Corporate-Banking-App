# 00: Setup and Installation 🛠️

Welcome to the Dileepkumar Bank Masterclass! Before we dive into the code, we need to set up your computer. Think of this as building your workshop before you start building the car.

## What You Need (The Required Software)

To run this massive enterprise application, you need three pieces of software installed on your computer:

1.  **Node.js**: This is the engine that runs our backend server. It allows us to write JavaScript outside of the browser.
    *   **How to get it:** Go to [nodejs.org](https://nodejs.org/) and download the "LTS" (Long Term Support) version. Run the installer.
2.  **Git**: This is our time machine and collaboration tool. It lets us download the code from GitHub.
    *   **How to get it:** Go to [git-scm.com](https://git-scm.com/) and download the installer for your operating system.
3.  **VS Code (Visual Studio Code)**: This is our code editor. It is where we will actually write and read the code.
    *   **How to get it:** Go to [code.visualstudio.com](https://code.visualstudio.com/) and install it.

---

## How to Set Up the Project

Once you have installed the software above, follow these exact steps to get the bank running on your computer.

### Step 1: Download the Code
Open your computer's terminal (or Command Prompt) and type this command to download the code from GitHub to your computer:
```bash
git clone https://github.com/DileepKumar108/Corporate-Banking-App.git
```
Next, move inside the folder you just downloaded:
```bash
cd Corporate-Banking-App
```

### Step 2: Install the Dependencies (The "Parts")
Our code relies on external tools (like React for the UI, and Express for the server). We need to download them. 

Because this is a **Monorepo** (two projects in one folder), we have to install dependencies twice.

First, install the Frontend dependencies:
```bash
npm install
```
*(Wait for this to finish...)*

Next, move into the backend folder and install the Backend dependencies:
```bash
cd backend
npm install
```

### Step 3: Start the Bank!
You need **two terminal windows** open because the Frontend and Backend run separately.

**Terminal 1 (The Backend Vault):**
Make sure you are in the `backend` folder, then run:
```bash
node server.js
```
*You should see a message saying "Secure Banking Backend running on port 3000".*

**Terminal 2 (The Frontend Interface):**
Open a new terminal, make sure you are in the main `Corporate-Banking-App` folder, and run:
```bash
npm run dev
```
*You should see a message saying the server is running on `http://localhost:5173`.*

---

## Success! 🎉
You can now open your web browser and go to `http://localhost:5173`. 
*   To log in as a customer, use the username `client` and password `client`.
*   To log in as a bank employee, use the username `employee` and password `employee`.

Next up, let's learn *why* we built this in **Lesson 01: The Introduction**.
