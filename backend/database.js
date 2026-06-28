const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'bank.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Initialize tables
    db.serialize(() => {
      // Users Table
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
      )`);

      // Applications Table
      db.run(`CREATE TABLE IF NOT EXISTS loan_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        fullName TEXT,
        annualIncome INTEGER,
        loanAmount INTEGER,
        purpose TEXT,
        status TEXT DEFAULT 'Pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id)
      )`);

      // Seed initial data if empty
      db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
        if (row && row.count === 0) {
          const insert = 'INSERT INTO users (username, password, role) VALUES (?,?,?)';
          const saltRounds = 10;
          
          // Seed a client
          bcrypt.hash('client', saltRounds, (err, hash) => {
            db.run(insert, ['client', hash, 'client']);
          });
          
          // Seed an employee
          bcrypt.hash('employee', saltRounds, (err, hash) => {
            db.run(insert, ['employee', hash, 'employee']);
          });
          
          console.log('Database seeded with default users: client / client, employee / employee');
        }
      });
    });
  }
});

module.exports = db;
