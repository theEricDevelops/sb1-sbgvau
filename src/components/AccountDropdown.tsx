import React, { useRef } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import useClickOutside from '../hooks/useClickOutside';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenProfile: () => void;
}

export default function AccountDropdown({ isOpen, onClose, onOpenProfile }: Props) {
  const { user, logout } = useUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useClickOutside(dropdownRef, onClose);

  if (!isOpen || !user) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <button
          onClick={() => {
            onClose();
            onOpenProfile();
          }}
          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <User size={16} className="mr-3" />
          View Profile
        </button>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <Settings size={16} className="mr-3" />
          Settings
        </button>
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
        >
          <LogOut size={16} className="mr-3" />
          Sign out
        </button>
      </div>
    </div>
  );
}