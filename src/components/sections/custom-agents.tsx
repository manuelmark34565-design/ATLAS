const AGENTS = [
  {
    title: 'Executive Reporting',
    description: 'Turn project context into concise leadership updates, board-style summaries, and decision-ready status reports.',
    accent: 'Leadership updates',
  },
  {
    title: 'Email Prioritization',
    description: 'Sort incoming messages, highlight urgent requests, and turn your inbox into a clear action list.',
    accent: 'Inbox triage',
  },
  {
    title: 'Meeting Notes',
    description: 'Capture decisions, summarize discussion points, and generate action items you can follow up on immediately.',
    accent: 'Follow-ups',
  },
];

export function CustomAgentsSection() {
  return (
    <section className="px-5 py-24 bg-white dark:bg-[#0F172A]">
      <div className="mx-auto max-w-[72rem]">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">
            Custom AI agents
          </p>
          <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white/90 md:text-4xl">
            Built for the work that matters most
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
            These agents help turn routine communication into structured output you can use right away.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {AGENTS.map((agent) => (
            <div
              key={agent.title}
              className="rounded-[24px] border border-gray-200 bg-gray-50 p-7 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <p className="mb-3 text-sm font-medium text-primary-500">{agent.accent}</p>
              <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white/90">
                {agent.title}
              </h3>
              <p className="leading-7 text-gray-500 dark:text-gray-400">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
