import React, { useRef } from 'react';
import { Bell, Check } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import useClickOutside from '../hooks/useClickOutside';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDropdown({ isOpen, onClose }: Props) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, onClose);

  if (!isOpen) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-100 text-blue-800';
      case 'team': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-96 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
            >
              <Check size={16} className="mr-1" />
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-blue-50/50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(notification.type)}`}>
                  {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                </span>
                <span className="text-xs text-gray-500">{notification.timestamp}</span>
              </div>
              <h4 className="font-medium text-gray-900">{notification.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}