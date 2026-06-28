# 4. File System & Databases 💾

### What is it?
By default, if you save data to an array in Node.js, that data gets erased the second the server restarts or crashes. To make data permanent (persistent), you must write it to the File System (hard drive) or an external Database (like MongoDB or PostgreSQL).

### Real-World Analogy
Saving data to RAM is like writing on a whiteboard. If someone bumps the whiteboard, it erases. 
Saving data to a Database is like taking a photograph and putting it inside a fireproof safe. It will outlive the server itself.

### Why/When to use it
Any data that is critical (user accounts, passwords, transactions, balances) MUST be saved persistently. 

### Syntax & Code (Using File System)
```javascript
const fs = require('fs');

const userData = { username: "Dileep", balance: 5000 };

// We convert the Javascript Object into a JSON String, and save it to a file
fs.writeFile('database.json', JSON.stringify(userData), (err) => {
    if (err) throw err;
    console.log('Data permanently saved!');
});
```

### Dileepkumar Bank Example
For the masterclass, we built a lightweight local database using Node's `fs` (File System) module. We wrote a `saveDb()` function that took all the banking data and wrote it asynchronously to a `db.json` file. This ensured that even if we restarted the Node server, Dileep's $1,000,000 balance was safely remembered!
