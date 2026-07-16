'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GeneratorHeader from './generator-header';
import GeneratorSidebar from './sidebar/generator-sidebar';
import RightSidebar from './sidebar/chat-history-sidebar';
import { AgentProvider } from '@/context/agent-context';
import { AGENT_CATEGORIES } from '@/lib/agents';

export default function GeneratorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(AGENT_CATEGORIES[0].id);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(AGENT_CATEGORIES[0].agents[0].id);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    if (typeof window !== 'undefined' && window.innerWidth < 1280) {
      setRightSidebarOpen(false);
    }
  };

  const toggleRightSidebar = () => setRightSidebarOpen((prev) => !prev);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const category = AGENT_CATEGORIES.find((cat) => cat.id === categoryId);
    if (category && category.agents.length > 0) {
      setSelectedAgentId(category.agents[0].id);
    }
    if (typeof window !== 'undefined' && window.innerWidth < 1280) {
      setRightSidebarOpen(false);
    }
  };

  useEffect(() => {
    const categoryId = searchParams.get('category');
    const agentId = searchParams.get('agent');

    if (!categoryId) {
      return;
    }

    const category = AGENT_CATEGORIES.find((item) => item.id === categoryId);
    if (!category) {
      return;
    }

    const matchedAgent = category.agents.find((item) => item.id === agentId) ?? category.agents[0];
    setSelectedCategoryId(category.id);
    setSelectedAgentId(matchedAgent.id);
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <GeneratorHeader
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        toggleRightSidebar={toggleRightSidebar}
      />

      <div className="isolate relative grid lg:grid-cols-[auto_1fr_auto] dark:bg-dark-secondary flex-[1_1_0]">
        <GeneratorSidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedCategoryId={selectedCategoryId}
          selectedAgentId={selectedAgentId}
          onCategoryChange={handleCategoryChange}
          onAgentChange={setSelectedAgentId}
        />

        {/* Pass agent state through context */}
        <AgentProvider
          selectedCategoryId={selectedCategoryId}
          selectedAgentId={selectedAgentId}
          onCategoryChange={handleCategoryChange}
          onAgentChange={setSelectedAgentId}
        >
          {children}
        </AgentProvider>

        <RightSidebar
          isOpen={rightSidebarOpen}
          toggleIsOpen={toggleRightSidebar}
          agentId={selectedAgentId}
        />

        {/* Overlays */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-gray-800/80 backdrop-blur-lg transition-opacity"
            aria-hidden="true"
            onClick={toggleSidebar}
          />
        )}

        {rightSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-800/80 backdrop-blur-lg transition-opacity xl:hidden"
            aria-hidden="true"
            onClick={toggleRightSidebar}
          />
        )}
      </div>
    </div>
  );
}
