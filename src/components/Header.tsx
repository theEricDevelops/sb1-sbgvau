import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Menu, Search, Bell } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useUser } from '../context/UserContext';
import { useNotifications } from '../context/NotificationContext';
import AccountDropdown from './AccountDropdown';
import ProfileModal from './ProfileModal';
import NotificationDropdown from './NotificationDropdown';

interface Props {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: Props) {
  const { searchTerm, setSearchTerm } = useProjects();
  const { user } = useUser();
  const { unreadCount } = useNotifications();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={onMenuClick}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center space-x-2 ml-2 lg:ml-0">
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">APicTool</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search projects, photos, or team members..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative"
              >
                <Bell size={24} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <NotificationDropdown
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <span className="hidden lg:inline-block text-sm font-medium">
                  {user?.name || 'Account'}
                </span>
              </button>

              <AccountDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                onOpenProfile={() => setIsProfileOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </header>
  );
}