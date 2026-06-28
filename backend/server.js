require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { authenticateToken, requireRole } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });

app.use(helmet()); 
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); 
app.use(express.json());

// Persistent JSON Database
const dbFile = path.join(__dirname, 'db.json');
let db = { users: [], applications: [], transactions: [] };

const loadDb = () => {
  if (fs.existsSync(dbFile)) {
    db = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  }
};
const saveDb = async () => {
  try {
    await fs.promises.writeFile(dbFile, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Failed to save DB asynchronously:', err);
  }
};

const seedUsers = async () => {
  loadDb();
  if (db.users.length === 0) {
    const hash1 = await bcrypt.hash('client', 10);
    db.users.push({ id: 1, username: 'client', password: hash1, role: 'client' });
    const hash2 = await bcrypt.hash('employee', 10);
    db.users.push({ id: 2, username: 'employee', password: hash2, role: 'employee' });
    saveDb();
    console.log('Database seeded with default users.');
  }
};
seedUsers();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts.' }
});

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests. Please try again later.' }
});
app.use('/api/', globalLimiter);

// --- AUTHENTICATION ROUTES ---
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const user = db.users.find(u => u.username === username.toLowerCase());
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, role: user.role });
});

// --- TRANSACTIONS ROUTES ---
app.post('/api/transactions', authenticateToken, (req, res) => {
  const { recipient, recipientAddress, swiftBic, purpose, amount } = req.body;
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'Invalid transaction amount. Must be positive.' });
  }
  
  // Fraud Engine Logic
  let isFlagged = false;
  let riskScore = Math.floor(Math.random() * 20) + 10; // Base risk 10-30

  if (numAmount >= 10000) {
    isFlagged = true;
    riskScore += 50; // CTR/AML trigger
  }
  if (swiftBic && swiftBic.startsWith('RU')) { // Mock high risk country
    isFlagged = true;
    riskScore += 60;
  }

  const newTx = {
    id: Date.now(),
    userId: req.user.id,
    sender: req.user.username,
    recipient,
    recipientAddress,
    swiftBic,
    purpose,
    amount: numAmount,
    status: isFlagged ? 'Frozen (Fraud Review)' : 'Completed',
    flagged: isFlagged,
    riskScore: Math.min(riskScore, 100),
    timestamp: new Date().toISOString()
  };
  db.transactions.unshift(newTx);
  saveDb();
  res.status(201).json(newTx);
});

app.get('/api/admin/transactions', authenticateToken, requireRole('employee'), (req, res) => {
  res.json(db.transactions);
});

app.post('/api/admin/transactions/:id/flag', authenticateToken, requireRole('employee'), (req, res) => {
  const tx = db.transactions.find(t => t.id === parseInt(req.params.id));
  if (!tx) return res.status(404).json({ error: 'Transaction not found' });
  tx.flagged = !tx.flagged;
  tx.status = tx.flagged ? 'Frozen (Fraud Review)' : 'Completed';
  saveDb();
  res.json({ message: `Transaction ${tx.flagged ? 'flagged' : 'unflagged'} successfully.` });
});

// --- APPLICATIONS ROUTES ---
app.post('/api/applications/loan', authenticateToken, (req, res) => {
  const { fullName, ssn, employment, annualIncome, loanAmount, loanType, purpose, existingDebts, totalAssets } = req.body;
  
  // Underwriting Engine Logic
  const monthlyIncome = parseFloat(annualIncome) / 12;
  const monthlyDebts = parseFloat(existingDebts);
  const dti = monthlyIncome > 0 ? ((monthlyDebts / monthlyIncome) * 100).toFixed(1) : 100;
  
  // Simulate FICO based on inputs
  const simulatedFico = Math.min(850, Math.max(500, 850 - (parseFloat(dti) * 3) + (parseFloat(totalAssets) > 50000 ? 50 : 0)));
  
  let systemRecommendation = 'Review Required';
  if (parseFloat(dti) < 36 && simulatedFico > 720) systemRecommendation = 'APPROVE - Low Risk';
  if (parseFloat(dti) > 50 || simulatedFico < 600) systemRecommendation = 'REJECT - High Risk';

  const newApp = {
    id: Date.now(),
    userId: req.user.id,
    fullName,
    ssn: 'XXX-XX-' + (ssn || '0000').slice(-4), // Masked
    employment,
    annualIncome: parseFloat(annualIncome),
    loanAmount: parseFloat(loanAmount),
    loanType,
    purpose,
    existingDebts: parseFloat(existingDebts),
    totalAssets: parseFloat(totalAssets),
    underwriting: {
      dti: parseFloat(dti),
      fico: Math.round(simulatedFico),
      recommendation: systemRecommendation
    },
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  db.applications.unshift(newApp);
  saveDb();
  res.status(201).json({ message: 'Underwriting application submitted securely!', applicationId: newApp.id });
});

app.get('/api/admin/applications', authenticateToken, requireRole('employee'), (req, res) => {
  res.json(db.applications);
});

app.post('/api/applications/:id/status', authenticateToken, requireRole('employee'), (req, res) => {
  const app = db.applications.find(a => a.id === parseInt(req.params.id));
  if (!app) return res.status(404).json({ error: 'Application not found' });
  app.status = req.body.status;
  saveDb();
  res.json({ message: `Application marked as ${app.status}` });
});

// --- DOCUMENTS ROUTES ---
app.post('/api/documents/upload', authenticateToken, upload.single('document'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'File securely uploaded', filename: req.file.filename });
});

app.get('/api/documents/download/:filename', authenticateToken, (req, res) => {
  // Prevent Path Traversal by extracting only the base filename
  const safeFilename = path.basename(req.params.filename);
  const filePath = path.join(__dirname, 'uploads', safeFilename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found' });
  res.download(filePath);
});

// --- DASHBOARD ROUTE ---
app.get('/api/dashboard/me', authenticateToken, (req, res) => {
  res.json({
    message: `Welcome back, ${req.user.username}`,
    secureData: { assets: 125000, accountStatus: 'Active' },
    transactions: db.transactions.filter(t => t.userId === req.user.id)
  });
});

app.delete('/api/admin/accounts/:id', authenticateToken, requireRole('employee'), (req, res) => {
  const userIndex = db.users.findIndex(u => u.id === parseInt(req.params.id) && u.role === 'client');
  if (userIndex === -1) return res.status(404).json({ error: 'Client not found' });
  db.users.splice(userIndex, 1);
  saveDb();
  res.json({ message: 'Client account deleted.' });
});

app.listen(PORT, () => console.log(`Secure Banking Backend running on port ${PORT}`));
