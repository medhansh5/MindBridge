import React from 'react';
import { useToast } from '../../hooks/useToast';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onDismiss }) => {
  const icons = {
    success: <CheckCircle className="toast__icon" style={{ color: 'var(--color-success)' }} size={20} />,
    error: <AlertCircle className="toast__icon" style={{ color: 'var(--color-danger)' }} size={20} />,
    info: <Info className="toast__icon" style={{ color: 'var(--color-primary)' }} size={20} />
  };

  const titles = {
    success: 'Success',
    error: 'Error',
    info: 'Notice'
  };

  return (
    <div className={`toast toast--${toast.type}`} role="alert">
      {icons[toast.type]}
      <div className="toast__content">
        <div className="toast__title">{titles[toast.type]}</div>
        <div className="toast__message">{toast.message}</div>
      </div>
      <button className="toast__close" onClick={onDismiss} aria-label="Dismiss toast">
        <X size={16} />
      </button>
    </div>
  );
};
