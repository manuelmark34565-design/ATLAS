'use client';

import { useState } from 'react';
import { getAgentTips } from '@/lib/chat-resources';

type PropsType = {
  isOpen: boolean;
  toggleIsOpen: () => void;
  agentId: string;
};

export default function RightSidebar({ isOpen, toggleIsOpen, agentId }: PropsType) {
  const [activeTab, setActiveTab] = useState<'tips' | 'prompts' | 'cases'>('tips');
  const tips = getAgentTips(agentId);

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-50 w-full max-w-[360px] transform bg-white dark:bg-[#0F172A] border-l border-gray-200 dark:border-gray-800 shadow-xl transition-transform duration-300 ease-in-out xl:relative xl:translate-x-0 xl:shadow-none ${
        isOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'
      }`}
    >
      <div className="flex h-full flex-col px-5 py-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
              💡 Agent Tips & Guides
            </p>
            <h2 className="mt-3 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {tips ? 'How to use this agent' : 'Agent guidance'}
            </h2>
          </div>
          <button
            type="button"
            className="xl:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
            onClick={toggleIsOpen}
          >
            <span className="sr-only">Close tips panel</span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-4 rounded-full bg-gray-100 dark:bg-white/5 p-2">
          <div className="flex gap-2">
            {['tips', 'prompts', 'cases'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab as 'tips' | 'prompts' | 'cases')}
                className={`flex-1 rounded-full py-2 text-xs font-semibold transition ${
                  activeTab === tab
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab === 'tips' ? 'Tips' : tab === 'prompts' ? 'Prompts' : 'Use Cases'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {!tips && (
            <div className="rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-white/5 p-5 text-sm text-gray-600 dark:text-gray-300">
              Select an agent to see tips and guides.
            </div>
          )}

          {tips && activeTab === 'tips' && (
            <div className="space-y-3">
              {tips.tips.map((tip, idx) => (
                <div key={idx} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 p-4">
                  <p className="text-sm text-gray-800 dark:text-gray-100">💡 {tip}</p>
                </div>
              ))}
            </div>
          )}

          {tips && activeTab === 'prompts' && (
            <div className="space-y-3">
              {tips.examplePrompts.map((prompt, idx) => (
                <div key={idx} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 p-4">
                  <p className="text-sm text-gray-800 dark:text-gray-100">✨ {prompt}</p>
                </div>
              ))}
            </div>
          )}

          {tips && activeTab === 'cases' && (
            <div className="space-y-3">
              {tips.useCases.map((useCase, idx) => (
                <div key={idx} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 p-4">
                  <p className="text-sm text-gray-800 dark:text-gray-100">🎯 {useCase}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
