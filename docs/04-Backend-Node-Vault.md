# 04: Backend Node Vault 🟢

In the previous lesson, we built the visual buttons for the user to click. But remember: the Frontend lives on the user's computer, which means it is untrusted. We need a secure server to actually process the math and store the data permanently.

Open the file located at `backend/server.js`.

This is a **Node.js** file. Node.js is an engine that takes JavaScript (which normally only runs inside a web browser) and lets it run on a computer like a regular program. 

We also use a tool called **Express.js**, which makes it incredibly easy to open "doors" (API routes) on our server so the Frontend can talk to it.

## The API Route (The Security Checkpoint)

Let's look at the exact code we wrote to process a Wire Transfer in Dileepkumar Bank.

```javascript
// --- TRANSACTIONS ROUTES ---
app.post('/api/transactions', authenticateToken, (req, res) => {
  
  // 1. Unpack the data the user sent
  const { recipient, swiftBic, amount } = req.body;
  
  // 2. Convert text to a strict number
  const numAmount = parseFloat(amount);
  
  // 3. Security Check!
  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'Invalid transaction amount. Must be positive.' });
  }

  // 4. Save to Database
  const newTx = {
    id: Date.now(),
    recipient: recipient,
    amount: numAmount,
    status: 'Completed'
  };
  db.transactions.unshift(newTx);
  saveDb();

  // 5. Send success message back to Frontend
  res.status(201).json(newTx);
});
```

## Line-by-Line Breakdown

### 1. Opening the Door
```javascript
app.post('/api/transactions', authenticateToken, (req, res) => {
```
*   **`app.post`**: We are defining an API endpoint that listens for incoming `POST` requests. A `POST` request means "I am sending you a package of new data to save". (A `GET` request means "Please hand me some data to read").
*   **`'/api/transactions'`**: This is the URL address of this specific door on the server.
*   **`authenticateToken`**: This is a piece of "Middleware" (like a bouncer at a club). Before it even lets the code run, it checks if the user has a valid VIP wristband (a JWT Token). If they don't, it immediately rejects the request.
*   **`(req, res) => {`**: We are given two extremely important tools to use inside this function:
    *   **`req` (Request)**: The incoming package from the user. It contains the data they typed in.
    *   **`res` (Response)**: A megaphone we use to shout our answer back to the user across the internet.

### 2. Unpacking the Data
```javascript
  const { recipient, swiftBic, amount } = req.body;
  const numAmount = parseFloat(amount);
```
*   **`req.body`**: This is the actual data package the Frontend sent us. We are pulling out the `recipient`, `swiftBic`, and `amount`.
*   **`parseFloat`**: When data travels across the internet, it is often sent as raw text (e.g., `"500.50"`). If we tried to do math with text, JavaScript would get confused and crash. `parseFloat` forces the text to convert into a strict decimal number.

### 3. The Security Gate (Input Validation)
```javascript
  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'Must be positive.' });
  }
```
This is critical enterprise security. If we don't write this, a hacker could send an amount of `-50000`, essentially stealing money.
*   **`if`**: The logic gate.
*   **`isNaN`**: "Is Not A Number". We check if the hacker tried to send us letters instead of a number.
*   **`||`**: The "OR" symbol. It means "If the first thing is true, OR if the second thing is true, do the code inside."
*   **`return`**: Instantly stop running the rest of the code!
*   **`res.status(400).json(...)`**: Use the `res` megaphone to yell an error back to the Frontend. `400` is the universal internet code for "Bad Request" (meaning the user messed up).

### 4. Saving the Data
```javascript
  const newTx = {
    id: Date.now(),
    recipient: recipient,
    amount: numAmount,
    status: 'Completed'
  };
  db.transactions.unshift(newTx);
  saveDb();
```
*   **`const newTx = {}`**: We create a new Object (a container holding related data).
*   **`Date.now()`**: We assign it a unique ID based on the exact millisecond in time.
*   **`unshift(newTx)`**: We take this new transaction and shove it into the very front of our database array.
*   **`saveDb()`**: We call our custom function to permanently write this new array to the `db.json` hard drive file.

### 5. Replying to the Frontend
```javascript
  res.status(201).json(newTx);
});
```
*   **`res.status(201)`**: The code `201` is the universal internet code for "Created Successfully".
*   **`.json(newTx)`**: We send the final, saved transaction data back to the Frontend as a JSON package. The Frontend React code will receive this and use it to update the user's screen with a green checkmark!

---
Next up, we will look at how we built the brilliant mathematical logic in **Lesson 05: Banking Algorithms**.
