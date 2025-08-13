import React from 'react';
import { Home, Calendar, BarChart3, GraduationCap, Users } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: 'home' | 'planner' | 'insights' | 'ai-tutor' | 'parent-hub') => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'planner', icon: Calendar, label: 'Planner' },
    { id: 'insights', icon: BarChart3, label: 'Insights' },
    { id: 'ai-tutor', icon: GraduationCap, label: 'AI Tutor' },
    { id: 'parent-hub', icon: Users, label: 'Hub' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id as any)}
            className={`flex-1 py-2 px-1 flex flex-col items-center justify-center transition-colors ${
              activeTab === id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <Icon className={`w-6 h-6 mb-1 ${activeTab === id ? 'text-blue-600 dark:text-blue-400' : ''}`} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};