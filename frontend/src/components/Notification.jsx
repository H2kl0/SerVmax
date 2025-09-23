import React, { useEffect } from 'react';
import { Icons } from './Icons';

function Notification({ message, type = 'success', onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <Icons.Save size={20} />;
      case 'error': return <Icons.X size={20} />;
      case 'info': return <Icons.Info size={20} />;
      default: return <Icons.Info size={20} />;
    }
  };

  const getClassName = () => {
    return `notification notification-${type}`;
  };

  return (
    <div className={getClassName()}>
      <div className="notification-content">
        <div className="notification-icon">
          {getIcon()}
        </div>
        <div className="notification-message">
          {message}
        </div>
        <button className="notification-close" onClick={onClose}>
          <Icons.X size={16} />
        </button>
      </div>
    </div>
  );
}

export default Notification;
