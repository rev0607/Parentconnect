import React, { useState } from 'react';
import { Bell, User } from 'lucide-react';
import { Child, Notification } from '../../types';
import { NotificationPanel } from './NotificationPanel';
import { ProfileMenu } from './ProfileMenu';

interface TopBarProps {
  activeChild: Child;
  notifications: Notification[];
  children: Child[];
  onChildSwitch: (child: Child) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeChild,
  notifications,
  children,
  onChildSwitch,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              EduParent
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {activeChild.name}'s Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <NotificationPanel
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: activeChild.colorCode }}
              >
                {activeChild.name.charAt(0)}
              </div>
            </button>
            {showProfileMenu && (
              <ProfileMenu
                children={children}
                activeChild={activeChild}
                onChildSwitch={onChildSwitch}
                onClose={() => setShowProfileMenu(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};