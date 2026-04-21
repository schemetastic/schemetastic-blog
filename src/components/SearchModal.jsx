import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import postsData from '../data/posts.json';

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      
      if (results.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % results.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          navigate(`/post/${results[activeIndex].slug}`);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, activeIndex, onClose, navigate]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    const searchTerms = query.toLowerCase().split(' ');
    
    const filtered = postsData.filter(post => {
      const searchString = `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase();
      return searchTerms.every(term => searchString.includes(term));
    });
    
    setResults(filtered.slice(0, 5)); // Show max 5 results
    setActiveIndex(0);
  }, [query]);

  // Function to highlight search term
  const highlightMatch = (text) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <span key={i} style={{ color: 'var(--primary)' }}>{part}</span> 
        : part
    );
  };

  return (
    <div 
      className="search-modal-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="search-modal-content"
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: '#1A1A1A',
          border: '1px solid var(--border-light)',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
        }}
      >
        {/* Search Input Area */}
        <div 
          className="search-input-area"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-light)',
            gap: '16px',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: '18px' }}>&gt;</div>
          <input 
            ref={inputRef}
            type="text"
            className="search-input-field"
            placeholder="Search articles, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--text-main)',
              fontSize: '20px',
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              width: '100%'
            }}
          />
          <button 
            onClick={onClose}
            className="search-esc-button"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-dark)',
              fontSize: '12px',
              backgroundColor: '#2A2A2A',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid transparent'
            }}
          >ESC</button>
        </div>

        {/* Results Area */}
        {query && (
          <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 8px', maxHeight: '400px', overflowY: 'auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dark)', fontSize: '12px', padding: '0 16px 8px 16px' }}>
              {results.length} result{results.length !== 1 ? 's' : ''}
            </div>
            
            {results.map((post, index) => {
              const isActive = index === activeIndex;
              return (
                <Link 
                  key={post.slug}
                  to={`/post/${post.slug}`}
                  onClick={onClose}
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div 
                    className="search-result-item"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '16px',
                      gap: '8px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? 'var(--primary-transparent)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                      transition: 'all 0.1s ease'
                    }}
                  >
                    <div 
                      className="search-result-title"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-main)', fontSize: '16px' }}
                    >
                      {highlightMatch(post.title)}
                    </div>
                    <div 
                      className="search-result-description"
                      style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {highlightMatch(post.description)}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      {post.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--secondary)' }}>
                          {highlightMatch(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
