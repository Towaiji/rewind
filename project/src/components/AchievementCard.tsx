import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const progressPercentage = (achievement.progress / achievement.total) * 100;

  return (
    <div className={`bg-white rounded-2xl p-5 border transition-all ${
      achievement.completed 
        ? 'border-green-200 bg-green-50' 
        : 'border-gray-100 hover:shadow-md'
    }`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${
          achievement.completed ? 'bg-green-500' : 'bg-primary-100'
        }`}>
          <span className="text-2xl">{achievement.icon}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
            {achievement.completed ? (
              <CheckCircle size={20} className="text-green-500" />
            ) : (
              <Circle size={20} className="text-gray-300" />
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium text-gray-900">
                {achievement.progress}/{achievement.total}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  achievement.completed ? 'bg-green-500' : 'bg-primary-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}