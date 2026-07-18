import React, { useState } from 'react';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { Send, Edit3 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const CATEGORIES = [
  'General', 'Academic Pressure', 'Mental Health', 'Career Guidance', 'Relationships', 'Family'
];

export const PostForm = ({ onSubmit, loading }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim().length === 0) {
      addToast('Please write something to share', 'error');
      return;
    }
    
    const result = await onSubmit({ content, category });
    if (result?.success) {
      setContent('');
      setIsExpanded(false);
      addToast('Your post has been shared anonymously', 'success');
    }
  };

  if (!isExpanded) {
    return (
      <div className="card" style={{ marginBottom: '2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-muted)' }} onClick={() => setIsExpanded(true)} id="btn-expand-form">
        <Edit3 size={20} />
        <span style={{ fontSize: '1.125rem' }}>+ Share your thoughts anonymously...</span>
      </div>
    );
  }

  return (
    <form className="card post-form" onSubmit={handleSubmit} id="post-form">
      <div className="post-form__categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            className={`btn btn--sm ${category === cat ? 'btn--primary' : 'btn--ghost'}`}
            onClick={() => setCategory(cat)}
            style={{ border: `1px solid ${category === cat ? 'transparent' : 'var(--color-border)'}` }}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <textarea
        id="post-content-input"
        className="post-form__textarea"
        placeholder="What's on your mind? This is a safe, anonymous space."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={5000}
        autoFocus
      />
      
      <div className="post-form__footer">
        <span className="post-form__char-count">{content.length} / 5000</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="ghost" type="button" onClick={() => setIsExpanded(false)} id="btn-cancel-post">
            Cancel
          </Button>
          <Button type="submit" loading={loading} icon={<Send size={16} />} id="btn-submit-post">
            Post
          </Button>
        </div>
      </div>
    </form>
  );
};
