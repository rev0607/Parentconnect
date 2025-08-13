import React from 'react';
import { Settings, LogOut, User, Shield } from 'lucide-react';
import { Child } from '../../types';

interface ProfileMenuProps {
  children: Child[];
  activeChild: Child;
  onChildSwitch: (child: Child) => void;
  onClose: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  children,
  activeChild,
  onChildSwitch,
  onClose,
}) => {
  const menuItems = [
    { icon: User, label: 'Edit Profile', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => {} },
    { icon: Shield, label: 'Privacy', action: () => {} },
    { icon: LogOut, label: 'Logout', action: () => {} },
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      {children.length > 1 && (
        <>
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Switch Child</h4>
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => {
                  onChildSwitch(child);
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  activeChild.id === child.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: child.colorCode }}
                >
                  {child.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-medium">{child.name}</p>
                  <p className="text-sm opacity-75">{child.grade}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
      
      <div className="p-2">
        {menuItems.map(({ icon: Icon, label, action }) => (
          <button
            key={label}
            onClick={() => {
              action();
              onClose();
            }}
            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};