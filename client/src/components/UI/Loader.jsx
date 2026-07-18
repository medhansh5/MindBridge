import React from 'react';

export const Loader = () => {
  return (
    <div>
      {[1, 2, 3].map(i => (
        <div key={i} className="skeleton-card skeleton">
          <div style={{ height: '24px', width: '30%', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="skeleton" />
          <div style={{ height: '16px', width: '100%', marginBottom: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="skeleton" />
          <div style={{ height: '16px', width: '80%', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="skeleton" />
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ height: '24px', width: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="skeleton" />
            <div style={{ height: '24px', width: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} className="skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
};
