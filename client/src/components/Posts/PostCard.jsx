import React from 'react';
import { Badge } from '../UI/Badge';
import { formatRelativeTime } from '../../utils/time';
import { Heart, MessageCircle, Trash2 } from 'lucide-react';

export const PostCard = ({ post, onLike, onDelete, onToggleReplies, showReplies, id }) => {
  return (
    <div className="card post-card" id={id}>
      <div className="post-card__header">
        <Badge category={post.category} />
        <span className="post-card__time">{formatRelativeTime(post.createdAt)}</span>
      </div>
      
      <div className="post-card__content">
        {post.content}
      </div>
      
      <div className="post-card__actions">
        <button 
          className={`post-card__action-btn ${post.likes > 0 ? 'post-card__action-btn--liked' : ''}`}
          onClick={() => onLike(post.id)}
          id={`btn-like-${post.id}`}
        >
          <Heart size={18} />
          <span>{post.likes > 0 ? post.likes : 'Like'}</span>
        </button>
        
        <button 
          className="post-card__action-btn"
          onClick={() => onToggleReplies(post.id)}
          id={`btn-reply-${post.id}`}
        >
          <MessageCircle size={18} />
          <span>{post.replyCount > 0 ? `${post.replyCount} Replies` : 'Reply'}</span>
        </button>

        <div style={{ flex: 1 }} />
        
        <button 
          className="post-card__action-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this post?')) {
              onDelete(post.id);
            }
          }}
          style={{ color: 'var(--color-danger)' }}
          id={`btn-delete-${post.id}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
