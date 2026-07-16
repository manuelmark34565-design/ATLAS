export interface Agent {
  id: string;
  name: string;
  description: string;
  placeholder?: string;
  helperText?: string;
}

export interface AgentCategory {
  id: string;
  name: string;
  agents: Agent[];
}

export const AGENT_CATEGORIES: AgentCategory[] = [
  {
    id: 'customer-facing',
    name: 'Customer-facing agents',
    agents: [
      {
        id: 'customer-support',
        name: 'Customer Support Agent',
        description: 'Handles customer inquiries and support requests',
        placeholder: 'Describe your customer support issue...',
        helperText: 'Get instant support and answers to common questions.',
      },
      {
        id: 'lead-qualification',
        name: 'Lead Qualification Agent',
        description: 'Qualifies and scores potential leads',
        placeholder: 'Enter lead information...',
        helperText: 'Automatically qualify and score your leads.',
      },
      {
        id: 'sales-followup',
        name: 'Sales Follow-Up Agent',
        description: 'Manages sales follow-up communications',
        placeholder: 'Describe the follow-up needed...',
        helperText: 'Automate your sales follow-up process.',
      },
      {
        id: 'onboarding-assistant',
        name: 'Onboarding Assistant Agent',
        description: 'Guides new users through onboarding',
        placeholder: 'Ask onboarding questions...',
        helperText: 'Streamline the customer onboarding experience.',
      },
    ],
  },
  {
    id: 'internal-operations',
    name: 'Internal operations agents',
    agents: [
      {
        id: 'executive-reporting',
        name: 'Executive Reporting Agent',
        description: 'Generates executive reports and summaries',
        placeholder: 'Provide data for executive reporting...',
        helperText: 'Create executive reports and dashboards.',
      },
      {
        id: 'email-prioritization',
        name: 'Email Prioritization Agent',
        description: 'Prioritizes and categorizes emails',
        placeholder: 'Paste an email or describe the inbox task...',
        helperText: 'Sort messages, flag urgency, and turn them into action items.',
      },
      {
        id: 'meeting-notes',
        name: 'Meeting Notes Agent',
        description: 'Summarizes meetings and creates action items',
        placeholder: 'Paste meeting transcript or notes...',
        helperText: 'Extract key decisions and action items from meetings.',
      },
      {
        id: 'crm-update',
        name: 'CRM Update Agent',
        description: 'Updates and maintains CRM records',
        placeholder: 'Describe the CRM update...',
        helperText: 'Keep your CRM synchronized and up-to-date.',
      },
      {
        id: 'task-delegation',
        name: 'Task Delegation Agent',
        description: 'Delegates tasks and assigns work',
        placeholder: 'Describe the task to delegate...',
        helperText: 'Distribute tasks and manage team workload.',
      },
    ],
  },
  {
    id: 'sales-growth',
    name: 'Sales and growth agents',
    agents: [
      {
        id: 'proposal-drafting',
        name: 'Proposal Drafting Agent',
        description: 'Drafts professional proposals',
        placeholder: 'Describe your proposal...',
        helperText: 'Generate professional sales proposals quickly.',
      },
      {
        id: 'research-summary',
        name: 'Research Summary Agent',
        description: 'Summarizes research and market data',
        placeholder: 'Paste research content...',
        helperText: 'Extract key insights from market research.',
      },
      {
        id: 'content-review',
        name: 'Content Review Agent',
        description: 'Reviews and improves content quality',
        placeholder: 'Paste content for review...',
        helperText: 'Enhance and optimize your content.',
      },
      {
        id: 'finance-followup',
        name: 'Finance Follow-Up Agent',
        description: 'Manages finance-related follow-ups',
        placeholder: 'Describe finance follow-up needed...',
        helperText: 'Automate financial follow-up processes.',
      },
      {
        id: 'knowledge-base',
        name: 'Knowledge Base Assistant Agent',
        description: 'Provides knowledge base assistance',
        placeholder: 'Search your knowledge base...',
        helperText: 'Access and leverage your knowledge base.',
      },
      {
        id: 'recruitment-screening',
        name: 'Recruitment Screening Agent',
        description: 'Screens and evaluates candidates',
        placeholder: 'Paste candidate information...',
        helperText: 'Screen and evaluate job candidates efficiently.',
      },
    ],
  },
  {
    id: 'build-ai-agent',
    name: 'Build Your AI Agent',
    agents: [
      {
        id: 'custom-agent-builder',
        name: 'Custom Agent Builder',
        description: 'Create your own AI agent with custom instructions and behaviors',
        placeholder: 'Describe your AI agent requirements...',
        helperText: 'Design and build a custom AI agent tailored to your needs.',
      },
    ],
  },
  {
    id: 'custom-solutions',
    name: 'Custom Solutions',
    agents: [
      {
        id: 'bespoke-agent-consultation',
        name: 'Bespoke Agent Consultation',
        description: 'Get help building your personalized AI agent with our team',
        placeholder: 'Tell us about your custom agent needs...',
        helperText: 'Contact our team to create a bespoke AI agent tailored to your business.',
      },
    ],
  },
];

export const getAllAgents = (): Agent[] => {
  return AGENT_CATEGORIES.flatMap((category) => category.agents);
};

export const getAgentById = (id: string): Agent | undefined => {
  return getAllAgents().find((agent) => agent.id === id);
};

export const getCategoryById = (id: string): AgentCategory | undefined => {
  return AGENT_CATEGORIES.find((category) => category.id === id);
};
