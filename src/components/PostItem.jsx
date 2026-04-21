import React from 'react';
import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
  // Format date correctly e.g., "October 18, 2022"
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      paddingBottom: '40px',
      borderBottom: '1px solid var(--border-color)',
      animation: 'fadeIn 0.4s ease forwards'
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--primary)' }}>
        {formattedDate}
      </div>
      
      <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: '32px',
          color: 'var(--text-main)',
          lineHeight: 1.2,
          margin: 0,
          transition: 'color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-main)'}
        >
          {post.title}
        </h2>
      </Link>
      
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '16px',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        margin: 0
      }}>
        {post.description}
      </p>
      
      <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
        {post.tags.map(tag => (
          <Link 
            key={tag} 
            to={`/tags?tag=${tag}`}
            style={{ textDecoration: 'none' }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--secondary)',
              backgroundColor: 'var(--secondary-transparent)',
              padding: '4px 12px',
              borderRadius: '16px',
              transition: 'background-color 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 77, 0, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--secondary-transparent)'}
            >
              {tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
