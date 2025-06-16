import React from 'react';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"></div>
          </button>
        </div>
      </div>
    </div>
  );
}