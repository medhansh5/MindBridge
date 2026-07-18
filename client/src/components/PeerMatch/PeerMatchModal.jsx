import React from 'react';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';

export const PeerMatchModal = ({ isOpen, onClose, matchResult }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Peer Match Confirmation" id="modal-peer-match">
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>You've been matched!</h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          We've connected you with a peer listener. This is an anonymous, judgment-free space.
        </p>
        
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Session ID</span>
          <div style={{ fontSize: '1.25rem', fontWeight: '600', fontFamily: 'monospace' }}>
            {matchResult?.matchId}
          </div>
        </div>
        
        <Button variant="primary" size="lg" onClick={onClose} id="btn-join-session">
          Enter Session
        </Button>
      </div>
    </Modal>
  );
};
