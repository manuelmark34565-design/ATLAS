'use client';

import { PRODUCTS } from '@/lib/chat-resources';
import { AGENT_CATEGORIES } from '@/lib/agents';
import Link from 'next/link';
import { useState } from 'react';
import { useAgent } from '@/context/agent-context';

export function ProductsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { onAgentChange } = useAgent();

  const handleAgentSelect = (agentId: string) => {
    onAgentChange(agentId);
    setIsOpen(false);
  };

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
      >
        📦 Products
        <svg
          className={`w-4 h-4 transition ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-[#1D2939] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-2 space-y-1 max-h-96 overflow-auto">
            {/* Products list */}
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{product.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
              <p className="px-4 text-xs text-gray-500 dark:text-gray-400 font-medium">AI Agent Categories</p>
              <div className="mt-2 space-y-1">
                {AGENT_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="px-2">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-white/5"
                    >
                      <span className="truncate">{cat.name}</span>
                      <svg
                        className={`w-4 h-4 transition ${expandedCategory === cat.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>

                    {expandedCategory === cat.id && (
                      <div className="mt-1 pl-3 space-y-1">
                        {cat.agents.map((agent) => (
                          <button
                            key={agent.id}
                            onClick={() => handleAgentSelect(agent.id)}
                            className="w-full text-left px-3 py-1.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-white/5"
                          >
                            {agent.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
