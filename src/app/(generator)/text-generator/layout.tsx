import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Text Generator',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col bg-gray-50 dark:bg-gray-900 h-full">
      <div className="relative flex flex-col h-full isolate">{children}</div>
    </main>
  );
}
