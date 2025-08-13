import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, User, Camera } from 'lucide-react';
import { Parent } from '../../types';

interface ParentProfileProps {
  parent: Parent | null;
  onParentUpdate: (parent: Parent) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ParentProfile: React.FC<ParentProfileProps> = ({
  parent,
  onParentUpdate,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    name: parent?.name || '',
    email: parent?.email || '',
    photo: parent?.photo || '',
    preferredLanguage: parent?.preferredLanguage || 'English',
  });

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      onParentUpdate({
        name: formData.name,
        email: formData.email,
        photo: formData.photo,
        preferredLanguage: formData.preferredLanguage,
      });
      onNext();
    }
  };

  const canProceed = formData.name.trim() && formData.email.trim();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Profile</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Let's set up your parent account
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Profile Photo */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Add Photo (Optional)
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="your.email@example.com"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              We'll use this for progress reports and important updates
            </p>
          </div>
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
            onClick={handleSubmit}
            disabled={!canProceed}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all"
          >
            <span>Complete Setup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          * Required fields
        </p>
      </div>
    </div>
  );
};