import React, { useState } from 'react';
import { PostCard } from './PostCard';
import { ReplyThread } from './ReplyThread';
import { Loader } from '../UI/Loader';
import { Button } from '../UI/Button';

export const PostList = ({ posts, loading, error, onLike, onDelete, onRetry }) => {
  const [openReplies, setOpenReplies] = useState({});

  const toggleReplies = (id) => {
    setOpenReplies(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-danger)' }}>{error}</h3>
        <Button onClick={onRetry}>Try Again</Button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
        <h3 style={{ marginBottom: '0.5rem' }}>No posts yet</h3>
        <p style={{ color: 'var(--color-text-muted)' }}>Be the first to share your thoughts.</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '1.5rem' }}>
          <PostCard
            post={post}
            onLike={onLike}
            onDelete={onDelete}
            onToggleReplies={toggleReplies}
            showReplies={openReplies[post.id]}
            id={`post-${post.id}`}
          />
          {openReplies[post.id] && (
            <ReplyThread postId={post.id} />
          )}
        </div>
      ))}
    </div>
  );
};
