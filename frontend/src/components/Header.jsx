import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header style={{ 
      background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--primary-bg) 100%)', 
      boxShadow: 'var(--shadow-lg)', 
      borderBottom: '2px solid var(--primary-light)' 
    }}>
      <div className="container">
        <div className="flex justify-between items-center" style={{ height: '72px' }}>
          <div className="flex items-center gap-md">
            <img 
              src="/icon.svg" 
              alt="TypeRush" 
              style={{ width: '40px', height: '40px' }}
            />
            <h1 className="text-title" style={{ color: 'var(--primary)', margin: '0' }}>
              TypeRush
            </h1>
          </div>
          
          <div className="flex items-center gap-lg">
            <div className="flex flex-col items-center">
              <span className="text-small" style={{ color: 'var(--text-secondary)' }}>
                {user.email}
              </span>
            </div>
            
            <div className="card card-compact" style={{ 
              background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              minWidth: '120px'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {user.highestWPM}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: '0.9' }}>
                Best WPM
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="btn btn-outline"
              style={{ fontSize: '0.875rem', padding: 'var(--space-sm) var(--space-md)' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
