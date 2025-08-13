import React, { useState } from 'react';
import { WelcomeScreen } from './onboarding/WelcomeScreen';
import { AuthScreen } from './onboarding/AuthScreen';
import { ParentChildSetup } from './onboarding/ParentChildSetup';
import { LanguageSelection } from './onboarding/LanguageSelection';
import { Permissions } from './onboarding/Permissions';
import { WarmWelcome } from './onboarding/WarmWelcome';
import { Child, Parent } from '../types';

interface OnboardingFlowProps {
  onComplete: (children: Child[]) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [children, setChildren] = useState<Child[]>([]);
  const [parent, setParent] = useState<Parent | null>(null);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const steps = [
    'welcome',
    'auth',
    'parent-child-setup',
    'language',
    'permissions',
    'warm-welcome'
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChildrenUpdate = (updatedChildren: Child[]) => {
    setChildren(updatedChildren);
  };

  const handleParentUpdate = (parentData: Parent) => {
    setParent(parentData);
  };

  const handleAuth = (authData: any) => {
    setIsAuthenticated(true);
  };

  const handleComplete = () => {
    onComplete(children);
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'welcome':
        return <WelcomeScreen onNext={nextStep} onSkip={() => setCurrentStep(steps.length - 1)} />;
      case 'auth':
        return (
          <AuthScreen
            onAuth={handleAuth}
            onNext={nextStep}
            onBack={prevStep}
            onSkip={() => setCurrentStep(steps.length - 1)}
          />
        );
      case 'parent-child-setup':
        return (
          <ParentChildSetup
            children={children}
            parent={parent}
            onChildrenUpdate={handleChildrenUpdate}
            onParentUpdate={handleParentUpdate}
            onNext={nextStep}
            onBack={prevStep}
            onSkip={() => setCurrentStep(steps.length - 1)}
          />
        );
      case 'language':
        return (
          <LanguageSelection
            selectedLanguage={preferredLanguage}
            onLanguageChange={setPreferredLanguage}
            onBack={prevStep}
            onContinue={nextStep}
          />
        );
      case 'permissions':
        return (
          <Permissions 
            onNext={nextStep} 
            onBack={prevStep}
            currentStep={currentStep + 1}
            totalSteps={steps.length}
          />
        );
      case 'warm-welcome':
        return (
          <WarmWelcome
            parent={parent}
            children={children}
            onComplete={handleComplete}
            onBack={prevStep}
            currentStep={currentStep + 1}
            totalSteps={steps.length}
          />
        );
      default:
        return <WelcomeScreen onNext={nextStep} onSkip={() => setCurrentStep(steps.length - 1)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {renderStep()}
    </div>
  );
};