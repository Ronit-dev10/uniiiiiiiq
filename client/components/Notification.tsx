import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export interface NotificationProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  duration?: number;
  onClose: () => void;
}

export function Notification({ type, message, duration = 5000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
    }
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-md w-full
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className={`flex items-center p-4 rounded-lg border shadow-lg ${getBgColor()}`}>
        {getIcon()}
        <div className={`ml-3 font-plus-jakarta text-sm font-medium ${getTextColor()}`}>
          {message}
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`ml-auto flex-shrink-0 ${getTextColor()} hover:opacity-75 transition-opacity`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Notification manager hook
export function useNotification() {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'warning';
    message: string;
  }>>([]);

  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const NotificationContainer = () => (
    <>
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{ top: `${16 + index * 80}px` }}
          className="absolute"
        >
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </>
  );

  return {
    showSuccess: (message: string) => showNotification('success', message),
    showError: (message: string) => showNotification('error', message),
    showWarning: (message: string) => showNotification('warning', message),
    NotificationContainer
  };
}
