import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification } from '../types';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'New Project Comment',
    message: 'Sarah left a comment on Downtown Renovation',
    timestamp: '5m ago',
    read: false,
    type: 'project',
    link: '#project/1'
  },
  {
    id: 2,
    title: 'Team Member Added',
    message: 'Mike Johnson joined the team',
    timestamp: '1h ago',
    read: false,
    type: 'team',
    link: '#team'
  },
  {
    id: 3,
    title: 'Project Update',
    message: 'Hillside Estate has 15 new photos',
    timestamp: '2h ago',
    read: true,
    type: 'project',
    link: '#project/2'
  }
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = useCallback((id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}