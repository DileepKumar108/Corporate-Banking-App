import { useState } from 'react';
import { useSelector } from 'react-redux';

const DocumentManager = ({ isEmployee = false }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setStatus('');

    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await fetch('http://localhost:3000/api/documents/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) throw new Error('Upload failed');
      
      setStatus('File securely uploaded to the corporate vault.');
      setFile(null);
    } catch (err) {
      setStatus('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="card">
      <div className="card-header">
        <h3 className="heading-2" style={{ margin: 0 }}>Document Center</h3>
      </div>
      <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
        {isEmployee 
          ? 'Upload finalized contracts or download pending KYC packages.' 
          : 'Upload identity documents or download your monthly statements.'}
      </p>

      {status && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#ECFDF5', color: '#065F46', borderRadius: '8px' }}>
          {status}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Upload Zone */}
        <div style={{ border: '2px dashed var(--color-border)', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
          <h4 style={{ marginBottom: '1rem' }}>Secure Upload</h4>
          <form onSubmit={handleUpload}>
            <input 
              type="file" 
              onChange={handleFileChange} 
              style={{ marginBottom: '1rem' }} 
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <button 
              type="submit" 
              className="btn-primary full-width" 
              disabled={!file || uploading}
            >
              {uploading ? 'Encrypting & Uploading...' : 'Upload Document'}
            </button>
          </form>
        </div>

        {/* Download Links */}
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Available Downloads</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isEmployee ? (
              <>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <span>Pending_KYC_Batch_492.zip</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading secure packet...'); }} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Download</a>
                </li>
              </>
            ) : (
              <>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <span>June_2026_Statement.pdf</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading secure PDF...'); }} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Download</a>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <span>Tax_Form_1099_INT.pdf</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Downloading secure PDF...'); }} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Download</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DocumentManager;
