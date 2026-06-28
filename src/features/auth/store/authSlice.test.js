import reducer, { loginSuccess, loginFailure, logout } from './authSlice';

describe('authSlice', () => {
  it('stores a sanitized user after login success', () => {
    const state = reducer(undefined, loginSuccess({
      token: 'demo-token',
      user: { name: 'Test User', role: 'Admin' },
    }));

    expect(state.token).toBe('demo-token');
    expect(state.user.name).toBe('Test User');
    expect(state.user.role).toBe('Admin');
  });

  it('clears auth state on failure', () => {
    const state = reducer({ token: 'abc', user: { name: 'A' }, error: null }, loginFailure('bad credentials'));

    expect(state.token).toBeNull();
    expect(state.error).toBe('bad credentials');
  });

  it('resets auth state on logout', () => {
    const state = reducer({ token: 'abc', user: { name: 'A' }, error: 'x' }, logout());

    expect(state.token).toBeNull();
    expect(state.error).toBeNull();
  });
});
