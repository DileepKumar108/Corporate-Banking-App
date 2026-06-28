import BankLayout from './BankLayout';

const SecurityPage = () => {
  return (
    <BankLayout title="Security Center" subtitle="Manage your authentication settings, devices, and login history." activePath="/security">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Column: Security Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section className="card">
            <h3 className="heading-2" style={{ marginBottom: '1.5rem' }}>Authentication Settings</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Two-Factor Authentication (2FA)</h4>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Requires a code from your Authenticator app when logging in.</p>
                </div>
                <button className="btn-secondary-sm" style={{ color: 'var(--color-success)', borderColor: 'var(--color-success)', padding: '0.5rem 1.5rem', borderRadius: '20px' }}>Enabled</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Biometric Login (FaceID / TouchID)</h4>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Use your device biometrics for faster mobile app access.</p>
                </div>
                <button className="btn-secondary-sm" style={{ padding: '0.5rem 1.5rem', borderRadius: '20px' }}>Enable</button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Change Password</h4>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Last changed 45 days ago.</p>
                </div>
                <button className="btn-secondary-sm" style={{ padding: '0.5rem 1rem' }}>Update</button>
              </div>

            </div>
          </section>

          <section className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 className="heading-2" style={{ margin: 0 }}>Recent Login Activity</h3>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '1rem 0.5rem' }}>Date & Time</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Device</th>
                  <th style={{ padding: '1rem 0.5rem' }}>Location / IP</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem' }}>Today, 10:42 AM</td>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>MacBook Pro (Chrome)</td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>San Francisco, CA (192.168.1.1)</td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'right', color: 'var(--color-success)', fontWeight: 600 }}>Current Session</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem' }}>Yesterday, 8:15 PM</td>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>iPhone 14 Pro (Safari)</td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>San Francisco, CA (10.0.0.45)</td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'right', color: 'var(--color-text-muted)' }}>Success</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem' }}>Oct 15, 2:30 AM</td>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>Unknown Windows PC</td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Moscow, RU (145.23.99.1)</td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'right', color: 'var(--color-danger)', fontWeight: 600 }}>Blocked (MFA)</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        {/* Right Column: Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section className="card" style={{ backgroundColor: 'var(--color-bg-main)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🛡️</span>
              <h4 style={{ margin: 0, fontWeight: 600 }}>Security Score: High</h4>
            </div>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Your account is well protected. You have enabled 2FA and have no weak passwords.
            </p>
            <button className="btn-secondary-sm full-width" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>Lock All Accounts Immediately</button>
          </section>
        </div>

      </div>
    </BankLayout>
  );
};

export default SecurityPage;
