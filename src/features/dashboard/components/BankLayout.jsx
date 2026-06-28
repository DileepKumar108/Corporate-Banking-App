import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../auth/store/authSlice';
import logo from '../../../assets/dk-logo.svg';

const BankLayout = ({ title, subtitle, children, activePath, role = 'customer' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = role === 'employee'
    ? [
        { to: '/employee', label: 'Overview' },
        { to: '/employee-operations', label: 'Operations' },
        { to: '/corporate', label: 'Corporate' },
      ]
    : [
        { to: '/dashboard', label: 'Overview' },
        { to: '/accounts', label: 'Accounts' },
        { to: '/cards', label: 'Cards' },
        { to: '/payments', label: 'Payments' },
        { to: '/transfers', label: 'Transfers' },
        { to: '/insights', label: 'Insights' },
        { to: '/statements', label: 'Statements' },
        { to: '/security', label: 'Security' },
        { to: '/rewards', label: 'Rewards' },
      ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <div className="bank-shell">
        <aside className="sidebar">
          <div>
            <div className="brand-block">
              <img src={logo} alt="Dileepkumar Bank logo" className={`brand-logo animate`} />
              <div>
                <h3>Dileepkumar Bank</h3>
                <p className="muted">{role === 'employee' ? 'Bank Operations' : 'Digital Banking'}</p>
              </div>
            </div>

            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-link${isActive || activePath === item.to ? ' active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <button className="primary-btn full-width" type="button">
            Need help?
          </button>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div>
              <p className="muted">Premium experience</p>
              <h1>{title}</h1>
              <p className="muted">{subtitle}</p>
            </div>
            <div className="header-actions">
              <button className="secondary-btn" type="button">Support</button>
              <button className="primary-btn" type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>
          {children}
        </main>
      </div>
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
