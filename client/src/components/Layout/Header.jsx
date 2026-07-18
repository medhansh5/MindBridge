import React from 'react';
import { Button } from '../UI/Button';
import { PhoneCall } from 'lucide-react';

export const Header = ({ currentView, onViewChange, onOpenSOS }) => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <span>🌉</span> MindBridge
        </div>
        
        <nav className="header__nav">
          <button 
            id="nav-feed"
            className={`header__nav-item ${currentView === 'feed' ? 'header__nav-item--active' : ''}`}
            onClick={() => onViewChange('feed')}
          >
            Feed
          </button>
          <button 
            id="nav-resources"
            className={`header__nav-item ${currentView === 'resources' ? 'header__nav-item--active' : ''}`}
            onClick={() => onViewChange('resources')}
          >
            Resources
          </button>
          
          <Button 
            id="btn-sos-header"
            variant="danger" 
            size="sm" 
            icon={<PhoneCall size={16} />}
            onClick={onOpenSOS}
          >
            SOS
          </Button>
        </nav>
      </div>
    </header>
  );
};
