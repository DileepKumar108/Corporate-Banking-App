import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../../auth/store/authSlice';
import logo from '../../../assets/logo.jpg';
import './BankLayout.css';

const BankLayout = ({ title, subtitle, children, activePath, role = 'customer' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const navItems = role === 'employee'
    ? [
        { to: '/employee', label: 'Operations Overview' },
        { to: '/employee-operations', label: 'Customer Servicing' },
        { to: '/corporate', label: 'Corporate Accounts' },
      ]
    : [
        { to: '/dashboard', label: 'Portfolio Overview' },
        { to: '/accounts', label: 'Accounts & Cards' },
        { to: '/payments', label: 'Payments' },
        { to: '/transfers', label: 'Global Transfers' },
        { to: '/insights', label: 'Wealth Insights' },
        { to: '/statements', label: 'Documents' },
        { to: '/security', label: 'Security Center' },
      ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Dileepkumar Bank" className="sidebar-logo" />
          <div className="sidebar-brand">
            <h2>Dileepkumar Bank</h2>
            <span className="badge">{role === 'employee' ? 'Employee Console' : 'Premium Client'}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive || activePath === item.to ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{role === 'employee' ? 'RM' : 'AR'}</div>
            <div className="user-info">
              <span className="user-name">{role === 'employee' ? 'Riya Menon' : 'Aarav Rao'}</span>
              <span className="user-role">{role === 'employee' ? 'Senior Operations' : 'Client ID: 9021-X'}</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout} title="Logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="page-header">
            <h1 className="heading-1" style={{ marginBottom: '0.25rem' }}>{title}</h1>
            <p className="text-muted">{subtitle}</p>
          </div>
          
          <div className="topbar-actions">
            <button 
              className="icon-btn" 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <button className="icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>
            <button className="btn-accent">Get Support</button>
          </div>
        </header>
        
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

BankLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  activePath: PropTypes.string,
  role: PropTypes.oneOf(['customer', 'employee']),
};

export default BankLayout;
