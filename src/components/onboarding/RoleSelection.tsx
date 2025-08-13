import React from 'react';
import { ArrowRight, ArrowLeft, Users, GraduationCap } from 'lucide-react';

interface RoleSelectionProps {
  selectedRole: 'parent' | 'student';
  onRoleSelect: (role: 'parent' | 'student') => void;
  onNext: () => void;
  onBack: () => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  selectedRole,
  onRoleSelect,
  onNext,
  onBack,
}) => {
  const roles = [
    {
      id: 'parent' as const,
      title: 'Parent/Guardian',
      description: 'Manage and track your children\'s learning progress',
      icon: Users,
      recommended: true,
    },
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Learn with AI tutoring and track your own progress',
      icon: GraduationCap,
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Role</h2>
          <p className="text-gray-600 dark:text-gray-300">How will you be using EduParent?</p>
        </div>

        <div className="space-y-4 mb-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onRoleSelect(role.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedRole === role.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedRole === role.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  <role.icon className="w-6 h-6" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${
                      selectedRole === role.id
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {role.title}
                    </h3>
                    {role.recommended && (
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${
                    selectedRole === role.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {role.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            onClick={onNext}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};