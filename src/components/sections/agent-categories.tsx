import Link from 'next/link';

const CATEGORIES = [
  {
    title: 'Customer-facing agents',
    badge: 'Customer experience',
    categoryId: 'customer-facing',
    agentId: 'customer-support',
    description:
      'Support teams, growth teams, and onboarding flows become faster and more consistent with AI agents designed for real conversations.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    items: [
      'Customer Support Agent',
      'Lead Qualification Agent',
      'Sales Follow-Up Agent',
      'Onboarding Assistant Agent',
    ],
  },
  {
    title: 'Internal operations agents',
    badge: 'Operations',
    categoryId: 'internal-operations',
    agentId: 'executive-reporting',
    description:
      'Turn repetitive work into coordinated workflows with agents that help teams summarize, prioritize, and execute with less friction.',
    image:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    items: [
      'Executive Reporting Agent',
      'Email Prioritization Agent',
      'Meeting Notes Agent',
      'Meeting Intelligence Agent',
      'CRM Update Agent',
      'Task Delegation Agent',
    ],
  },
  {
    title: 'Sales and growth agents',
    badge: 'Revenue growth',
    categoryId: 'sales-growth',
    agentId: 'proposal-drafting',
    description:
      'Give your go-to-market motion a stronger engine with agents that help draft, research, review, and follow through faster.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    items: [
      'Proposal Drafting Agent',
      'Research Summary Agent',
      'Content Review Agent',
      'Finance Follow-Up Agent',
      'Knowledge Base Assistant Agent',
      'Recruitment Screening Agent',
    ],
  },
];

export function AgentCategoriesSection() {
  return (
    <section className="bg-gray-50 px-5 py-24 dark:bg-[#171F2E]">
      <div className="mx-auto max-w-[76rem]">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">
            Agent categories
          </p>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white/90 md:text-4xl">
            Built for every part of your business
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
            Your AI Employee can be expanded with specialized agents for customer support, operations, sales, and growth.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <article
              key={category.title}
              className="group overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                  {category.badge}
                </div>
              </div>

              <div className="p-7">
                <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white/90">
                  {category.title}
                </h3>
                <p className="mb-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {category.description}
                </p>

                <ul className="space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/text-generator?category=${category.categoryId}&agent=${category.agentId}`}
                  className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-medium text-primary-500 transition hover:text-primary-600 dark:border-white/10"
                >
                  <span>Explore agents</span>
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
