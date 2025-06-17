export interface Memory {
  id: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'photo';
  prompt?: string;
  isLate?: boolean;
  location?: string;
  mood?: string;
}

export interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  hoursSpent: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  streakDays: number;
  totalMemories: number;
  joinDate: Date;
}
