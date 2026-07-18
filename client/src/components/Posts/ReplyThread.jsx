import React, { useState, useEffect } from 'react';
import { formatRelativeTime } from '../../utils/time';
import { Button } from '../UI/Button';
import { Send } from 'lucide-react';
import * as api from '../../api/client';
import { useToast } from '../../hooks/useToast';

export const ReplyThread = ({ postId }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const { data } = await api.fetchReplies(postId);
        setReplies(data);
      } catch (err) {
        addToast('Failed to load replies', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchThread();
  }, [postId, addToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setSubmitting(true);
      const { data } = await api.createReply(postId, { content });
      setReplies(prev => [...prev, data]);
      setContent('');
      addToast('Reply posted', 'success');
    } catch (err) {
      addToast('Failed to post reply', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reply-thread" id={`replies-${postId}`}>
      <form className="reply-input-group" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Write a supportive reply..." 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
        />
        <Button type="submit" size="sm" loading={submitting} disabled={!content.trim()}>
          <Send size={16} />
        </Button>
      </form>
      
      {loading ? (
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Loading replies...</div>
      ) : (
        <div className="reply-list">
          {replies.map(reply => (
            <div key={reply.id} className="reply-item">
              <div className="reply-item__header">
                Anonymous • {formatRelativeTime(reply.createdAt)}
              </div>
              <div>{reply.content}</div>
            </div>
          ))}
          {replies.length === 0 && (
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', padding: '0.5rem 0' }}>
              No replies yet. Be the first to offer support.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
