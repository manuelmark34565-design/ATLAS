export interface Product {
  id: string;
  name: string;
  description: string;
  href: string;
  icon?: string;
}

export interface ResourceLink {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

export interface AgentTip {
  agentId: string;
  tips: string[];
  examplePrompts: string[];
  useCases: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'API docs and guides',
    href: '/docs',
    icon: '📚',
  },
  {
    id: 'code-examples',
    name: 'Code Examples',
    description: 'Templates & samples',
    href: '/docs/examples',
    icon: '💻',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'View your workspace',
    href: '/dashboard',
    icon: '📊',
  },
  {
    id: 'api-keys',
    name: 'API Keys',
    description: 'Manage integrations',
    href: '/dashboard/settings/api-keys',
    icon: '🔑',
  },
  {
    id: 'settings',
    name: 'AI Settings',
    description: 'Model & usage settings',
    href: '/dashboard/settings',
    icon: '⚙️',
  },
  {
    id: 'billing',
    name: 'Billing',
    description: 'Usage & payments',
    href: '/dashboard/billing',
    icon: '💳',
  },
];

export const IMPORTANT_LINKS: ResourceLink[] = [
  {
    id: 'help',
    label: 'Help & Support',
    href: '/help',
    icon: '❓',
  },
  {
    id: 'contact',
    label: 'Contact Us',
    href: '/contact',
    icon: '📞',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: '⚙️',
  },
  {
    id: 'pricing',
    label: 'Pricing',
    href: '/pricing',
    icon: '📋',
  },
  {
    id: 'feedback',
    label: 'Feature Request',
    href: '/feedback',
    icon: '🎯',
  },
  {
    id: 'status',
    label: 'System Status',
    href: '/status',
    icon: '✅',
  },
];

export const AGENT_TIPS: AgentTip[] = [
  {
    agentId: 'customer-support',
    tips: [
      'Provide customer context for better responses',
      'Use specific product/service names',
      'Include recent interaction history when relevant',
    ],
    examplePrompts: [
      'Customer says our app is crashing on login',
      'User forgot their password and needs reset help',
      'Customer wants to know about our refund policy',
    ],
    useCases: [
      '24/7 customer support automation',
      'FAQ handling and troubleshooting',
      'First-line triage and escalation',
    ],
  },
  {
    agentId: 'lead-qualification',
    tips: [
      'Include lead source information',
      'Provide company size and industry',
      'Mention budget range if available',
    ],
    examplePrompts: [
      'Qualify this B2B SaaS lead with $50k annual budget',
      'Score this startup founder interested in our platform',
      'Evaluate this enterprise prospect',
    ],
    useCases: [
      'Automatic lead scoring',
      'Sales team workload optimization',
      'High-value prospect identification',
    ],
  },
  {
    agentId: 'sales-followup',
    tips: [
      'Include previous conversation details',
      'Mention specific pain points discussed',
      'Reference timeline expectations',
    ],
    examplePrompts: [
      'Create follow-up for prospect interested but undecided',
      'Draft email for delayed decision-maker',
      'Write check-in for end-of-quarter deal',
    ],
    useCases: [
      'Automated sales outreach sequences',
      'Deal pipeline management',
      'Relationship nurturing',
    ],
  },
  {
    agentId: 'onboarding-assistant',
    tips: [
      'Provide user experience level context',
      'Include their specific use case',
      'Ask about their main challenges',
    ],
    examplePrompts: [
      'Guide new user through initial setup',
      'Explain our main features to enterprise customer',
      'Help user integrate our API',
    ],
    useCases: [
      'New customer onboarding automation',
      'Product feature walkthroughs',
      'Integration guidance',
    ],
  },
  {
    agentId: 'email-prioritization',
    tips: [
      'Paste entire email threads for context',
      'Include sender information if available',
      'Mention current workload or deadline',
    ],
    examplePrompts: [
      'Prioritize this inbox of 50 emails',
      'Flag urgent customer complaints',
      'Turn this email into an action item',
    ],
    useCases: [
      'Email inbox management',
      'Urgent request detection',
      'Task creation from emails',
    ],
  },
  {
    agentId: 'executive-reporting',
    tips: [
      'Provide relevant metrics and KPIs',
      'Include year-over-year comparisons',
      'Specify report audience (board, investors, etc)',
    ],
    examplePrompts: [
      'Create Q3 executive summary from sales data',
      'Generate board report on company metrics',
      'Summarize quarterly performance',
    ],
    useCases: [
      'Automated executive reporting',
      'Board presentation generation',
      'Stakeholder update automation',
    ],
  },
  {
    agentId: 'meeting-notes',
    tips: [
      'Paste full meeting transcript if available',
      'Include attendees and date',
      'Highlight key discussion topics',
    ],
    examplePrompts: [
      'Create action items from this meeting',
      'Summarize quarterly business review',
      'Extract decisions from team sync',
    ],
    useCases: [
      'Meeting transcription processing',
      'Action item extraction',
      'Decision documentation',
    ],
  },
  {
    agentId: 'custom-agent-builder',
    tips: [
      'Be specific about the agent\'s purpose',
      'Describe the workflow it should handle',
      'Include example interactions',
    ],
    examplePrompts: [
      'Build an agent that processes HR requests',
      'Create a custom chatbot for our internal wiki',
      'Design an agent for contract analysis',
    ],
    useCases: [
      'Custom workflow automation',
      'Domain-specific assistants',
      'Process optimization',
    ],
  },
  {
    agentId: 'bespoke-agent-consultation',
    tips: [
      'Describe your business process in detail',
      'Explain current pain points',
      'Share desired outcomes',
    ],
    examplePrompts: [
      'We need a custom agent for our unique workflow',
      'Let\'s discuss building a specialized agent',
      'I want to schedule a consultation',
    ],
    useCases: [
      'Enterprise-grade custom agents',
      'Strategic automation planning',
      'Complex workflow solutions',
    ],
  },
];

export const getAgentTips = (agentId: string): AgentTip | undefined => {
  return AGENT_TIPS.find((tip) => tip.agentId === agentId);
};
