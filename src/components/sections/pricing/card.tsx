import { CheckIcon } from '@/icons/icons';
import GlowGradient from '@/assets/pricing/glow';
import type { TBILLING_PLAN } from '@/components/sections/pricing/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

type Props = {
  plan: TBILLING_PLAN;
  billingPeriod: keyof TBILLING_PLAN['pricing'];
  highlighted?: boolean;
};

export function PricingCard({ plan, billingPeriod, highlighted = false }: Props) {
  return (
    <div className="relative">
      <div
        className={`bg-white dark:bg-dark-primary rounded-[20px] shadow-one relative z-10 h-full ${
          plan.popular || highlighted ? 'relative border-2 border-primary-500' : ''
        }`}
      >
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-400">
              {plan.name}
            </h2>
            {plan.popular && (
              <span className="px-2 py-1 text-xs font-medium dark:text-pir rounded-full dark:bg-primary-500/15 bg-primary-50 text-primary-500">
                Popular
              </span>
            )}
            {highlighted && !plan.popular && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300">
                Selected
              </span>
            )}
          </div>
          <p className="flex items-baseline mt-4">
            <span className="text-4xl font-semibold text-gray-800 dark:text-white/90">
              {plan.pricing[billingPeriod].formattedPrice}
            </span>

            {!!plan.pricing[billingPeriod].amount && (
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                {billingPeriod === 'yearly' ? 'Per year' : 'Per month'}
              </span>
            )}
          </p>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {plan.description}
          </p>

          {plan.name.includes('Enterprise') ? (
            <ContactSalesLink>{plan.cta}</ContactSalesLink>
          ) : (
            <button
              className={cn(
                'block w-full px-8 py-3.5 mt-7 text-sm font-medium text-center rounded-full transition',
                {
                  'dark:bg-dark-primary dark:text-white/90 dark:hover:bg-gray-800 dark:border-gray-800 text-gray-800 bg-white border border-gray-200 hover:bg-gray-50':
                    plan.name.includes('Free'),
                  'gradient-btn text-white': plan.popular,
                  'dark:hover:bg-primary-500 dark:bg-white/[0.03] hover:bg-gray-900 text-white bg-gray-700':
                    !plan.popular && !plan.name.includes('Free'),
                }
              )}
            >
              {plan.cta}``
            </button>
          )}
        </div>
        <div className="px-8 pb-7">
          <ul className="space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start">
                <div className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                  <CheckIcon />
                </div>

                <p className="ml-2 text-sm text-gray-800 dark:text-white/90">
                  {feature}
                </p>
              </li>
            ))}
          </ul>

          {/* Agent Categories Section */}
          {plan.agentCategories && plan.agentCategories.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-3">
                AGENT ACCESS
              </p>
              <ul className="space-y-2">
                {plan.agentCategories.map((category) => (
                  <li key={category.name} className="flex items-start">
                    <div
                      className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                        category.included
                          ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      {category.included && (
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <p
                      className={`ml-2 text-xs ${
                        category.included
                          ? 'text-gray-700 dark:text-white/80 font-medium'
                          : 'text-gray-500 dark:text-gray-400 line-through'
                      }`}
                    >
                      {category.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {plan.popular && (
        <GlowGradient className="absolute -left-full -translate-x-20 top-0 max-lg:hidden" />
      )}
    </div>
  );
}

function ContactSalesLink({ children }: PropsWithChildren) {
  return (
    <Link
      href="/contact"
      className="block w-full px-8 py-3.5 mt-7 text-sm font-medium text-center rounded-full transition dark:hover:bg-primary-500 dark:bg-white/[0.03] hover:bg-gray-900 text-white bg-gray-700"
    >
      {children}
    </Link>
  );
}
