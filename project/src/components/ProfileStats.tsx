import React from 'react';
import { Calendar, Target, Flame, Users } from 'lucide-react';
import { User } from '../types';

interface ProfileStatsProps {
  user: User;
}

export default function ProfileStats({ user }: ProfileStatsProps) {
  const joinDays = Math.floor((new Date().getTime() - user.joinDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="text-primary-600" size={20} />
            <span className="text-2xl font-bold text-primary-600">{user.streakDays}</span>
          </div>
          <p className="text-sm text-primary-700 font-medium">Day Streak</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="text-blue-600" size={20} />
            <span className="text-2xl font-bold text-blue-600">{user.totalMemories}</span>
          </div>
          <p className="text-sm text-blue-700 font-medium">Total Memories</p>
        </div>

        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="text-green-600" size={20} />
            <span className="text-2xl font-bold text-green-600">{joinDays}</span>
          </div>
          <p className="text-sm text-green-700 font-medium">Days Active</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="text-purple-600" size={20} />
            <span className="text-2xl font-bold text-purple-600">4</span>
          </div>
          <p className="text-sm text-purple-700 font-medium">Close Friends</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">This Year's Wrap</span>
          <button className="text-primary-600 text-sm font-medium">View All</button>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Most visited place:</span>
            <span className="font-medium">Coffee shops ☕</span>
          </div>
          <div className="flex justify-between">
            <span>Favorite mood:</span>
            <span className="font-medium">Grateful 🙏</span>
          </div>
          <div className="flex justify-between">
            <span>Memory type:</span>
            <span className="font-medium">Voice notes 🎤</span>
          </div>
        </div>
      </div>
    </div>
  );
}