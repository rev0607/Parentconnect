import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Bell, MessageSquare, Shield } from 'lucide-react';

interface PermissionsProps {
  onNext: () => void;
  onBack: () => void;
}

export const Permissions: React.FC<PermissionsProps> = ({ onNext, onBack }) => {
  const [permissions, setPermissions] = useState({
    notifications: true,
    whatsapp: false,
    analytics: true,
  });

  const permissionItems = [
    {
      key: 'notifications' as keyof typeof permissions,
      icon: Bell,
      title: 'Push Notifications',
      description: 'Get reminders about homework, exams, and progress updates',
      recommended: true,
    },
    {
      key: 'whatsapp' as keyof typeof permissions,
      icon: MessageSquare,
      title: 'WhatsApp Integration',
      description: 'Share progress reports and receive updates via WhatsApp',
      recommended: false,
    },
    {
      key: 'analytics' as keyof typeof permissions,
      icon: Shield,
      title: 'Learning Analytics',
      description: 'Help us improve AI recommendations with anonymous usage data',
      recommended: true,
    },
  ];

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Permissions</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Choose how you'd like to receive updates and help us improve
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {permissionItems.map((item) => (
            <div key={item.key} className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                    {item.recommended && (
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {item.description}
                  </p>
                  <button
                    onClick={() => togglePermission(item.key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      permissions[item.key]
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {permissions[item.key] ? 'Enabled' : 'Enable'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            onClick={onNext}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          You can change these settings anytime in the app preferences
        </p>
      </div>
    </div>
  );
};