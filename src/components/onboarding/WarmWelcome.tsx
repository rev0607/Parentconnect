import React from 'react';
import { ArrowLeft, Sparkles, Heart, Zap } from 'lucide-react';
import { AuthService } from '../../services/authService';
import type { Parent, Child as DBChild } from '../../lib/supabase';

// Legacy Child type for compatibility
interface Child {
  id: string;
  name: string;
  grade: string;
  school: string;
  subjects: string[];
  photo?: string;
  colorCode: string;
}

interface WarmWelcomeProps {
  parent: Parent | null;
  children: Child[];
  onComplete: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const WarmWelcome: React.FC<WarmWelcomeProps> = ({ 
  parent, 
  children, 
  onComplete, 
  onBack, 
  currentStep, 
  totalSteps 
}) => {
  const getWelcomeMessage = () => {
    if (!parent || children.length === 0) {
      return "Welcome aboard! Your learning journey starts now.";
    }

    const parentName = parent.first_name; // Get first name
    const firstChild = children[0];
    
    const messages = [
      `Hey ${parentName}, welcome aboard! ${firstChild.name}'s first learning plan is ready to roll.`,
      `Hi ${parentName}! Glad you're here. Let's make ${firstChild.name}'s learning smoother, together.`,
      `Hi ${parentName}! You're doing something amazing today. ${firstChild.name}'s growth story starts right here, right now.`,
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleComplete = async () => {
    if (parent && !skipAuth) {
      // Log completion of onboarding
      await AuthService.logActivity(parent.id, 'onboarding_complete');
    }
    onComplete();
  };

  const features = [
    { 
      icon: Sparkles, 
      title: 'AI Learning Plans Ready', 
      description: 'Personalized schedules crafted for each child' 
    },
    { 
      icon: Heart, 
      title: 'Parent Dashboard Active', 
      description: 'Track progress and milestones in one place' 
    },
    { 
      icon: Zap, 
      title: 'Smart Alerts Enabled', 
      description: 'Get the right updates at the right time' 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="w-6"></div> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          {/* Welcome Message */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed">
            {getWelcomeMessage()}
          </h2>

          {/* Feature Status */}
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-green-800 dark:text-green-200 text-sm">
                    {feature.title}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Children Summary */}
          {children.length > 0 && (
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {children.length === 1 ? 'Your Child' : `Your ${children.length} Children`}
              </h3>
              <div className="flex justify-center space-x-2">
                {children.map((child) => (
                  <div
                    key={child.id}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                    style={{ backgroundColor: child.colorCode }}
                    title={child.name}
                  >
                    {child.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full ${
                    i < currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Go to Dashboard Button */}
          <button
            onClick={handleComplete}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg"
          >
            Go to Dashboard
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            You can always add more children and modify settings later
          </p>
        </div>
      </div>
    </div>
  );
};