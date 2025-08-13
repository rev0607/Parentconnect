export interface Child {
  id: string;
  name: string;
  grade: string;
  school: string;
  subjects: string[];
  photo?: string;
  colorCode: string;
}

export interface Parent {
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  preferredLanguage: string;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'overdue';
  childId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  childName: string;
  childColor: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  read: boolean;
}

export interface PerformanceData {
  subject: string;
  score: number;
  improvement: number;
  childId: string;
}