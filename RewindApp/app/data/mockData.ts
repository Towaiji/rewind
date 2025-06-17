import { Memory, Friend, Achievement, User } from '../../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Chen',
  username: 'alexc',
  avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150&h=150&fit=crop&crop=face',
  streakDays: 23,
  totalMemories: 156,
  joinDate: new Date('2024-01-15'),
};

export const mockMemories: Memory[] = [
  {
    id: '1',
    content: 'Had an amazing coffee chat with Sarah about the new project. Feeling inspired and ready to tackle the challenges ahead!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'text',
    prompt: 'What\'s making you feel grateful today?',
    location: 'Blue Bottle Coffee',
    mood: 'Excited',
  },
  {
    id: '2',
    content: 'Voice note about morning run',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    type: 'voice',
    prompt: 'How are you taking care of yourself today?',
    location: 'Golden Gate Park',
    mood: 'Energized',
  },
  {
    id: '4',
    content: 'Finally finished reading "Atomic Habits". The compound effect of small changes is mind-blowing. Time to implement what I learned!',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    type: 'text',
    prompt: 'What did you learn today?',
    mood: 'Accomplished',
  },
];

export const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahj',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face',
    hoursSpent: 142,
  },
  {
    id: '2',
    name: 'Mike Chen',
    username: 'mikec',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop&crop=face',
    hoursSpent: 98,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    username: 'emmaw',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150&h=150&fit=crop&crop=face',
    hoursSpent: 76,
  },
  {
    id: '4',
    name: 'David Kim',
    username: 'davidk',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=150&h=150&fit=crop&crop=face',
    hoursSpent: 54,
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: '30-Day Streak',
    description: 'Journal for 30 consecutive days',
    progress: 23,
    total: 30,
    icon: '🔥',
    completed: false,
  },
  {
    id: '2',
    title: 'Voice Master',
    description: 'Record 50 voice memories',
    progress: 50,
    total: 50,
    icon: '🎤',
    completed: true,
  },
  {
    id: '3',
    title: 'Social Butterfly',
    description: 'Spend 100 hours with friends',
    progress: 87,
    total: 100,
    icon: '🦋',
    completed: false,
  },
  {
    id: '4',
    title: 'Memory Keeper',
    description: 'Create 200 memories',
    progress: 156,
    total: 200,
    icon: '📚',
    completed: false,
  },
  {
    id: '5',
    title: 'Early Bird',
    description: 'Complete 20 morning prompts',
    progress: 15,
    total: 20,
    icon: '🌅',
    completed: false,
  },
];

export const todayPrompts = [
  "What's the vibe today?",
  "Who are you with right now?",
  "What are you wearing?",
  "What's something you don't want to forget?",
  "How are you feeling in this moment?",
  "What's making you smile today?",
  "Where are you and what's around you?",
  "What's on your mind right now?",
];