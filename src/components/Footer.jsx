import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '40px 80px',
      width: '100%',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto',
      zIndex: 10
    }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-dark)', flex: 1 }}>
        © Rodrigo Calix
      </div>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flex: 1 }}>
        <a 
          href="https://x.com/schemetastic" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            padding: '8px 24px',
            border: '1px solid var(--secondary)',
            borderRadius: '8px',
            color: 'var(--secondary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background-color 0.2s ease',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary-transparent)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          X
        </a>
        <a 
          href="https://www.linkedin.com/in/rodrigo-calix-schemetastic/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            padding: '8px 24px',
            border: '1px solid var(--secondary)',
            borderRadius: '8px',
            color: 'var(--secondary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background-color 0.2s ease',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary-transparent)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          LinkedIn
        </a>
      </div>

      <div style={{ display: 'flex', gap: '32px', justifyContent: 'flex-end', flex: 1 }}>
        <a href="https://schemetastic.com/doc/privacy-policy" style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'underline' }}>
          Privacy Policy
        </a>
        <a href="https://schemetastic.com/doc/disclaimer" style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'underline' }}>
          Disclaimer
        </a>
      </div>
    </footer>
  );
}
