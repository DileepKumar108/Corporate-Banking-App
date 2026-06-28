import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    totalAssets: 128450,
    activeAccounts: 3,
    accounts: [
      { name: 'Platinum Checking', type: 'Everyday account', balance: 128450, number: '•••• 4821', status: 'Available' },
      { name: 'Savings Vault', type: 'High-yield savings', balance: 45800, number: '•••• 2189', status: 'Growing' },
      { name: 'Investment Hub', type: 'Wealth portfolio', balance: 95400, number: '•••• 3301', status: 'Watchlist' }
    ],
    cards: [
      { name: 'Elite World Elite Mastercard', number: '•••• 4821', balance: '$12,840', locked: false, limit: 15000 },
      { name: 'Vanguard Visa Infinite', number: '•••• 2189', balance: '$4,580', locked: false, limit: 10000 }
    ],
    recentTransactions: [
      { id: '1', date: 'Today', description: 'Salary deposit', amount: '8250.00', type: 'credit' },
      { id: '2', date: 'Yesterday', description: 'Utility bill', amount: '-132.50', type: 'debit' },
      { id: '3', date: 'Jun 24', description: 'Investment transfer', amount: '-2000.00', type: 'debit' }
    ],
    customers: [
      { id: 1, name: 'Ava Sharma', account: 'SB-1024', status: 'Active', balance: 18450, email: 'ava.sharma@nstar.com', phone: '+91 98765 43210', kycVerified: true, pepStatus: 'Low Risk' },
      { id: 2, name: 'Mohan Verma', account: 'CK-2048', status: 'Pending Review', balance: 7320, email: 'm.verma@outlook.com', phone: '+91 87654 32109', kycVerified: false, pepStatus: 'Medium Risk' },
      { id: 3, name: 'Pooja Singh', account: 'CR-3301', status: 'Active', balance: 2980, email: 'pooja.singh@gmail.com', phone: '+91 76543 21098', kycVerified: true, pepStatus: 'Low Risk' }
    ],
    fees: [
      { id: 'F1', description: 'Monthly Account Fee', amount: 15, date: 'Jun 20, 2026', status: 'Charged' },
      { id: 'F2', description: 'Late Payment Charge', amount: 35, date: 'Jun 15, 2026', status: 'Charged' },
      { id: 'F3', description: 'International Atm Fee', amount: 5, date: 'Jun 12, 2026', status: 'Charged' }
    ],
    security: {
      twoFactor: true,
      biometrics: true,
      limit: 5000
    }
  },
  selectedCustomerId: 1,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (state, action) => {
      state.loading = false;
      // Merge initial fields with payload if details are fetched
      state.data = { ...state.data, ...action.payload };
    },
    fetchDashboardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    makeTransfer: (state, action) => {
      const { amount, recipient } = action.payload;
      const numericAmount = parseFloat(amount);
      if (!isNaN(numericAmount) && numericAmount > 0) {
        // Deduct from primary checking
        state.data.accounts[0].balance -= numericAmount;
        // Re-sum total assets
        state.data.totalAssets = state.data.accounts.reduce((sum, acc) => sum + acc.balance, 0);
        // Log transaction
        state.data.recentTransactions.unshift({
          id: Date.now().toString(),
          date: 'Today',
          description: `Transfer to ${recipient}`,
          amount: `-${numericAmount.toFixed(2)}`,
          type: 'debit'
        });
      }
    },
    toggleCardLock: (state, action) => {
      const card = state.data.cards.find(c => c.number === action.payload);
      if (card) {
        card.locked = !card.locked;
      }
    },
    selectCustomer: (state, action) => {
      state.selectedCustomerId = action.payload;
    },
    createCustomer: (state, action) => {
      const { name, account, balance, status } = action.payload;
      const balanceNum = parseFloat(balance.replace(/[^0-9.-]+/g, '')) || 0;
      state.data.customers.push({
        id: Date.now(),
        name,
        account,
        status,
        balance: balanceNum,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@nstar.com`,
        phone: '+91 99999 88888',
        kycVerified: status === 'Active',
        pepStatus: 'Low Risk'
      });
    },
    updateCustomerStatus: (state, action) => {
      const { id, status } = action.payload;
      const customer = state.data.customers.find(c => c.id === id);
      if (customer) {
        customer.status = status;
        if (status === 'Active') customer.kycVerified = true;
      }
    },
    updateCustomerContact: (state, action) => {
      const { id, email, phone } = action.payload;
      const customer = state.data.customers.find(c => c.id === id);
      if (customer) {
        customer.email = email;
        customer.phone = phone;
      }
    },
    reverseFee: (state, action) => {
      const { customerId, feeId, amount } = action.payload;
      const customer = state.data.customers.find(c => c.id === customerId);
      const fee = state.data.fees.find(f => f.id === feeId);
      if (customer && fee && fee.status === 'Charged') {
        fee.status = 'Reversed';
        customer.balance += amount;
      }
    },
    verifyKyc: (state, action) => {
      const customer = state.data.customers.find(c => c.id === action.payload);
      if (customer) {
        customer.kycVerified = true;
        customer.status = 'Active';
      }
    }
  },
});

export const {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  makeTransfer,
  toggleCardLock,
  selectCustomer,
  createCustomer,
  updateCustomerStatus,
  updateCustomerContact,
  reverseFee,
  verifyKyc
} = dashboardSlice.actions;

export default dashboardSlice.reducer;