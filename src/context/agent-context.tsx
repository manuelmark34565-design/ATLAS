'use client';

import React, { createContext, useContext } from 'react';

interface AgentContextType {
  selectedCategoryId: string;
  selectedAgentId: string;
  onCategoryChange: (categoryId: string) => void;
  onAgentChange: (agentId: string) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({
  children,
  selectedCategoryId,
  selectedAgentId,
  onCategoryChange,
  onAgentChange,
}: AgentContextType & { children: React.ReactNode }) {
  return (
    <AgentContext.Provider
      value={{
        selectedCategoryId,
        selectedAgentId,
        onCategoryChange,
        onAgentChange,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}
