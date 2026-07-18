import React from 'react';

const CATEGORY_COLORS = {
  'Academic Pressure': 'var(--color-secondary)',
  'Mental Health': 'var(--color-primary)',
  'Career Guidance': '#f59e0b',
  'Relationships': '#ec4899',
  'Family': 'var(--color-success)',
  'General': 'var(--color-text-muted)'
};

export const Badge = ({ category, size = 'sm' }) => {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS['General'];
  
  return (
    <span 
      className={`badge badge--${size}`}
      style={{ 
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`
      }}
    >
      {category}
    </span>
  );
};
