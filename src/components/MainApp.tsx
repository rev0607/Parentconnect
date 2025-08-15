import React, { useState, useEffect } from 'react';
import { TopBar } from './layout/TopBar';
import { BottomNavigation } from './layout/BottomNavigation';
import { HomeTab } from './tabs/HomeTab';
import { PlannerTab } from './tabs/PlannerTab';
import { InsightsTab } from './tabs/InsightsTab';
import { AITutorTab } from './tabs/AITutorTab';
import { ParentHubTab } from './tabs/ParentHubTab';
import { FloatingVoiceAssistant } from './common/FloatingVoiceAssistant';
import { Child, Notification } from '../types';

interface MainAppProps {
  children: Child[];
}

export const MainApp: React.FC<MainAppProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'planner' | 'insights' | 'ai-tutor' | 'parent-hub'>('home');
  const [activeChild, setActiveChild] = useState<Child | null>(children.length > 0 ? children[0] : null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (children.length > 0) {
      setActiveChild(children[0]);
    }
  }, [children, activeChild]);

  useEffect(() => {
    if (activeChild) {
      setNotifications([
        {
          id: '1',
          title: 'Homework Due Tomorrow',
          message: 'Math assignment due tomorrow',
          childName: activeChild.name,
          childColor: activeChild.colorCode,
          priority: 'high',
          timestamp: new Date().toISOString(),
          read: false,
        },
        {
          id: '2',
          title: 'Science Project',
          message: 'Lab report due this Friday',
          childName: activeChild.name,
          childColor: activeChild.colorCode,
          priority: 'medium',
          timestamp: new Date().toISOString(),
          read: false,
        },
      ]);
    }
  }, [activeChild]);

  const handleChildSwitch = (child: Child) => {
    setActiveChild(child);
  };

  const renderActiveTab = () => {
    if (!activeChild) return null;

    switch (activeTab) {
      case 'home':
        return <HomeTab activeChild={activeChild} />;
      case 'planner':
        return <PlannerTab activeChild={activeChild} />;
      case 'insights':
        return <InsightsTab activeChild={activeChild} />;
      case 'ai-tutor':
        return <AITutorTab activeChild={activeChild} />;
      case 'parent-hub':
        return <ParentHubTab children={children} onChildSwitch={handleChildSwitch} />;
      default:
        return <HomeTab activeChild={activeChild} />;
    }
  };

  if (children.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">AI</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Welcome to Smart Parent AI</h2>
          <p className="text-gray-600 dark:text-gray-400">No children added yet. Please complete onboarding to get started.</p>
        </div>
      </div>
    );
  }

  if (!activeChild && children.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <TopBar
        activeChild={activeChild}
        notifications={notifications}
        children={children}
        onChildSwitch={handleChildSwitch}
      />
      
      <main className="flex-1 pb-20 overflow-auto">
        {renderActiveTab()}
      </main>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <FloatingVoiceAssistant />
    </div>
  );
};