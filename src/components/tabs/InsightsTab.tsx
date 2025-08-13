import React from 'react';
import { TrendingUp, TrendingDown, Target, Brain, Share2 } from 'lucide-react';
import { Child } from '../../types';

interface InsightsTabProps {
  activeChild: Child;
}

export const InsightsTab: React.FC<InsightsTabProps> = ({ activeChild }) => {
  const performanceData = [
    { subject: 'Mathematics', score: 85, improvement: 8, trend: 'up' },
    { subject: 'Science', score: 92, improvement: 12, trend: 'up' },
    { subject: 'English', score: 78, improvement: -3, trend: 'down' },
    { subject: 'Social Studies', score: 88, improvement: 5, trend: 'up' },
  ];

  const aiTips = [
    {
      id: '1',
      title: 'Focus on Geometry',
      description: 'Spend 15 more minutes on geometry problems this week to improve Math scores.',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Great Progress in Science',
      description: 'Keep up the excellent work in Science! Consider exploring advanced topics.',
      priority: 'positive',
    },
    {
      id: '3',
      title: 'English Reading Practice',
      description: 'Try reading 20 minutes daily to improve comprehension and vocabulary.',
      priority: 'medium',
    },
  ];

  const weeklyStats = {
    totalStudyTime: '12h 30m',
    completedTasks: 18,
    averageScore: 86,
    streakDays: 7,
  };

  return (
    <div className="p-4 space-y-6">
      {/* Weekly Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Time</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyStats.totalStudyTime}</p>
          <p className="text-sm text-green-600 dark:text-green-400">+2h from last week</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Score</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyStats.averageScore}%</p>
          <p className="text-sm text-green-600 dark:text-green-400">+4% improvement</p>
        </div>
      </div>

      {/* Performance by Subject */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subject Performance</h3>
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share Report</span>
          </button>
        </div>

        <div className="space-y-4">
          {performanceData.map((subject) => (
            <div key={subject.subject} className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">{subject.subject}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{subject.score}%</span>
                    <div className={`flex items-center space-x-1 ${
                      subject.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {subject.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {subject.improvement > 0 ? '+' : ''}{subject.improvement}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tips and Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Recommendations</h3>
        
        <div className="space-y-3">
          {aiTips.map((tip) => (
            <div
              key={tip.id}
              className={`p-3 rounded-lg border ${
                tip.priority === 'high'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : tip.priority === 'positive'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    tip.priority === 'high'
                      ? 'bg-red-500'
                      : tip.priority === 'positive'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div>
                  <h4 className={`font-medium ${
                    tip.priority === 'high'
                      ? 'text-red-800 dark:text-red-200'
                      : tip.priority === 'positive'
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-blue-800 dark:text-blue-200'
                  }`}>
                    {tip.title}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    tip.priority === 'high'
                      ? 'text-red-700 dark:text-red-300'
                      : tip.priority === 'positive'
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-blue-700 dark:text-blue-300'
                  }`}>
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Progress</h3>
        
        <div className="flex items-end space-x-2 h-32">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const height = Math.random() * 80 + 20; // Random height for demo
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};