import React from 'react';
import { ArrowRight, Calendar, Users, Camera, Bell } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext, onSkip }) => {
  const features = [
    { 
      icon: Calendar, 
      title: 'Adaptive Learning Plans', 
      description: 'AI-crafted schedules that evolve with your child.',
      emoji: '📅'
    },
    { 
      icon: Users, 
      title: 'Unified Parent Hub', 
      description: 'Track every milestone, for every child, in one place.',
      emoji: '👨‍👩‍👧'
    },
    { 
      icon: Camera, 
      title: 'Smart Homework Scan', 
      description: 'Snap a photo — AI turns it into instant guidance.',
      emoji: '📸'
    },
    { 
      icon: Bell, 
      title: 'Intelligent Alerts', 
      description: 'AI ensures you get the right updates at the right time.',
      emoji: '🔔'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="w-6"></div> {/* Spacer for centering */}
        <button
          onClick={onSkip}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium"
        >
          Skip setup
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">AI</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Smart Parent AI</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Smarter Parenting, Better Learning</p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{feature.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Get Started Button */}
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};