import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  const handleAuthSuccess = useCallback(async (user: any) => {
    try {
      console.log('Handling auth success for user:', user);
      
      // Create or update parent profile
      const { parent: parentData, error } = await AuthService.createOrUpdateParent({
        google_id: user.id,
        first_name: user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name?.split(' ')[0] || '',
        last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || user.user_metadata?.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.user_metadata?.phone_number || ''
      });

      if (error) {
        console.error('Profile creation error:', error);
        return;
      }

      console.log('Parent profile created/updated:', parentData);

      // Log authentication activity
      if (parentData) {
        await AuthService.logActivity(parentData.id, 'authentication');
      }

      setParent(parentData);
      setAuthUser(user);
      setIsAuthenticated(true);
      
      // Move to profile setup step
      setCurrentStep(2);
    } catch (err) {
      console.error('Auth success handler error:', err);
    }
  }, []);

  // Check for existing session and handle auth state changes
  useEffect(() => {
    let mounted = true;
    
    const checkSession = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
      const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user && mounted) {
          console.log('Existing session found:', session.user);
          await handleAuthSuccess(session.user);
        } else if (mounted) {
          setIsLoading(false);
      }
      } catch (error) {
        console.error('Session check error:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    
    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === 'SIGNED_IN' && session?.user && mounted) {
        await handleAuthSuccess(session.user);
      } else if (event === 'SIGNED_OUT' && mounted) {
        setIsAuthenticated(false);
        setAuthUser(null);
        setParent(null);
        setCurrentStep(0);
      }
      
      if (mounted) {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleAuthSuccess]);

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
    // This is now handled by the auth state listener
    console.log('Auth callback received:', authData);
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

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">AI</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'welcome':
        return <WelcomeScreen onNext={nextStep} onSkip={() => setCurrentStep(steps.length - 1)} />;
      case 'auth':
        return (
          <AuthScreen
            onAuth={() => {}} // Auth is now handled by state listener
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