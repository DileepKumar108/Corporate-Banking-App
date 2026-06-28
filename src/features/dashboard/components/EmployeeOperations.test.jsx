import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import EmployeeOperations from './EmployeeOperations';
import authReducer from '../../auth/store/authSlice';

const createStore = () => configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe('EmployeeOperations', () => {
  it('renders the main banking operations workstreams', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter>
          <EmployeeOperations />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/portfolio overview/i)).toBeInTheDocument();
    expect(screen.getByText(/origination/i)).toBeInTheDocument();
    expect(screen.getByText(/aml alerts/i)).toBeInTheDocument();
    expect(screen.getByText(/beneficiary management/i)).toBeInTheDocument();
    expect(screen.getByText(/profile & kyc/i)).toBeInTheDocument();
    expect(screen.getByText(/quick transfer/i)).toBeInTheDocument();
  });
});
