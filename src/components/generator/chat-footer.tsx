'use client';

import { IMPORTANT_LINKS } from '@/lib/chat-resources';
import Link from 'next/link';

export function ChatFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0F172A] px-5 md:px-12 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2026 ATLAS AI Agents. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            {IMPORTANT_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
                title={link.label}
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
