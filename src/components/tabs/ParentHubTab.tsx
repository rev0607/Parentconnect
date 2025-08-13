import React from 'react';
import { Users, TrendingUp, Calendar, Award, Settings, Plus } from 'lucide-react';
import { Child } from '../../types';

interface ParentHubTabProps {
  children: Child[];
  onChildSwitch: (child: Child) => void;
}

export const ParentHubTab: React.FC<ParentHubTabProps> = ({ children, onChildSwitch }) => {
  const overallStats = {
    totalStudyHours: '45h 20m',
    completedTasks: 67,
    averageProgress: 87,
    achievementsBadges: 12,
  };

  const childrenProgress = children.map((child, index) => ({
    ...child,
    weeklyProgress: Math.floor(Math.random() * 30) + 70, // Demo data
    tasksCompleted: Math.floor(Math.random() * 10) + 5,
    currentStreak: Math.floor(Math.random() * 7) + 1,
    nextTask: `${child.subjects[0]} Assignment`,
  }));

  const familyAchievements = [
    { id: '1', title: 'Study Streak Champion', description: 'All children maintained 7-day streak', icon: Award },
    { id: '2', title: 'Math Mastery', description: 'Family average: 90% in Mathematics', icon: TrendingUp },
    { id: '3', title: 'Consistent Learners', description: '100% task completion this week', icon: Calendar },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Family Overview Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Family Learning Dashboard
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{overallStats.totalStudyHours}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Study Time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{overallStats.averageProgress}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Family Average</p>
          </div>
        </div>
      </div>

      {/* Children Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Children Progress</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Child</span>
          </button>
        </div>

        <div className="space-y-3">
          {childrenProgress.map((child) => (
            <div
              key={child.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onChildSwitch(child)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-lg"
                  style={{ backgroundColor: child.colorCode }}
                >
                  {child.name.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{child.name}</h4>
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                      {child.grade}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Progress: {child.weeklyProgress}%</span>
                    <span>•</span>
                    <span>{child.tasksCompleted} tasks done</span>
                    <span>•</span>
                    <span>{child.currentStreak} day streak</span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${child.weeklyProgress}%`,
                          backgroundColor: child.colorCode 
                        }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Next: {child.nextTask}
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-1">
                  <div className={`w-3 h-3 rounded-full ${child.weeklyProgress >= 80 ? 'bg-green-500' : child.weeklyProgress >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {child.weeklyProgress >= 80 ? 'Excellent' : child.weeklyProgress >= 60 ? 'Good' : 'Needs Help'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Family Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Family Achievements</h3>
        
        <div className="space-y-3">
          {familyAchievements.map((achievement) => (
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

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Parent Tools</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Calendar className="w-5 h-5" />
            <span>Family Calendar</span>
          </button>
          
          <button className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <TrendingUp className="w-5 h-5" />
            <span>Progress Reports</span>
          </button>
          
          <button className="flex items-center space-x-2 p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <Award className="w-5 h-5" />
            <span>Set Goals</span>
          </button>
          
          <button className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};