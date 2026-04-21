import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onOpenSearch }) {
  return (
    <header className="navbar-header" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      position: 'relative',
      zIndex: 10
    }}>
      <Link to="/" className="navbar-logo" style={{ textDecoration: 'none', display: 'block', width: '64px', height: '64px' }}>
        <img src="/images/favicon.png" alt="Schemetastic Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Link>
      
      <button 
        onClick={onOpenSearch}
        className="navbar-search-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-light)',
          borderRadius: '32px',
          color: 'var(--primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
      >
        <span>Search</span>
      </button>
    </header>
  );
}
