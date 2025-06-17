import React, { createContext, useContext, useState } from 'react';
import { Memory } from '../types';

interface MemoriesContextValue {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'timestamp'> & { id?: string; timestamp?: Date }) => void;
}

const MemoriesContext = createContext<MemoriesContextValue | undefined>(undefined);

export const MemoriesProvider = ({ children, initial }: { children: React.ReactNode; initial?: Memory[] }) => {
  const [memories, setMemories] = useState<Memory[]>(initial ?? []);

  const addMemory = (memory: Omit<Memory, 'id' | 'timestamp'> & { id?: string; timestamp?: Date }) => {
    const newMemory: Memory = {
      id: memory.id ?? Date.now().toString(),
      timestamp: memory.timestamp ?? new Date(),
      ...memory,
    } as Memory;
    setMemories(prev => [newMemory, ...prev]);
  };

  return (
    <MemoriesContext.Provider value={{ memories, addMemory }}>
      {children}
    </MemoriesContext.Provider>
  );
};

export const useMemories = () => {
  const ctx = useContext(MemoriesContext);
  if (!ctx) throw new Error('useMemories must be used within MemoriesProvider');
  return ctx;
};
