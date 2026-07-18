import React from 'react';
import { Modal } from '../UI/Modal';

export const SOSModal = ({ isOpen, onClose }) => {
  const helplines = [
    {
      name: 'iCall (TISS)',
      number: '9152987821',
      desc: 'Mon-Sat, 8am-10pm. Psychosocial helpline.',
      tel: '9152987821'
    },
    {
      name: 'Vandrevala Foundation',
      number: '1860-2662-345',
      desc: '24/7 crisis support and counseling.',
      tel: '18602662345'
    },
    {
      name: 'AASRA',
      number: '9820466726',
      desc: '24/7 helpline for distress and prevention.',
      tel: '9820466726'
    },
    {
      name: 'Snehi',
      number: '044-24640050',
      desc: 'Mon-Sat, 8am-10pm. Emotional support.',
      tel: '04424640050'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="You Are Not Alone 💙" id="modal-sos">
      <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
        Take a deep breath. It's okay to ask for help. These free, confidential helplines are here for you.
      </p>
      
      <div className="helpline-list">
        {helplines.map((helpline, idx) => (
          <div key={idx} className="helpline-item">
            <div className="helpline-header">
              <span className="helpline-name">{helpline.name}</span>
              <a href={`tel:${helpline.tel}`} className="helpline-number">{helpline.number}</a>
            </div>
            <div className="helpline-desc">{helpline.desc}</div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
        If this is a medical emergency, please visit the nearest hospital or call 112.
      </div>
    </Modal>
  );
};
