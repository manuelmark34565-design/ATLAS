export const BILLING_PERIODS = [
  {
    label: 'Monthly',
    key: 'monthly',
    saving: null,
  },
  {
    label: 'Annually',
    key: 'yearly',
    saving: '20%',
  },
] as const;

const AMOUNTS = {
  free: {
    monthly: 0,
    yearly: 0,
  },
  plus: {
    monthly: 15,
    yearly: 144,
  },
  pro: {
    monthly: 40,
    yearly: 384,
  },
  enterprise: {
    monthly: null,
    yearly: null,
  },
};

export type TBILLING_PLAN = (typeof BILLING_PLANS)[number];
export const BILLING_PLANS = [
  {
    name: 'Free',
    description:
      'For teams exploring AI agents—try essential agents and basic features.',
    pricing: {
      monthly: {
        amount: AMOUNTS['free']['monthly'],
        formattedPrice: '$' + AMOUNTS['free']['monthly'],
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS['free']['yearly'],
        formattedPrice: '$' + AMOUNTS['free']['yearly'],
        stripeId: null,
      },
    },
    features: [
      'Email Prioritization Agent',
      'Customer Support Agent',
      'Basic lead qualification',
      'Up to 10 agent interactions / month',
      'Community support',
      'Sample agent access',
    ],
    agentCategories: [
      { name: 'Email Prioritization Agent', included: true },
      { name: 'Customer Support Agent', included: true },
      { name: 'Full Customer-facing agents', included: false },
      { name: 'Internal Operations agents', included: false },
      { name: 'Sales & Growth agents', included: false },
      { name: 'Build Your AI Agent', included: false },
      { name: 'Custom Solutions', included: false },
    ],
    cta: 'Try it for free',
    popular: false,
  },
  {
    name: 'Plus plan',
    description:
      'For growing teams—access all pre-built agents and unlimited interactions.',
    pricing: {
      monthly: {
        amount: AMOUNTS['plus']['monthly'],
        formattedPrice: '$' + AMOUNTS['plus']['monthly'],
        stripeId: process.env.NEXT_PUBLIC_PLUS_MONTHLY_PRICE_ID!,
      },
      yearly: {
        amount: AMOUNTS['plus']['yearly'],
        formattedPrice: '$' + AMOUNTS['plus']['yearly'],
        stripeId: process.env.NEXT_PUBLIC_PLUS_YEARLY_PRICE_ID!,
      },
    },
    features: [
      'All pre-built agents access',
      'Unlimited agent interactions',
      'Team collaboration (up to 5 members)',
      'Usage analytics & reports',
      'Email support',
      'API access',
    ],
    agentCategories: [
      { name: 'Customer-facing agents', included: true },
      { name: 'Internal Operations agents', included: true },
      { name: 'Sales & Growth agents', included: true },
      { name: 'Build Your AI Agent', included: false },
      { name: 'Custom Solutions', included: false },
    ],
    cta: 'Subscribe Now',
    popular: true,
  },
  {
    name: 'Pro plan',
    description:
      'For power users—build custom agents and unlock advanced capabilities.',
    pricing: {
      monthly: {
        amount: AMOUNTS['pro']['monthly'],
        formattedPrice: '$' + AMOUNTS['pro']['monthly'],
        stripeId: process.env.NEXT_PUBLIC_PRO_MONTHLY_PRICE_ID!,
      },
      yearly: {
        amount: AMOUNTS['pro']['yearly'],
        formattedPrice: '$' + AMOUNTS['pro']['yearly'],
        stripeId: process.env.NEXT_PUBLIC_PRO_YEARLY_PRICE_ID!,
      },
    },
    features: [
      'Everything in Plus',
      'Build Your AI Agent capability',
      'Custom agent templates',
      'Advanced customization options',
      'Team collaboration (unlimited members)',
      'Priority support',
      'Advanced analytics & insights',
    ],
    agentCategories: [
      { name: 'Customer-facing agents', included: true },
      { name: 'Internal Operations agents', included: true },
      { name: 'Sales & Growth agents', included: true },
      { name: 'Build Your AI Agent', included: true },
      { name: 'Custom Solutions', included: false },
    ],
    cta: 'Subscribe Now',
    popular: false,
  },
  {
    name: 'Enterprise',
    description:
      'For enterprises—dedicated support, custom agents, and unlimited scale.',
    pricing: {
      monthly: {
        amount: AMOUNTS['enterprise']['monthly'],
        formattedPrice: "Let's talk",
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS['enterprise']['yearly'],
        formattedPrice: "Let's talk",
        stripeId: null,
      },
    },
    features: [
      'Everything in Pro',
      'Bespoke Agent Consultation',
      'Unlimited custom agents',
      'Dedicated account manager',
      'SLA-backed 24/7 support',
      'Advanced security & compliance',
      'SSO & audit logging',
    ],
    agentCategories: [
      { name: 'Customer-facing agents', included: true },
      { name: 'Internal Operations agents', included: true },
      { name: 'Sales & Growth agents', included: true },
      { name: 'Build Your AI Agent', included: true },
      { name: 'Custom Solutions', included: true },
    ],
    cta: 'Contact sales',
    popular: false,
  },
];
