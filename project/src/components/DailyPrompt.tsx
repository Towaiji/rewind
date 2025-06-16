import React, { useState, useEffect } from 'react';
import { Clock, Mic, Camera, Type } from 'lucide-react';

interface DailyPromptProps {
  prompt: string;
  timeLeft: number;
  onSubmit: (content: string, type: 'text' | 'voice' | 'photo') => void;
}

export default function DailyPrompt({ prompt, timeLeft, onSubmit }: DailyPromptProps) {
  const [inputType, setInputType] = useState<'text' | 'voice' | 'photo'>('text');
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (content.trim() || inputType !== 'text') {
      onSubmit(content, inputType);
      setContent('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 mb-6 border border-primary-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary-700">Today's Prompt</span>
        </div>
        <div className="flex items-center gap-1 text-primary-600">
          <Clock size={16} />
          <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">{prompt}</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setInputType('text')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            inputType === 'text' 
              ? 'bg-primary-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          <Type size={16} />
          <span className="text-sm font-medium">Text</span>
        </button>
        <button
          onClick={() => setInputType('voice')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            inputType === 'voice' 
              ? 'bg-primary-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          <Mic size={16} />
          <span className="text-sm font-medium">Voice</span>
        </button>
        <button
          onClick={() => setInputType('photo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            inputType === 'photo' 
              ? 'bg-primary-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          <Camera size={16} />
          <span className="text-sm font-medium">Photo</span>
        </button>
      </div>

      {inputType === 'text' && (
        <div className="space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share what's on your mind..."
            className="w-full p-4 bg-white rounded-xl border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
          />
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors"
          >
            Share Memory
          </button>
        </div>
      )}

      {inputType === 'voice' && (
        <div className="text-center space-y-4">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <Mic size={32} />
          </button>
          <p className="text-sm text-gray-600">
            {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
          </p>
        </div>
      )}

      {inputType === 'photo' && (
        <div className="text-center space-y-4">
          <button
            onClick={() => handleSubmit()}
            className="w-20 h-20 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
          >
            <Camera size={32} />
          </button>
          <p className="text-sm text-gray-600">Tap to take a photo</p>
        </div>
      )}
    </div>
  );
}