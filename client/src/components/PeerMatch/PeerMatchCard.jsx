import React from 'react';
import { Button } from '../UI/Button';
import { UserPlus, Headphones } from 'lucide-react';

export const PeerMatchCard = ({ 
  availableCount, 
  onRequestMatch, 
  onVolunteer, 
  isVolunteering, 
  onStopVolunteering, 
  matchResult,
  loading 
}) => {
  return (
    <div className="peer-match card" id="peer-match-container">
      <div className="peer-match__panel">
        <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <UserPlus size={20} className="text-primary" />
          I need someone to talk to
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Connect anonymously with a trained peer listener for 1-on-1 support.
        </p>
        
        {matchResult ? (
          <div style={{ background: 'rgba(20, 184, 166, 0.1)', border: '1px solid var(--color-success)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ color: 'var(--color-success)', fontWeight: '600' }}>Match Found! 🎉</span>
            <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Connecting to session {matchResult.matchId}...</div>
          </div>
        ) : (
          <Button 
            variant="primary" 
            onClick={onRequestMatch} 
            loading={loading === 'requesting'}
            disabled={loading !== null}
            id="btn-request-match"
          >
            Find a Listener
          </Button>
        )}
      </div>
      
      <div className="peer-match__panel" style={{ borderLeft: 'none' }}>
        <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Headphones size={20} className="text-secondary" />
          I'm here to listen
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {availableCount} peers are currently available to listen. Join them to support others.
        </p>
        
        {isVolunteering ? (
          <Button 
            variant="secondary" 
            onClick={onStopVolunteering} 
            loading={loading === 'volunteering'}
            id="btn-stop-volunteer"
          >
            Stop Listening
          </Button>
        ) : (
          <Button 
            variant="secondary" 
            onClick={onVolunteer} 
            loading={loading === 'volunteering'}
            disabled={loading !== null}
            id="btn-volunteer"
          >
            Volunteer as Listener
          </Button>
        )}
      </div>
    </div>
  );
};
