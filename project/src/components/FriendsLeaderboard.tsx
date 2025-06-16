import React from 'react';
import { Crown, Clock } from 'lucide-react';
import { Friend } from '../types';

interface FriendsLeaderboardProps {
  friends: Friend[];
}

export default function FriendsLeaderboard({ friends }: FriendsLeaderboardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Crown size={20} className="text-yellow-500" />
        <h3 className="font-semibold text-gray-900">Friends This Year</h3>
      </div>

      <div className="space-y-3">
        {friends.map((friend, index) => (
          <div key={friend.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="relative">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {index === 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown size={12} className="text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-gray-900">{friend.name}</p>
              <p className="text-sm text-gray-500">@{friend.username}</p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 text-primary-600">
                <Clock size={14} />
                <span className="font-semibold">{friend.hoursSpent}h</span>
              </div>
              <p className="text-xs text-gray-500">together</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors">
        View All Friends
      </button>
    </div>
  );
}