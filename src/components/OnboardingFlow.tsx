import React, { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { WelcomeScreen } from './onboarding/WelcomeScreen';
import { AuthScreen } from './onboarding/AuthScreen';
import { ParentChildSetup } from './onboarding/ParentChildSetup';
import { LanguageSelection } from './onboarding/LanguageSelection';
import { Permissions } from './onboarding/Permissions';
import { WarmWelcome } from './onboarding/WarmWelcome';
import { OnboardingService } from '../services/onboardingService';
import type { Parent as DBParent, Child as DBChild } from '../lib/supabase';

// Legacy types for compatibility
interface Child {
  id: string;
  name: string;
  grade: string;
  school: string;
  subjects: string[];
  photo?: string;
  colorCode: string;
}

interface OnboardingFlowProps {
  onComplete: (children: Child[]) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [children, setChildren] = useState<Child[]>([]);
  const [parent, setParent] = useState<DBParent | null>(null);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // User is already authenticated, skip to profile setup
        setIsAuthenticated(true);
        setAuthUser(session.user);
        setCurrentStep(2); // Skip to profile setup
      }
    };
    
    checkSession();
  }, []);

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

  const handleParentUpdate = (parentData: DBParent) => {
    setParent(parentData);
  };

  const handleAuth = (authData: { user: any; parent: DBParent }) => {
    setIsAuthenticated(true);
    setAuthUser(authData.user);
    setParent(authData.parent);
  };

  const handleComplete = async () => {
    // Load children from database for the main app
    if (parent) {
      const { children: dbChildren } = await OnboardingService.getChildrenByParentId(parent.id);
      
      if (dbChildren) {
        // Convert DB children to legacy format for compatibility
        const legacyChildren: Child[] = dbChildren.map((child, index) => ({
          id: child.id,
          name: `${child.first_name} ${child.last_name}`,
          grade: child.grade,
          school: `${child.board} School`,
          subjects: child.subjects,
          colorCode: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'][index % 6],
        }));
        
        onComplete(legacyChildren);
      } else {
        onComplete(children);
      }
    } else {
      onComplete(children);
    }
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
            parent={parent}
            selectedLanguage={preferredLanguage}
            onLanguageChange={setPreferredLanguage}
            onBack={prevStep}
            onContinue={nextStep}
          />
        );
      case 'permissions':
        return (
          <Permissions 
            parent={parent}
            selectedLanguage={preferredLanguage}
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