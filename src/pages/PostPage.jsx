import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import postsData from '../data/posts.json';

export default function PostPage() {
  const { slug } = useParams();
  const post = postsData.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="container" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1>Post not found</h1>
        <Link to="/">Return home</Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <article className="animate-fade-in" style={{ paddingBottom: '120px' }}>
      {/* Post Header */}
      <header style={{
        padding: '120px 20px 60px',
        maxWidth: '800px',
        margin: '0 auto',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '60px'
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--primary)', marginBottom: '16px' }}>
          {formattedDate} • By {post.author}
        </div>
        
        <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>{post.title}</h1>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {post.tags.map(tag => (
            <Link key={tag} to={`/tags?tag=${tag}`} style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--secondary)',
                backgroundColor: 'var(--secondary-transparent)',
                padding: '4px 12px',
                borderRadius: '16px',
                cursor: 'pointer'
              }}>
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </header>

      {/* Markdown Content */}
      <div className="container">
        <div className="markdown-body">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => {
                // Determine if the link is internal to the blog
                // 1. Doesn't start with http/https
                // 2. Or explicitly points to a .md file
                const isInternal = href && (
                  (!href.startsWith('http') && !href.startsWith('//')) || 
                  href.endsWith('.md')
                );

                if (isInternal) {
                  // Normalize the href to get the slug
                  // Remove leading /posts/, /post/ or / and .md extension
                  let slug = href
                    .replace(/^https?:\/\/[^\/]+/, '') // Remove domain if present
                    .replace(/^\/?posts\//, '')        // Remove leading /posts/
                    .replace(/^\/?post\//, '')         // Remove leading /post/
                    .replace(/^\//, '')                // Remove leading /
                    .replace(/\.md$/, '')              // Remove .md extension
                    .replace(/\/$/, '');               // Remove trailing /

                  return <Link to={`/post/${slug}`}>{children}</Link>;
                }

                return (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
