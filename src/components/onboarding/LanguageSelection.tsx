import React from 'react';
import { ArrowRight, ArrowLeft, Globe } from 'lucide-react';

interface LanguageSelectionProps {
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  selectedLanguage,
  onLanguageSelect,
  onNext,
  onBack,
}) => {
  const languages = [
    { code: 'English', name: 'English', flag: '🇺🇸' },
    { code: 'Hindi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'Spanish', name: 'Español', flag: '🇪🇸' },
    { code: 'French', name: 'Français', flag: '🇫🇷' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Language</h2>
          <p className="text-gray-600 dark:text-gray-300">Select your preferred language for the app</p>
        </div>

        <div className="space-y-3 mb-8">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onLanguageSelect(language.code)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedLanguage === language.code
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{language.flag}</span>
                <div className="text-left flex-1">
                  <h3 className={`font-medium ${
                    selectedLanguage === language.code
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {language.name}
                  </h3>
                </div>
                {selectedLanguage === language.code && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
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
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};