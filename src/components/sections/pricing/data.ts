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
  pro: {
    monthly: 32000,
    yearly: 32000,
  },
  business: {
    monthly: 160000,
    yearly: 160000,
  },
};

export type TBILLING_PLAN = (typeof BILLING_PLANS)[number] & {
  priceLabel?: string;
};

export const SUBSCRIPTION_PLANS = [
  {
    name: 'Free',
    description:
      'Perfect for exploring ATLAS with a few essential agents and no commitment.',
    pricing: {
      monthly: {
        amount: AMOUNTS['free']['monthly'],
        formattedPrice: '₦0',
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS['free']['yearly'],
        formattedPrice: '₦0',
        stripeId: null,
      },
    },
    features: [
      'Access to core agents',
      'Basic chat history',
      'Community support',
      'Up to 10 agent interactions / month',
    ],
    agentCategories: [
      { name: 'Email Prioritization Agent', included: true },
      { name: 'Customer Support Agent', included: true },
      { name: 'Sales & Growth agents', included: false },
      { name: 'Build Your AI Agent', included: false },
      { name: 'Custom Solutions', included: false },
    ],
    cta: 'Start free',
    popular: false,
  },
  {
    name: 'Pro',
    description:
      'For growing teams that need ongoing access to all ATLAS capabilities.',
    pricing: {
      monthly: {
        amount: AMOUNTS['pro']['monthly'],
        formattedPrice: '₦32,000',
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS['pro']['yearly'],
        formattedPrice: '₦32,000',
        stripeId: null,
      },
    },
    features: [
      'Unlimited agent interactions',
      'Priority support',
      'Team collaboration tools',
      'Advanced analytics',
      'All pre-built agents',
    ],
    agentCategories: [
      { name: 'Customer-facing agents', included: true },
      { name: 'Internal Operations agents', included: true },
      { name: 'Sales & Growth agents', included: true },
      { name: 'Build Your AI Agent', included: false },
      { name: 'Custom Solutions', included: false },
    ],
    cta: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Business',
    description:
      'For organizations that need custom workflows, deeper controls, and premium support.',
    pricing: {
      monthly: {
        amount: AMOUNTS['business']['monthly'],
        formattedPrice: '₦160,000',
        stripeId: null,
      },
      yearly: {
        amount: AMOUNTS['business']['yearly'],
        formattedPrice: '₦160,000',
        stripeId: null,
      },
    },
    features: [
      'Everything in Pro',
      'Dedicated onboarding',
      'Advanced security controls',
      'SSO and audit logging',
      'Priority account support',
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

export const CREDIT_PACKS = [
  {
    name: '100 Credits',
    description:
      'Top up for occasional use without committing to a monthly subscription.',
    pricing: {
      monthly: {
        amount: 8000,
        formattedPrice: '₦8,000',
        stripeId: null,
      },
      yearly: {
        amount: 8000,
        formattedPrice: '₦8,000',
        stripeId: null,
      },
    },
    features: [
      'Best for light usage',
      'Works across all AI generators',
      'No subscription commitment',
      'Instant activation',
    ],
    agentCategories: [],
    cta: 'Buy 100 credits',
    popular: false,
    priceLabel: 'One-time purchase',
  },
  {
    name: '500 Credits',
    description:
      'A larger credit pack for teams that need more flexibility and faster throughput.',
    pricing: {
      monthly: {
        amount: 32000,
        formattedPrice: '₦32,000',
        stripeId: null,
      },
      yearly: {
        amount: 32000,
        formattedPrice: '₦32,000',
        stripeId: null,
      },
    },
    features: [
      'Best for frequent usage',
      'Priority credit consumption',
      'No monthly lock-in',
      'Great for launch periods',
    ],
    agentCategories: [],
    cta: 'Buy 500 credits',
    popular: false,
    priceLabel: 'One-time purchase',
  },
];

export const BILLING_PLANS = SUBSCRIPTION_PLANS;
