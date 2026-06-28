import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from './Login';
import authReducer from '../store/authSlice';

const createStore = () => configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe('Login', () => {
  it('switches between customer and employee sign-in flows', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/client access/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /employee console/i }));

    expect(screen.getByText(/employee sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/secure access for branch operations and servicing/i)).toBeInTheDocument();
  });
});
