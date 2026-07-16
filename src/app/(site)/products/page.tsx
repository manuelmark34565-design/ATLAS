import Link from 'next/link';
import { AGENT_CATEGORIES } from '@/lib/agents';
import { PRODUCTS } from '@/lib/chat-resources';

const CATEGORY_ACCESS = {
  'customer-facing': {
    tier: 'Plus',
    description: 'Unlock the full customer-facing suite for support, qualification, and follow-up.',
  },
  'internal-operations': {
    tier: 'Plus',
    description: 'Unlock internal operations agents for reporting, inbox triage, and workflow automation.',
  },
  'sales-growth': {
    tier: 'Plus',
    description: 'Unlock growth agents for outreach, research, and content workflows.',
  },
  'build-ai-agent': {
    tier: 'Pro',
    description: 'Build and customize your own AI agent with advanced workflows.',
  },
  'custom-solutions': {
    tier: 'Enterprise',
    description: 'Get a bespoke solution with dedicated support and custom agent design.',
  },
} as const;

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(91,108,255,0.14),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#fdfdff_100%)] px-6 py-20 text-gray-900 dark:bg-none dark:text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-600 dark:text-primary-400">
            AI Agent Categories
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Pick a category and unlock the right AI agents for your team.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Start with free essentials or upgrade to access more advanced categories, custom agents, and enterprise support.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-400">
                    {product.icon} Product
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>
              </div>

              <Link
                href={product.href}
                className="mt-6 inline-flex items-center rounded-full bg-[#0F172A] px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400"
              >
                Open {product.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {AGENT_CATEGORIES.map((category) => {
            const access = CATEGORY_ACCESS[category.id as keyof typeof CATEGORY_ACCESS];
            const isFree = category.id === 'customer-facing';

            return (
              <div
                key={category.id}
                className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {access?.description}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isFree ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'}`}>
                    {isFree ? 'Free access' : `${access?.tier} plan`}
                  </span>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {category.agents.map((agent) => (
                    <li key={agent.id} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary-500" />
                      <span>{agent.name}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={isFree ? '/text-generator' : '/pricing'}
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${isFree ? 'bg-[#0F172A] text-white hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-400' : 'border border-gray-300 bg-white text-gray-800 hover:border-primary-500 hover:text-primary-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-primary-300'}`}
                  >
                    {isFree ? 'Open in chat' : `Upgrade to ${access?.tier}`}
                  </Link>
                  {!isFree && (
                    <Link
                      href="/text-generator"
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-300"
                    >
                      Preview chat
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
