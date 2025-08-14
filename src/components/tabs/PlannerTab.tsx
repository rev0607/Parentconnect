import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Upload, 
  Camera, 
  BookOpen, 
  FileText, 
  Trophy,
  Clock,
  AlertCircle,
  CheckCircle,
  Edit3,
  Trash2,
  ChevronDown,
  Lightbulb,
  Target,
  GraduationCap
} from 'lucide-react';
import { Child } from '../../types';

interface PlannerTabProps {
  activeChild: Child;
}

interface Task {
  id: string;
  title: string;
  subject: string;
  topic: string;
  type: 'homework' | 'exam' | 'event';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'overdue';
  attachments?: string[];
  aiSuggestion?: string;
}

export const PlannerTab: React.FC<PlannerTabProps> = ({ activeChild }) => {
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('list');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    subject: 'all',
    status: 'all',
    type: 'all'
  });

  // Sample tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Quadratic Equations Practice',
      subject: 'Mathematics',
      topic: 'Algebra - Chapter 4',
      type: 'homework',
      dueDate: '2025-01-16',
      priority: 'high',
      status: 'pending',
      attachments: ['worksheet.pdf'],
      aiSuggestion: 'Start with basic examples, then move to word problems. Estimated time: 45 minutes.'
    },
    {
      id: '2',
      title: 'Photosynthesis Lab Report',
      subject: 'Science',
      topic: 'Plant Biology',
      type: 'homework',
      dueDate: '2025-01-18',
      priority: 'medium',
      status: 'pending',
      aiSuggestion: 'Include diagrams and observations from last week\'s experiment.'
    },
    {
      id: '3',
      title: 'Unit Test - Fractions',
      subject: 'Mathematics',
      topic: 'Number System',
      type: 'exam',
      dueDate: '2025-01-20',
      priority: 'high',
      status: 'pending',
      aiSuggestion: 'Physics test in 3 days — start today with 30 mins revision.'
    },
    {
      id: '4',
      title: 'English Essay - Environment',
      subject: 'English',
      topic: 'Creative Writing',
      type: 'homework',
      dueDate: '2025-01-15',
      priority: 'medium',
      status: 'overdue',
      aiSuggestion: '1 day overdue - prioritize this task immediately.'
    }
  ]);

  const getSubjectIcon = (subject: string) => {
    const icons = {
      'Mathematics': '📐',
      'Science': '🔬',
      'English': '📖',
      'Social Studies': '🌍',
      'Art': '🎨',
      'Music': '🎵',
      'Physics': '⚛️',
      'Chemistry': '🧪',
      'Biology': '🧬'
    };
    return icons[subject as keyof typeof icons] || '📚';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'homework': '📝',
      'exam': '🎯',
      'event': '📌'
    };
    return icons[type as keyof typeof icons] || '📝';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800 border-red-200',
      'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'low': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'text-yellow-600',
      'completed': 'text-green-600',
      'overdue': 'text-red-600'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'pending': Clock,
      'completed': CheckCircle,
      'overdue': AlertCircle
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = selectedFilters.subject === 'all' || task.subject === selectedFilters.subject;
    const matchesStatus = selectedFilters.status === 'all' || task.status === selectedFilters.status;
    const matchesType = selectedFilters.type === 'all' || task.type === selectedFilters.type;
    
    return matchesSearch && matchesSubject && matchesStatus && matchesType;
  });

  const aiSuggestions = [
    "Physics test in 3 days — start today with 30 mins revision.",
    "English project extended — you have extra 2 days.",
    "3 Math assignments pending — 1 overdue, prioritize this first."
  ];

  const handleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    ));
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const renderQuickActions = () => (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center space-x-3 mb-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, subjects, topics..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Add Task Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Camera className="w-4 h-4" />
          <span>Scan</span>
        </button>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <select
                value={selectedFilters.subject}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              >
                <option value="all">All Subjects</option>
                {activeChild.subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                value={selectedFilters.status}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending 🟡</option>
                <option value="completed">Completed 🟢</option>
                <option value="overdue">Overdue 🔴</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
              <select
                value={selectedFilters.type}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="homework">📝 Homework</option>
                <option value="exam">🎯 Exam</option>
                <option value="event">📌 Event</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTaskCard = (task: Task) => {
    const StatusIcon = getStatusIcon(task.status);
    
    return (
      <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          {/* Left - Icons */}
          <div className="flex flex-col items-center space-y-1">
            <div className="text-2xl">{getSubjectIcon(task.subject)}</div>
            <div className="text-lg">{getTypeIcon(task.type)}</div>
          </div>
          
          {/* Center - Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">{task.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.topic}</p>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className={`flex items-center space-x-1 ${getStatusColor(task.status)}`}>
                <StatusIcon className="w-4 h-4" />
                <span className="capitalize">{task.status}</span>
              </div>
              
              {task.attachments && task.attachments.length > 0 && (
                <div className="flex items-center space-x-1 text-gray-500">
                  <FileText className="w-4 h-4" />
                  <span>{task.attachments.length}</span>
                </div>
              )}
            </div>
            
            {/* AI Suggestion */}
            {task.aiSuggestion && (
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800 dark:text-blue-200">{task.aiSuggestion}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right - Actions */}
          <div className="flex flex-col space-y-2">
            {task.status === 'pending' && (
              <button
                onClick={() => handleTaskComplete(task.id)}
                className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                title="Mark Complete"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
            
            <button
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => handleTaskDelete(task.id)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAISuggestionPanel = () => (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="font-semibold text-purple-800 dark:text-purple-200">AI Suggestions</h3>
      </div>
      
      <div className="space-y-2">
        {aiSuggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start space-x-2 p-2 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Target className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-purple-700 dark:text-purple-300">{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Quick Actions Bar */}
      {renderQuickActions()}
      
      {/* View Toggle */}
      <div className="flex space-x-1 p-4 bg-gray-50 dark:bg-gray-900">
        {[
          { id: 'list', label: 'List View', icon: BookOpen },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeView === id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* AI Suggestion Panel */}
        {renderAISuggestionPanel()}
        
        {activeView === 'list' ? (
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {searchQuery || selectedFilters.subject !== 'all' || selectedFilters.status !== 'all' || selectedFilters.type !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Add your first task to get started'}
                </p>
              </div>
            ) : (
              filteredTasks.map(renderTaskCard)
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Calendar View
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Calendar view coming soon with monthly/weekly layouts
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};