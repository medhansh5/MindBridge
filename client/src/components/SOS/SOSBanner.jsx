import React from 'react';
import { Phone } from 'lucide-react';

export const SOSBanner = ({ onOpenSOS }) => {
  return (
    <div className="sos-banner">
      <button className="sos-btn" onClick={onOpenSOS} aria-label="Emergency SOS Helplines" id="btn-sos-floating">
        <Phone size={24} fill="currentColor" />
        <span>SOS</span>
      </button>
    </div>
  );
};
