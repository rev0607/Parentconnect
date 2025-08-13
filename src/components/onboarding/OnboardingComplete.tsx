import React from 'react';
import { Check, Sparkles, Users, Brain } from 'lucide-react';

interface OnboardingCompleteProps {
  onComplete: () => void;
}

export const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ onComplete }) => {
  const features = [
    { icon: Brain, text: 'AI tutor is ready to help your children' },
    { icon: Users, text: 'Multi-child dashboard is set up' },
    { icon: Sparkles, text: 'Personalized learning insights await' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎉 All Set!
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Welcome to EduParent! Your personalized learning journey starts now.
        </p>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-green-800 dark:text-green-200 text-left">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg"
        >
          Start Learning Journey
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          You can always modify settings and add more children later
        </p>
      </div>
    </div>
  );
};