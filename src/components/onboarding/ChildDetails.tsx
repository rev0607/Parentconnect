import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, X, User } from 'lucide-react';
import { Child } from '../../types';

interface ChildDetailsProps {
  children: Child[];
  onChildrenUpdate: (children: Child[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ChildDetails: React.FC<ChildDetailsProps> = ({
  children,
  onChildrenUpdate,
  onNext,
  onBack,
}) => {
  const [currentChild, setCurrentChild] = useState({
    name: '',
    grade: '',
    school: '',
    subjects: [] as string[],
  });

  const [availableSubjects] = useState([
    'Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'
  ]);

  const colorCodes = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const handleSubjectToggle = (subject: string) => {
    setCurrentChild(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleAddChild = () => {
    if (currentChild.name && currentChild.grade && currentChild.school && currentChild.subjects.length > 0) {
      const newChild: Child = {
        id: Date.now().toString(),
        ...currentChild,
        colorCode: colorCodes[children.length % colorCodes.length],
      };
      
      const updatedChildren = [...children, newChild];
      onChildrenUpdate(updatedChildren);
      
      setCurrentChild({
        name: '',
        grade: '',
        school: '',
        subjects: [],
      });
    }
  };

  const handleRemoveChild = (childId: string) => {
    const updatedChildren = children.filter(child => child.id !== childId);
    onChildrenUpdate(updatedChildren);
  };

  const canProceed = children.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Add Your Children</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Tell us about your {children.length === 0 ? 'first' : 'next'} child
          </p>
        </div>

        {/* Added Children */}
        {children.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Added Children:</h3>
            <div className="space-y-2">
              {children.map((child) => (
                <div key={child.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: child.colorCode }}
                  >
                    {child.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{child.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{child.grade} • {child.school}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveChild(child.id)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Child Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Child's Name
            </label>
            <input
              type="text"
              value={currentChild.name}
              onChange={(e) => setCurrentChild(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter child's name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Grade
              </label>
              <select
                value={currentChild.grade}
                onChange={(e) => setCurrentChild(prev => ({ ...prev, grade: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Grade</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                  <option key={grade} value={`Grade ${grade}`}>Grade {grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                School
              </label>
              <input
                type="text"
                value={currentChild.school}
                onChange={(e) => setCurrentChild(prev => ({ ...prev, school: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="School name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subjects (Select at least one)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => handleSubjectToggle(subject)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    currentChild.subjects.includes(subject)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddChild}
            disabled={!currentChild.name || !currentChild.grade || !currentChild.school || currentChild.subjects.length === 0}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add This Child</span>
          </button>
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
            disabled={!canProceed}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {children.length > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            You can add more children later in the app settings
          </p>
        )}
      </div>
    </div>
  );
};