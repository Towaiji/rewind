import React, { useState, useEffect } from 'react';
import TabBar from './components/TabBar';
import Header from './components/Header';
import DailyPrompt from './components/DailyPrompt';
import MemoryCard from './components/MemoryCard';
import FriendsLeaderboard from './components/FriendsLeaderboard';
import AchievementCard from './components/AchievementCard';
import ProfileStats from './components/ProfileStats';
import { Memory } from './types';
import {
  mockMemories,
  mockFriends,
  mockAchievements,
  mockUser,
  todayPrompts
} from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [memories, setMemories] = useState<Memory[]>(mockMemories);
  const [timeLeft, setTimeLeft] = useState(18430); // 5 hours 7 minutes 10 seconds in seconds
  const [todayPrompt] = useState(todayPrompts[Math.floor(Math.random() * todayPrompts.length)]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePromptSubmit = (content: string, type: 'text' | 'voice' | 'photo') => {
    const newMemory: Memory = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      type,
      prompt: todayPrompt,
      location: 'Current Location',
      mood: 'Happy',
    };

    setMemories(prev => [newMemory, ...prev]);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'feed':
        return 'Today';
      case 'rewind':
        return 'Rewind';
      case 'profile':
        return 'Profile';
      default:
        return 'Rewind';
    }
  };

  const getTabSubtitle = () => {
    switch (activeTab) {
      case 'feed':
        return 'Your memory timeline';
      case 'rewind':
        return 'Capture moments';
      case 'profile':
        return `${mockUser.streakDays} day streak`;
      default:
        return undefined;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={getTabTitle()} subtitle={getTabSubtitle()} />

      <div className="max-w-md mx-auto px-4 py-6">

        {activeTab === 'feed' && (
          <div className="space-y-6">
            <FriendsLeaderboard friends={mockFriends} />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Memories</h3>
              <div className="space-y-4">
                {memories.map(memory => (
                  <MemoryCard key={memory.id} memory={memory} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewind' && (
          <div className="space-y-6">
            <DailyPrompt
              prompt={todayPrompt}
              timeLeft={timeLeft}
              onSubmit={handlePromptSubmit}
            />

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📸</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Capture Mode</h3>
              <p className="text-gray-600 mb-4">Quick capture for spontaneous memories</p>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-700 transition-colors">
                Start Capturing
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎤</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Stories</h3>
              <p className="text-gray-600 mb-4">Share your stories through voice</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                Browse Stories
              </button>
            </div>

            

          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <ProfileStats user={mockUser} />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
              <div className="space-y-4">
                {mockAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              <div className="space-y-3">
                <button className="w-full text-left py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  Privacy & Security
                </button>
                <button className="w-full text-left py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  Notification Settings
                </button>
                <button className="w-full text-left py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  Export My Data
                </button>
                <button className="w-full text-left py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  Time Capsule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;