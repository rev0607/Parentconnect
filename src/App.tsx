import React, { useState } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MainApp } from './components/MainApp';
import { Child } from './types';

function App() {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [children, setChildren] = useState<Child[]>([]);

  const handleOnboardingComplete = (childrenData: Child[]) => {
    setChildren(childrenData);
    setIsOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {isOnboarding ? (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      ) : (
        <MainApp children={children} />
      )}
    </div>
  );
}

export default App;