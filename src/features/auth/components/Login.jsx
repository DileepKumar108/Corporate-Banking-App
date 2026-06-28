import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailure, loginSuccess } from '../store/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ username: '', password: '' });
  const [mode, setMode] = useState('customer');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.username.trim() && form.password.trim()) {
      const isEmployee = mode === 'employee' || form.username.toLowerCase().includes('employee') || form.username.toLowerCase().includes('bank');
      const role = isEmployee ? 'Bank Employee' : 'Premium Client';
      const name = isEmployee ? 'Riya Menon' : 'Aarav Rao';

      // signal the intro video to stop (if playing)
      try { window.dispatchEvent(new Event('intro:stop')); } catch (e) {}

      dispatch(loginSuccess({
        token: 'demo-token',
        user: {
          name,
          role,
          lastLogin: 'Today, 08:42 AM',
        },
      }));

      navigate(isEmployee ? '/employee' : '/dashboard');
      return;
    }

    dispatch(loginFailure('Please enter your credentials to continue.'));
  };

  return (
    <div className="app-shell">
      <div className="login-card">
        <div className="login-hero">
          <div>
            <p className="muted">Dileepkumar Bank</p>
            <h1>Banking designed for modern life.</h1>
            <p>Monitor your wealth, move money instantly, and stay in control with an intelligent digital experience.</p>
            <div className="hero-highlights">
              <span className="hero-pill">24/7 digital support</span>
              <span className="hero-pill">Real-time insights</span>
              <span className="hero-pill">Secure transfers</span>
            </div>
          </div>
          <p className="muted">Trusted by 2.3M+ customers worldwide.</p>
        </div>

        <div className="login-form-panel">
          <div className="mode-switcher">
            <button className={`mode-pill ${mode === 'customer' ? 'active' : ''}`} type="button" onClick={() => setMode('customer')}>Customer sign in</button>
            <button className={`mode-pill ${mode === 'employee' ? 'active' : ''}`} type="button" onClick={() => setMode('employee')}>Bank employee</button>
          </div>
          <h2>{mode === 'employee' ? 'Employee sign in' : 'Welcome back'}</h2>
          <p>{mode === 'employee' ? 'Access customer servicing, approvals and branch operations.' : 'Sign in to continue to your secure dashboard.'}</p>
          {error ? <div className="error-banner">{error}</div> : null}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">{mode === 'employee' ? 'Employee ID' : 'Customer ID'}</label>
              <input
                id="username"
                value={form.username}
                onChange={(event) => setForm({ ...form, username: event.target.value })}
                placeholder={mode === 'employee' ? 'Enter employee ID' : 'Enter customer ID'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="Enter password"
              />
            </div>
            <div className="form-actions">
              <button className="primary-btn" type="submit">Sign in</button>
              <button className="secondary-btn" type="button">Register</button>
            </div>
          </form>

          <p className="inline-note">Demo credentials: use any non-empty values. Type “employee” or “bank” in the ID field to enter the employee console.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
