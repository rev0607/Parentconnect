import React, { useState } from 'react';
import { Calendar, Plus, Filter, BookOpen, FileText, Trophy } from 'lucide-react';
import { Child } from '../../types';

interface PlannerTabProps {
  activeChild: Child;
}

export const PlannerTab: React.FC<PlannerTabProps> = ({ activeChild }) => {
  const [activeView, setActiveView] = useState<'calendar' | 'homework' | 'exams'>('calendar');

  const upcomingTasks = [
    {
      id: '1',
      title: 'Math Assignment Chapter 6',
      subject: 'Math',
      dueDate: '2025-01-15',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Science Project Submission',
      subject: 'Science',
      dueDate: '2025-01-16',
      priority: 'medium',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'English Essay - Environment',
      subject: 'English',
      dueDate: '2025-01-18',
      priority: 'medium',
      status: 'pending'
    },
  ];

  const upcomingExams = [
    {
      id: '1',
      subject: 'Mathematics',
      date: '2025-01-20',
      type: 'Unit Test',
      syllabus: 'Chapters 5-7'
    },
    {
      id: '2',
      subject: 'Science',
      date: '2025-01-25',
      type: 'Monthly Test',
      syllabus: 'Light and Sound'
    },
  ];

  const renderCalendarView = () => (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">This Week</h3>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {task.subject} • Due {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHomeworkView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Homework</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Homework</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {upcomingTasks.map((task) => (
          <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.subject}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.status === 'pending' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExamsView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Exams</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Exam</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {upcomingExams.map((exam) => (
          <div key={exam.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{exam.subject} {exam.type}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(exam.date).toLocaleDateString()} • {exam.syllabus}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                    {Math.ceil((new Date(exam.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'homework', label: 'Homework', icon: BookOpen },
          { id: 'exams', label: 'Exams', icon: FileText },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeView === id
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Active View Content */}
      {activeView === 'calendar' && renderCalendarView()}
      {activeView === 'homework' && renderHomeworkView()}
      {activeView === 'exams' && renderExamsView()}
    </div>
  );
};