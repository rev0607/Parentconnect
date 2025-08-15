import React, { useState } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MainApp } from './components/MainApp';
import { Child } from './types';

// Default demo children for when onboarding is skipped
const defaultChildren: Child[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    grade: 'Grade 8',
    school: 'CBSE School',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies'],
    colorCode: '#3B82F6',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    grade: 'Grade 6',
    school: 'ICSE School',
    subjects: ['Mathematics', 'Science', 'English', 'Hindi'],
    colorCode: '#10B981',
  },
];

function App() {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [children, setChildren] = useState<Child[]>([]);

  const handleOnboardingComplete = (childrenData: Child[]) => {
    setChildren(childrenData);
    setIsOnboarding(false);
  };

  const handleSkipOnboarding = () => {
    setChildren(defaultChildren);
    setIsOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {isOnboarding ? (
        <OnboardingFlow 
          onComplete={handleOnboardingComplete}
          onSkip={handleSkipOnboarding}
        />
      ) : (
        <MainApp children={children} />
      )}
    </div>
  );
}

export default App;