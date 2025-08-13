import React, { useState } from 'react';
import { Send, Mic, Camera, BookOpen, Brain, Zap } from 'lucide-react';
import { Child } from '../../types';

interface AITutorTabProps {
  activeChild: Child;
}

export const AITutorTab: React.FC<AITutorTabProps> = ({ activeChild }) => {
  const [message, setMessage] = useState('');
  const [activeMode, setActiveMode] = useState<'chat' | 'quiz' | 'explain'>('chat');

  const chatHistory = [
    {
      id: '1',
      type: 'user',
      message: 'Can you help me understand fractions?',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'ai',
      message: 'Of course! Fractions represent parts of a whole. Think of a pizza cut into 8 slices. If you eat 3 slices, you\'ve eaten 3/8 of the pizza. Let me show you step by step...',
      timestamp: new Date(),
    },
  ];

  const quickTopics = [
    { id: '1', title: 'Solve Math Problem', icon: Brain, color: 'blue' },
    { id: '2', title: 'Explain Concept', icon: BookOpen, color: 'green' },
    { id: '3', title: 'Practice Quiz', icon: Zap, color: 'purple' },
    { id: '4', title: 'Scan & Help', icon: Camera, color: 'orange' },
  ];

  const recentQuizzes = [
    { id: '1', subject: 'Math', topic: 'Fractions', score: 85, totalQuestions: 10 },
    { id: '2', subject: 'Science', topic: 'Photosynthesis', score: 92, totalQuestions: 8 },
    { id: '3', subject: 'English', topic: 'Grammar', score: 78, totalQuestions: 12 },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
      // Add message to chat history logic here
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const renderChatMode = () => (
    <div className="flex-1 flex flex-col">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                chat.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <p className="text-sm">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about your studies..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuizMode = () => (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Adaptive Practice Quiz
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          AI-generated questions based on your learning progress
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Select Subject</h4>
          <div className="grid grid-cols-2 gap-3">
            {activeChild.subjects.map((subject) => (
              <button
                key={subject}
                className="p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-white">{subject}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Quiz Results</h4>
        <div className="space-y-3">
          {recentQuizzes.map((quiz) => (
            <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{quiz.subject} - {quiz.topic}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{quiz.totalQuestions} questions</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{quiz.score}%</p>
                <p className={`text-sm ${quiz.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {quiz.score >= 80 ? 'Great!' : 'Keep practicing'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Quick Actions */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-3">
          {quickTopics.map((topic) => (
            <button
              key={topic.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(topic.color)}`}>
                <topic.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">{topic.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex space-x-1 p-4 bg-gray-50 dark:bg-gray-900">
        {[
          { id: 'chat', label: 'Ask AI' },
          { id: 'quiz', label: 'Practice Quiz' },
          { id: 'explain', label: 'Explanations' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveMode(id as any)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeMode === id
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Active Mode Content */}
      {activeMode === 'chat' && renderChatMode()}
      {activeMode === 'quiz' && renderQuizMode()}
      {activeMode === 'explain' && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Step-by-Step Explanations
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Upload a problem or select a topic to get detailed explanations
            </p>
          </div>
        </div>
      )}
    </div>
  );
};