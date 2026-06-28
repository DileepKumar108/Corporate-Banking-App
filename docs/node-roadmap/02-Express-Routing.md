# 2. Express Routing 🛤️

### What is it?
Express is a framework for Node.js. "Routing" is how Express determines what should happen when a user makes a request to a specific URL (like `/api/login` or `/api/transfer`).

### Real-World Analogy
Imagine a massive post office. A mail truck arrives with 1,000 letters. A router is a worker standing at the front door. They look at the envelope, see the address says "Dept A", and route it to Dept A. If it says "Dept B", they route it to Dept B.

### Why/When to use it
You use routing to build RESTful APIs. Every single action a user can take in your app needs its own specific route and HTTP method (GET to read, POST to create, PUT to update, DELETE to remove).

### Syntax & Code
```javascript
const express = require('express');
const app = express();

// GET request to /api/balance
app.get('/api/balance', (req, res) => {
    res.json({ balance: 500 });
});

// POST request to /api/deposit
app.post('/api/deposit', (req, res) => {
    // Code to add money goes here
    res.send("Deposit successful!");
});
```

### Dileepkumar Bank Example
In our backend `server.js`, we built routes like `app.post('/api/transfer')`. When the React frontend wants to send a wire transfer, it fires a POST request to that exact URL. The Express router catches the request and triggers our banking algorithm!
