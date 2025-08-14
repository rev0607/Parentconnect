import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, X, User, Calendar, GraduationCap, BookOpen } from 'lucide-react';
import { OnboardingService } from '../../services/onboardingService';
import { AuthService } from '../../services/authService';
import type { Parent as DBParent, Child as DBChild } from '../../lib/supabase';

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

interface Parent {
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  preferredLanguage: string;
}

interface ParentChildSetupProps {
  children: Child[];
  parent: DBParent | null;
  onChildrenUpdate: (children: Child[]) => void;
  onParentUpdate: (parent: DBParent) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export const ParentChildSetup: React.FC<ParentChildSetupProps> = ({
  children,
  parent,
  onChildrenUpdate,
  onParentUpdate,
  onNext,
  onBack,
  onSkip,
}) => {
  const [parentData, setParentData] = useState({
    first_name: parent?.first_name || '',
    last_name: parent?.last_name || '',
    email: parent?.email || '',
    phone: parent?.phone || '',
  });

  const [currentChild, setCurrentChild] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    grade: '',
    board: '',
    subjects: [] as string[],
  });

  const [showChildForm, setShowChildForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const boards = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE'];
  const grades = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`);
  
  const getSubjectsByGrade = (grade: string, board: string) => {
    const baseSubjects = ['Mathematics', 'Science', 'English', 'Social Studies'];
    const advancedSubjects = ['Physics', 'Chemistry', 'Biology', 'Computer Science'];
    const gradeNum = parseInt(grade.replace('Grade ', ''));
    
    if (gradeNum >= 9) {
      return [...baseSubjects, ...advancedSubjects, 'Hindi', 'Economics', 'History'];
    }
    return [...baseSubjects, 'Hindi', 'Art', 'Physical Education'];
  };

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
    if (currentChild.first_name && currentChild.last_name && currentChild.grade && currentChild.board && currentChild.subjects.length > 0) {
      const newChild: Child = {
        id: Date.now().toString(),
        name: `${currentChild.first_name} ${currentChild.last_name}`,
        grade: currentChild.grade,
        school: `${currentChild.board} School`, // Simplified for demo
        subjects: currentChild.subjects,
        colorCode: colorCodes[children.length % colorCodes.length],
      };
      
      const updatedChildren = [...children, newChild];
      onChildrenUpdate(updatedChildren);
      
      setCurrentChild({
        first_name: '',
        last_name: '',
        dob: '',
        grade: '',
        board: '',
        subjects: [],
      });
      setShowChildForm(false);
    }
  };

  const handleRemoveChild = (childId: string) => {
    const updatedChildren = children.filter(child => child.id !== childId);
    onChildrenUpdate(updatedChildren);
  };

  const handleContinue = () => {
    if (parentData.first_name && parentData.last_name && parentData.email && parentData.phone && children.length > 0 && parent) {
      handleSaveData();
    }
  };

  const handleSaveData = async () => {
    if (!parent) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Update parent data
      const { parent: updatedParent, error: parentError } = await AuthService.createOrUpdateParent({
        google_id: parent.google_id || '',
        first_name: parentData.first_name,
        last_name: parentData.last_name,
        email: parentData.email,
        phone: parentData.phone,
      });

      if (parentError) {
        throw new Error('Failed to update parent profile');
      }

      // Save children data
      const childrenData = children.map(child => ({
        first_name: child.name.split(' ')[0] || '',
        last_name: child.name.split(' ').slice(1).join(' ') || '',
        grade: child.grade,
        board: child.school.replace(' School', ''),
        subjects: child.subjects,
      }));

      const { children: savedChildren, error: childrenError } = await OnboardingService.saveChildren(
        updatedParent!.id,
        childrenData
      );

      if (childrenError) {
        throw new Error('Failed to save children data');
      }

      // Log activity
      await AuthService.logActivity(updatedParent!.id, 'profile_setup');

      onParentUpdate(updatedParent!);
      onNext();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = parentData.first_name && parentData.last_name && parentData.email && parentData.phone && children.length > 0;
  const availableSubjects = currentChild.grade && currentChild.board 
    ? getSubjectsByGrade(currentChild.grade, currentChild.board) 
    : [];

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
        <button
          onClick={onSkip}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium"
        >
          Skip for now
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-h-[80vh] overflow-y-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Parent & Child Setup</h2>
            <p className="text-gray-600 dark:text-gray-300">Let's set up your profile and add your children</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Parent Profile Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Parent Profile
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={parentData.first_name}
                onChange={(e) => setParentData(prev => ({ ...prev, first_name: e.target.value }))}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                value={parentData.last_name}
                onChange={(e) => setParentData(prev => ({ ...prev, last_name: e.target.value }))}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="email"
                value={parentData.email}
                onChange={(e) => setParentData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <input
                type="tel"
                value={parentData.phone}
                onChange={(e) => setParentData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Phone (Required)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Children Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Children ({children.length})
              </h3>
              <button
                onClick={() => setShowChildForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Child</span>
              </button>
            </div>

            {/* Added Children */}
            {children.length > 0 && (
              <div className="space-y-3 mb-4">
                {children.map((child) => (
                  <div key={child.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
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
            )}

            {/* Child Form */}
            {showChildForm && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">Add New Child</h4>
                  <button
                    onClick={() => setShowChildForm(false)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <input
                  type="text"
                  value={currentChild.first_name}
                  onChange={(e) => setCurrentChild(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder="First Name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />

                <input
                  type="text"
                  value={currentChild.last_name}
                  onChange={(e) => setCurrentChild(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />

                <input
                  type="date"
                  value={currentChild.dob}
                  onChange={(e) => setCurrentChild(prev => ({ ...prev, dob: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={currentChild.grade}
                    onChange={(e) => setCurrentChild(prev => ({ ...prev, grade: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Grade</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>

                  <select
                    value={currentChild.board}
                    onChange={(e) => setCurrentChild(prev => ({ ...prev, board: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Board</option>
                    {boards.map(board => (
                      <option key={board} value={board}>{board}</option>
                    ))}
                  </select>
                </div>

                {availableSubjects.length > 0 && (
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
                )}

                <button
                  onClick={handleAddChild}
                  disabled={!currentChild.first_name || !currentChild.last_name || !currentChild.grade || !currentChild.board || currentChild.subjects.length === 0}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Add This Child
                </button>
              </div>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!canProceed}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all font-medium disabled:opacity-50"
          >
            <span>{isLoading ? 'Saving...' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};