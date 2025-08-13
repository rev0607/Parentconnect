import React from 'react';
import { ChevronLeft, Globe, Check } from 'lucide-react';

interface LanguageSelectionProps {
  onBack: () => void;
  onContinue: () => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
];

export default function LanguageSelection({ 
  onBack, 
  onContinue, 
  selectedLanguage, 
  onLanguageChange 
}: LanguageSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Language Preference</h1>
        </div>
        
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center py-6">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === 4
                  ? 'bg-blue-600'
                  : step < 4
                  ? 'bg-blue-300'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-24">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Choose Your Language
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Select your preferred language for the app interface
          </p>
        </div>

        {/* Language Options */}
        <div className="space-y-3 max-w-md mx-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onLanguageChange(language.code)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedLanguage === language.code
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{language.flag}</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {language.name}
                  </span>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl max-w-md mx-auto">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            <strong>Note:</strong> More languages will be available in future updates
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}