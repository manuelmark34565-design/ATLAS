'use client';

import { getAgentTips } from '@/lib/chat-resources';
import { useState } from 'react';

type Props = {
  agentId: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function AgentTipsPanel({ agentId, isOpen, onToggle }: Props) {
  const tips = getAgentTips(agentId);
  const [activeTab, setActiveTab] = useState<'tips' | 'prompts' | 'cases'>('tips');

  if (!tips) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 shadow-lg transition md:hidden"
        title="Toggle tips panel"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Side Panel */}
      <div
        className={`fixed md:relative right-0 top-0 md:top-auto h-full md:h-auto w-full md:w-80 bg-white dark:bg-[#1D2939] border-l border-gray-200 dark:border-gray-700 shadow-lg md:shadow-none transform transition-transform duration-300 z-50 md:z-0 ${
          isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-b from-primary-50 dark:from-primary-950 to-white dark:to-[#1D2939] p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between md:hidden">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            💡 Agent Tips
          </h3>
          <button
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block sticky top-0 bg-gradient-to-b from-primary-50 dark:from-primary-950 to-white dark:to-[#1D2939] p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            💡 Agent Tips & Guides
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#162038]">
          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 px-4 py-2 text-xs font-medium transition ${
              activeTab === 'tips'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            Tips
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`flex-1 px-4 py-2 text-xs font-medium transition ${
              activeTab === 'prompts'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            Prompts
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex-1 px-4 py-2 text-xs font-medium transition ${
              activeTab === 'cases'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
          >
            Use Cases
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100%-200px)] md:h-[calc(100%-120px)]">
          <div className="p-4 space-y-4">
            {activeTab === 'tips' && (
              <div className="space-y-3">
                {tips.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3"
                  >
                    <p className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                      💡 {tip}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'prompts' && (
              <div className="space-y-3">
                {tips.examplePrompts.map((prompt, idx) => (
                  <div
                    key={idx}
                    className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3 cursor-pointer hover:bg-green-100 dark:hover:bg-green-950/50 transition"
                  >
                    <p className="text-xs text-green-900 dark:text-green-200 leading-relaxed">
                      ✨ {prompt}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'cases' && (
              <div className="space-y-3">
                {tips.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-3"
                  >
                    <p className="text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
                      🎯 {useCase}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
