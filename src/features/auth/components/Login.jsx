import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailure, loginSuccess } from '../store/authSlice';
import logoImg from '../../../assets/logo.jpg';
import './Login.css'; // Let's create a specific CSS for this complex layout

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

      try { window.dispatchEvent(new Event('intro:stop')); } catch (e) { /* ignore */ }

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
    <div className="login-container">
      <div className="login-left-panel">
        <div className="brand-header">
          <img src={logoImg} alt="Dileepkumar Bank Logo" className="brand-logo" />
          <span className="brand-name">Dileepkumar Bank</span>
        </div>
        
        <div className="hero-content">
          <h1 className="heading-1" style={{ color: 'white' }}>Banking designed for modern life.</h1>
          <p className="hero-subtitle">Monitor your wealth, move money instantly, and stay in control with an intelligent digital experience.</p>
          
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🛡️</span>
              <span>Enterprise-Grade Security</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Real-Time Global Transfers</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Advanced Wealth Analytics</span>
            </div>
          </div>
        </div>
        
        <div className="hero-footer">
          <p>Trusted by Fortune 500 companies & premium clients worldwide.</p>
        </div>
      </div>

      <div className="login-right-panel">
        <div className="login-form-container card">
          <div className="mode-toggle">
            <button 
              className={`toggle-btn ${mode === 'customer' ? 'active' : ''}`} 
              type="button" 
              onClick={() => setMode('customer')}
            >
              Client Portal
            </button>
            <button 
              className={`toggle-btn ${mode === 'employee' ? 'active' : ''}`} 
              type="button" 
              onClick={() => setMode('employee')}
            >
              Employee Console
            </button>
          </div>
          
          <h2 className="heading-2">{mode === 'employee' ? 'Employee Sign In' : 'Client Access'}</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>
            {mode === 'employee' 
              ? 'Secure access for branch operations and servicing.' 
              : 'Sign in to access your secure corporate dashboard.'}
          </p>
          
          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="username" className="input-label">
                {mode === 'employee' ? 'Employee ID' : 'Client ID'}
              </label>
              <input
                id="username"
                className="input-field"
                value={form.username}
                onChange={(event) => setForm({ ...form, username: event.target.value })}
                placeholder={mode === 'employee' ? 'Enter Employee ID' : 'Enter Client ID'}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input
                id="password"
                type="password"
                className="input-field"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="Enter your password"
              />
            </div>
            
            <div className="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
            
            <button className="btn-primary full-width" type="submit">Secure Sign In</button>
          </form>

          <div className="demo-hint">
            <p><strong>Demo Note:</strong> Use any credentials. Type "employee" to access the employee view.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
