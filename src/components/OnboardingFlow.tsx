import React, { useState } from 'react';
import { WelcomeScreen } from './onboarding/WelcomeScreen';
import { RoleSelection } from './onboarding/RoleSelection';
import { ChildDetails } from './onboarding/ChildDetails';
import { LanguageSelection } from './onboarding/LanguageSelection';
import { Permissions } from './onboarding/Permissions';
import { ParentProfile } from './onboarding/ParentProfile';
import { OnboardingComplete } from './onboarding/OnboardingComplete';
import { Child, Parent } from '../types';

interface OnboardingFlowProps {
  onComplete: (children: Child[]) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [children, setChildren] = useState<Child[]>([]);
  const [parent, setParent] = useState<Parent | null>(null);
  const [selectedRole, setSelectedRole] = useState<'parent' | 'student'>('parent');
  const [preferredLanguage, setPreferredLanguage] = useState('English');

  const steps = [
    'welcome',
    'role',
    'child-details',
    'language',
    'permissions',
    'parent-profile',
    'complete'
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

  const handleComplete = () => {
    onComplete(children);
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'welcome':
        return <WelcomeScreen onNext={nextStep} />;
      case 'role':
        return (
          <RoleSelection
            selectedRole={selectedRole}
            onRoleSelect={setSelectedRole}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'child-details':
        return (
          <ChildDetails
            children={children}
            onChildrenUpdate={handleChildrenUpdate}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'language':
        return (
          <LanguageSelection
            selectedLanguage={preferredLanguage}
            onLanguageSelect={setPreferredLanguage}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'permissions':
        return <Permissions onNext={nextStep} onBack={prevStep} />;
      case 'parent-profile':
        return (
          <ParentProfile
            parent={parent}
            onParentUpdate={handleParentUpdate}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'complete':
        return <OnboardingComplete onComplete={handleComplete} />;
      default:
        return <WelcomeScreen onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {renderStep()}
    </div>
  );
};