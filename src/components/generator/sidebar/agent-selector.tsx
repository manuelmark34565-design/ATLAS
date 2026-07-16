'use client';

import { AGENT_CATEGORIES, getAgentById } from '@/lib/agents';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  selectedCategoryId: string;
  selectedAgentId: string;
  onCategoryChange: (categoryId: string) => void;
  onAgentChange: (agentId: string) => void;
  toggleSidebar: () => void;
};

export function AgentSelector({
  selectedCategoryId,
  selectedAgentId,
  onCategoryChange,
  onAgentChange,
  toggleSidebar,
}: Props) {
  const router = useRouter();
  const [expandedCategoryId, setExpandedCategoryId] = useState(selectedCategoryId);
  const selectedAgent = getAgentById(selectedAgentId);

  useEffect(() => {
    setExpandedCategoryId(selectedCategoryId);
  }, [selectedCategoryId]);

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategoryId((current) => (current === categoryId ? '' : categoryId));
  };

  const getPricingRoute = (categoryId: string) => {
    switch (categoryId) {
      case 'internal-operations':
        return '/pricing?plan=plus&category=internal-operations';
      case 'sales-growth':
        return '/pricing?plan=plus&category=sales-growth';
      case 'build-ai-agent':
        return '/pricing?plan=pro&category=build-ai-agent';
      case 'custom-solutions':
        return '/pricing?plan=enterprise&category=custom-solutions';
      default:
        return '/text-generator';
    }
  };

  return (
    <nav className="space-y-4 px-3 pb-6">
      {AGENT_CATEGORIES.map((category) => {
        const isExpanded = expandedCategoryId === category.id;
        return (
          <div key={category.id} className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5">
            <button
              type="button"
              onClick={() => handleCategoryToggle(category.id)}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <span>{category.name}</span>
              <svg
                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isExpanded && (
              <div className="space-y-1 border-t border-gray-200 dark:border-gray-700 p-3">
                {category.agents.map((agent) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => {
                      onCategoryChange(category.id);
                      onAgentChange(agent.id);
                      if (typeof window !== 'undefined' && window.innerWidth < 1280) {
                        toggleSidebar();
                      }
                      const targetRoute = getPricingRoute(category.id);
                      router.replace(targetRoute);
                    }}
                    className={`w-full rounded-2xl px-3 py-2 text-left text-sm transition ${
                      selectedAgentId === agent.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10'
                    }`}
                  >
                    {agent.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {selectedAgent && (
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
            Active Agent
          </p>
          <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">✨ {selectedAgent.name}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{selectedAgent.description}</p>
        </div>
      )}
    </nav>
  );
}
