import { put, takeLatest } from 'redux-saga/effects';
import { fetchDashboardFailure, fetchDashboardSuccess } from '../dashboardSlice';

const demoPayload = {
  totalAssets: 128450,
  activeAccounts: 4,
  recentTransactions: [
    { date: 'Today', description: 'Salary deposit', amount: '8250.00' },
    { date: 'Yesterday', description: 'Utility bill', amount: '132.50' },
    { date: 'Jun 24', description: 'Investment transfer', amount: '2000.00' },
  ],
};

function* fetchDashboardDataSaga() {
  try {
    yield put(fetchDashboardSuccess(demoPayload));
  } catch (error) {
    yield put(fetchDashboardFailure(error.message || 'Unable to load dashboard data.'));
  }
}

export default function* dashboardSaga() {
  yield takeLatest('dashboard/fetchDashboardStart', fetchDashboardDataSaga);
}