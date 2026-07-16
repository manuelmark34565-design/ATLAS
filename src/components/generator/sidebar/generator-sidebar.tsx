"use client";

import { SearchIcon } from '@/icons/icons';
import { NewChat } from './new-chat';
import { AgentSelector } from './agent-selector';

type Props = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedCategoryId: string;
  selectedAgentId: string;
  onCategoryChange: (categoryId: string) => void;
  onAgentChange: (agentId: string) => void;
};

export default function GeneratorSidebar({
  sidebarOpen,
  toggleSidebar,
  selectedCategoryId,
  selectedAgentId,
  onCategoryChange,
  onAgentChange,
}: Props) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-full max-w-[320px] transform bg-white dark:bg-[#0F172A] border-r border-gray-200 dark:border-gray-800 shadow-xl transition-transform duration-300 ease-in-out xl:relative xl:translate-x-0 xl:shadow-none ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                AI Agent Categories
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Browse categories, switch agents, and start a new chat.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="xl:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <span className="sr-only">Close sidebar</span>
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

          <div className="mt-4 space-y-3">
            <NewChat toggleSidebar={toggleSidebar} />
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search"
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-gray-700 dark:bg-[#111827] dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-700/30"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AgentSelector
            selectedCategoryId={selectedCategoryId}
            selectedAgentId={selectedAgentId}
            onCategoryChange={onCategoryChange}
            onAgentChange={onAgentChange}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </div>
    </aside>
  );
}
