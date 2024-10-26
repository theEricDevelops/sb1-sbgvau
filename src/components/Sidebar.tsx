import React from 'react';
import { Home, FolderOpen, Users, Settings, BarChart2, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Projects', icon: FolderOpen, path: '/' },
  { name: 'Team', icon: Users, path: '/team' },
  { name: 'Reports', icon: BarChart2, path: '/reports' },
  { name: 'Schedule', icon: Calendar, path: '/schedule' },
  { name: 'Settings', icon: Settings, path: '/settings' }
];

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const location = useLocation();

  const sidebarClasses = `
    lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-16
    fixed inset-y-0 left-0 z-40 w-64 bg-white transform
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 transition-transform duration-200 ease-in-out
  `;

  return (
    <>
      <div className={sidebarClasses}>
        <nav className="mt-6 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => onClose?.()}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-lg
                  ${isActive 
                    ? 'bg-gray-100 text-blue-600' 
                    : 'text-gray-900 hover:bg-gray-100'}
                `}
              >
                <item.icon className={`
                  mr-3 h-5 w-5
                  ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'}
                `} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}