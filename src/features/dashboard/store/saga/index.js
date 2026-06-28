import { all } from 'redux-saga/effects';
import dashboardSaga from './dashboardSaga';

export default function* rootSaga() {
  yield all([
    dashboardSaga(),
  ]);
}