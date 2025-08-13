import React from 'react';
import { Calendar, Upload, AlertCircle, Trophy, Clock } from 'lucide-react';
import { Child } from '../../types';

interface HomeTabProps {
  activeChild: Child;
}

export const HomeTab: React.FC<HomeTabProps> = ({ activeChild }) => {
  const todaysTasks = [
    { id: '1', title: 'Math Homework - Chapter 5', subject: 'Math', dueTime: '6:00 PM', priority: 'high' },
    { id: '2', title: 'Science Project Review', subject: 'Science', dueTime: '8:00 PM', priority: 'medium' },
    { id: '3', title: 'English Reading', subject: 'English', dueTime: '7:30 PM', priority: 'low' },
  ];

  const achievements = [
    { id: '1', title: 'Math Streak', description: '5 days in a row!', icon: Trophy },
    { id: '2', title: 'Quick Learner', description: 'Completed 3 lessons today', icon: Clock },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* AI Daily Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Good Morning! 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          Here's {activeChild.name}'s plan for today. They have 3 tasks scheduled and are performing well in Math.
        </p>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            3 Tasks Today
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
            On Track
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">Quick Scan</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Upload homework</span>
          </div>
        </button>
        
        <button className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="font-medium text-gray-900 dark:text-white">Add Task</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Quick add</span>
          </div>
        </button>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Tasks</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{todaysTasks.length} tasks</span>
        </div>
        
        <div className="space-y-3">
          {todaysTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{task.subject}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{task.dueTime}</span>
                </div>
              </div>
              {task.priority === 'high' && (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
        
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
            >
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-800 rounded-lg flex items-center justify-center">
                <achievement.icon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{achievement.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};