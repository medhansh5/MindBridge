import React, { useState } from 'react';
import { Badge } from '../UI/Badge';
import { ExternalLink } from 'lucide-react';

const RESOURCES = [
  {
    id: 1,
    title: '5-4-3-2-1 Grounding Technique',
    category: 'Coping Strategies',
    desc: 'A simple technique to manage anxiety by focusing on your senses. 5 things you see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.'
  },
  {
    id: 2,
    title: 'Box Breathing Method',
    category: 'Coping Strategies',
    desc: 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Repeat to lower stress.',
    link: 'https://health.clevelandclinic.org/box-breathing-benefits/'
  },
  {
    id: 3,
    title: 'Pomodoro Technique for Burnout',
    category: 'Study Tips',
    desc: 'Work for 25 minutes, then take a 5-minute break. Prevents mental fatigue during long study sessions.'
  },
  {
    id: 4,
    title: 'How to Manage Exam Anxiety',
    category: 'Study Tips',
    desc: 'Strategies for staying calm before and during important tests. Includes preparation tips and mindset shifts.'
  },
  {
    id: 5,
    title: 'Digital Detox Guide',
    category: 'Self-Care',
    desc: 'Steps to disconnect from screens and social media to improve sleep and reduce comparison-induced anxiety.'
  },
  {
    id: 6,
    title: 'Understanding Imposter Syndrome',
    category: 'Understanding Emotions',
    desc: 'Learn why high-achieving students often feel like frauds, and how to overcome these feelings.'
  }
];

const CATEGORIES = ['All', 'Coping Strategies', 'Study Tips', 'Self-Care', 'Understanding Emotions'];

export const ResourceLibrary = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredResources = filter === 'All' 
    ? RESOURCES 
    : RESOURCES.filter(r => r.category === filter);

  return (
    <div className="resources">
      <div className="resource-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`btn btn--sm ${filter === cat ? 'btn--primary' : 'btn--ghost'}`}
            onClick={() => setFilter(cat)}
            style={{ whiteSpace: 'nowrap', border: `1px solid ${filter === cat ? 'transparent' : 'var(--color-border)'}` }}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="resource-grid">
        {filteredResources.map(resource => (
          <div key={resource.id} className="card resource-card">
            <div className="resource-card__content">
              <Badge category={resource.category} />
              <h3 className="resource-card__title">{resource.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                {resource.desc}
              </p>
            </div>
            
            {resource.link && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}
                >
                  Read More <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
