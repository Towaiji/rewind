import React from 'react';
import { Clock, MapPin, Mic, Camera, Type } from 'lucide-react';
import { Memory } from '../types';

interface MemoryCardProps {
  memory: Memory;
}

export default function MemoryCard({ memory }: MemoryCardProps) {
  const getTypeIcon = () => {
    switch (memory.type) {
      case 'voice': return <Mic size={16} className="text-blue-500" />;
      case 'photo': return <Camera size={16} className="text-green-500" />;
      default: return <Type size={16} className="text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {memory.prompt && (
        <div className="mb-3 p-3 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600 italic">"{memory.prompt}"</p>
        </div>
      )}
      
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">You</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-gray-900">Your Memory</span>
            {memory.isLate && (
              <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                Late
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{formatTime(memory.timestamp)}</span>
            </div>
            {memory.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{memory.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              {getTypeIcon()}
            </div>
          </div>
        </div>
      </div>

      {memory.type === 'text' && (
        <p className="text-gray-800 leading-relaxed">{memory.content}</p>
      )}

      {memory.type === 'voice' && (
        <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Mic size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-blue-700 font-medium">Voice Memory</p>
            <p className="text-blue-600 text-sm">Tap to listen</p>
          </div>
        </div>
      )}

      {memory.type === 'photo' && (
        <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Camera size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-green-700 font-medium">Photo Memory</p>
            <p className="text-green-600 text-sm">Tap to view</p>
          </div>
        </div>
      )}

      {memory.mood && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">Mood: {memory.mood}</span>
        </div>
      )}
    </div>
  );
}