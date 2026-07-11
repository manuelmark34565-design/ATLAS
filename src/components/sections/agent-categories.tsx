const CATEGORIES = [
  {
    title: 'Customer-facing agents',
    items: [
      'Customer Support Agent',
      'Lead Qualification Agent',
      'Sales Follow-Up Agent',
      'Onboarding Assistant Agent',
    ],
  },
  {
    title: 'Internal operations agents',
    items: [
      'Executive Reporting Agent',
      'Email Prioritization Agent',
      'Meeting Notes Agent',
      'CRM Update Agent',
      'Task Delegation Agent',
    ],
  },
  {
    title: 'Sales and growth agents',
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
    <section className="px-5 py-24 bg-gray-50 dark:bg-[#171F2E]">
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
            <div
              key={category.title}
              className="rounded-[24px] border border-gray-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="mb-5 text-xl font-semibold text-gray-800 dark:text-white/90">
                {category.title}
              </h3>
              <ul className="space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
