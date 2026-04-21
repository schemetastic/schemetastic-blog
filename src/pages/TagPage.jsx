import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostItem from '../components/PostItem';
import postsData from '../data/posts.json';

export default function TagPage() {
  const [searchParams] = useSearchParams();
  const tagQuery = searchParams.get('tag');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tagQuery]);

  const filteredPosts = tagQuery 
    ? postsData.filter(post => post.tags.includes(tagQuery))
    : [];

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Tag Header */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px 60px',
        textAlign: 'center',
        gap: '16px'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Tag Filter
        </div>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '56px', color: '#FFFFFF', margin: 0 }}>
          Posts tagged with <span style={{ color: 'var(--secondary)' }}>'{tagQuery || '...'}'</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px', margin: 0 }}>
          Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} containing this tag.
        </p>
      </section>

      {/* Filtered Posts */}
      <section className="container" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px', width: '100%' }}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostItem key={post.slug} post={post} />
            ))
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
              No posts found with this tag.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
