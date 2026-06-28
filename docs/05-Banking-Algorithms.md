# 05: Banking Algorithms 🧮

When you graduate from junior developer to senior developer, you stop just building forms and start building *business logic*. 

Business logic is the brain of the company. In Dileepkumar Bank, we have two massive algorithms running on our Node.js backend: The Underwriting Engine and the Fraud Engine.

## 1. The Underwriting Engine (Automating Loans)

In the old days, when a customer applied for a loan, a human underwriter had to sit down, look at their income, look at their debts, and do complex math to decide if the bank should lend them money.

We automated this in `server.js` using math operators.

```javascript
// Step 1: Extract the numbers the user typed into the form
const monthlyIncome = parseFloat(annualIncome) / 12;
const monthlyDebts = parseFloat(existingDebts);

// Step 2: Calculate Debt-to-Income Ratio (DTI)
const dti = ((monthlyDebts / monthlyIncome) * 100).toFixed(1);

// Step 3: Simulate a FICO Credit Score
let simulatedFico = 850 - (parseFloat(dti) * 3);

if (parseFloat(totalAssets) > 50000) {
  simulatedFico = simulatedFico + 50; // Give a bonus for high assets
}

// Ensure the FICO score stays between 500 and 850
simulatedFico = Math.min(850, Math.max(500, simulatedFico));

// Step 4: Issue a System Recommendation
let systemRecommendation = 'Review Required';

if (parseFloat(dti) < 36 && simulatedFico > 720) {
  systemRecommendation = 'APPROVE - Low Risk';
} else if (parseFloat(dti) > 50 || simulatedFico < 600) {
  systemRecommendation = 'REJECT - High Risk';
}
```

### The Breakdown:
*   **Math Operators:** We use standard math: `/` (Divide), `*` (Multiply), `-` (Subtract), `+` (Add).
*   **The DTI Math:** If a user makes $1000/month and has $400/month in debt, `(400 / 1000) * 100 = 40%`. Their DTI is 40%.
*   **`toFixed(1)`**: This forces the number to only have 1 decimal place (e.g., `40.5%`), preventing crazy numbers like `40.5391823%` from breaking our UI.
*   **`Math.min()` and `Math.max()`**: Credit scores (FICO) legally must be between a certain range. We use `Math.max(500, score)` to ensure the score never drops below 500. We then wrap that in `Math.min(850, result)` to ensure it never goes above a perfect 850.
*   **Logic Gates (`&&`, `||`)**: 
    *   `&&` (AND): The user only gets "APPROVED" if their DTI is low **AND** their FICO is high. Both must be true.
    *   `||` (OR): The user gets "REJECTED" if their DTI is too high **OR** their FICO is too low. If even one is true, they are rejected.

## 2. The AML Fraud Engine (Catching Criminals)

Anti-Money Laundering (AML) laws require banks to report any transaction over $10,000 to the government using a CTR (Currency Transaction Report). 

Instead of forcing employees to read every single transaction, we built a net to catch them automatically.

```javascript
app.post('/api/transactions', (req, res) => {
  const numAmount = parseFloat(req.body.amount);
  const swiftBic = req.body.swiftBic;
  
  let isFlagged = false;
  let riskScore = Math.floor(Math.random() * 20) + 10; // Base score 10-30

  // 1. Check for Massive Amounts
  if (numAmount >= 10000) {
    isFlagged = true;
    riskScore += 50; // CTR/AML trigger!
  }

  // 2. Check for High-Risk Destinations
  if (swiftBic && swiftBic.startsWith('RU')) { 
    isFlagged = true;
    riskScore += 60; // Sanction Watchlist!
  }

  // 3. Apply the results
  const newTx = {
    amount: numAmount,
    status: isFlagged ? 'Frozen (Fraud Review)' : 'Completed',
    flagged: isFlagged,
    riskScore: Math.min(riskScore, 100) // Max score of 100
  };
});
```

### The Breakdown:
*   **`isFlagged = false`**: We start by assuming every transaction is innocent.
*   **`swiftBic.startsWith('RU')`**: We use a built-in String function to check the first two letters of the SWIFT routing code. If it starts with 'RU' (mocking a sanctioned country), we instantly trigger the alarm.
*   **The Ternary Operator (`? :`)**: 
    `isFlagged ? 'Frozen' : 'Completed'`
    This is a super-fast way to write an `if/else` statement on a single line! 
    It asks a question: "Is it flagged?" 
    If True (Left side of colon): The status becomes `'Frozen'`. 
    If False (Right side of colon): The status becomes `'Completed'`.

By writing these two simple algorithms, we saved Dileepkumar Bank thousands of hours of manual labor!

---
In the final lesson, we will look at how we secured this application from hackers in **Lesson 06: Security & Scaling**.
