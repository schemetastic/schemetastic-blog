import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Warp } from '@paper-design/shaders-react';
import PostItem from '../components/PostItem';
import postsData from '../data/posts.json';

const POSTS_PER_PAGE = 5;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const totalPages = Math.ceil(postsData.length / POSTS_PER_PAGE);
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const currentPosts = postsData.slice(startIndex, startIndex + POSTS_PER_PAGE);

  useEffect(() => {
    // Correct URL if invalid page is requested
    if (currentPage !== validPage && totalPages > 0) {
      setSearchParams({ page: validPage.toString() });
    }
  }, [currentPage, validPage, setSearchParams, totalPages]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [validPage]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        padding: '80px 20px',
      }}>
        {/* Paper Shader Background */}
        <Warp speed={1.4} scale={2.86} softness={0.44} proportion={0.58} swirl={0.73} swirlIterations={10} shape="checks" distortion={0.43} shapeScale={0.16} frame={5526538.070000662} colors={['#121212', '#4C2997', '#121212', '#5D2DAE']} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
        
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
          Insights & Tutorials
        </div>
        
        <h1 style={{ marginBottom: '24px' }}>Schemetastic</h1>
        
        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
          Exploring the boundaries of modern JavaScript, and developer tips.
        </p>

        {/* Author Tag */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '80px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(26, 26, 26, 0.8)',
          padding: '8px 16px',
          borderRadius: '32px',
          border: '1px solid var(--border-light)',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            border: '2px solid var(--secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <img src="/images/profile.png" alt="Rodrigo Calix" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
          </div>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500 }}>By Rodrigo Calix</span>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="container" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {currentPosts.map(post => (
            <PostItem key={post.slug} post={post} />
          ))}
          
          {/* Pagination UI */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
              {validPage > 1 && (
                <Link 
                  to={`/?page=${validPage - 1}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    backgroundColor: 'transparent', 
                    border: '1px solid var(--border-light)', 
                    color: 'var(--text-main)',
                    textDecoration: 'none'
                  }}
                >
                  Back
                </Link>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <Link 
                  key={pageNum}
                  to={`/?page=${pageNum}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    backgroundColor: pageNum === validPage ? 'var(--primary)' : 'transparent',
                    border: pageNum === validPage ? '1px solid var(--primary)' : '1px solid var(--border-light)', 
                    color: pageNum === validPage ? 'white' : 'var(--text-muted)',
                    fontWeight: pageNum === validPage ? 'bold' : 'normal',
                    textDecoration: 'none'
                  }}
                >
                  {pageNum}
                </Link>
              ))}
              
              {validPage < totalPages && (
                <Link 
                  to={`/?page=${validPage + 1}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    backgroundColor: 'transparent', 
                    border: '1px solid var(--border-light)', 
                    color: 'var(--text-main)',
                    textDecoration: 'none'
                  }}
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
