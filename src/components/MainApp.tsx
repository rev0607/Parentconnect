import React, { useState } from 'react';
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
  const [activeChild, setActiveChild] = useState<Child>(children[0]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Homework Due Tomorrow',
      message: 'Math assignment due tomorrow',
      childName: children[0]?.name || 'Child',
      childColor: children[0]?.colorCode || '#3B82F6',
      priority: 'high',
      timestamp: new Date().toISOString(),
      read: false,
    },
  ]);

  const handleChildSwitch = (child: Child) => {
    setActiveChild(child);
  };

  const renderActiveTab = () => {
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