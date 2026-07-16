'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  BILLING_PERIODS,
  BILLING_PLANS,
  CREDIT_PACKS,
} from '@/components/sections/pricing/data';
import { cn } from '@/lib/utils';
import { PricingCard } from '@/components/sections/pricing/card';

type BillingPeriodKey = (typeof BILLING_PERIODS)[number]['key'];

export default function PricingSection() {
  const [activeBillingPeriodKey, setActiveBillingPeriodKey] =
    useState<BillingPeriodKey>('monthly');
  const searchParams = useSearchParams();
  const highlightedPlan = searchParams.get('plan')?.toLowerCase();
  const selectedCategory = searchParams.get('category');

  const categoryLabel =
    selectedCategory === 'internal-operations'
      ? 'Internal Operations'
      : selectedCategory === 'sales-growth'
        ? 'Sales & Growth'
        : selectedCategory === 'build-ai-agent'
          ? 'Build Your AI Agent'
          : selectedCategory === 'custom-solutions'
            ? 'Custom Solutions'
            : null;

  return (
    <section className="py-14 md:py-30 bg-gray-50 dark:bg-[#171f2e] dark:bg-linear-180 dark:from-white/3 dark:from-[45.56%] dark:to-white/0">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Choose the billing model that fits your workflow
          </h2>
          <p className="max-w-xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Pick a recurring subscription for predictable access or buy AI credits when you need flexible top-ups.
          </p>
          {categoryLabel && (
            <div className="mt-4 inline-flex rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-300">
              Selected category: {categoryLabel}
            </div>
          )}
        </div>

        <div>
          {/* Billing Toggle */}
          <div className="flex justify-center relative z-30 mt-12">
            <div className="relative flex p-1 bg-white dark:bg-[#1D2939] rounded-full shadow-theme-xs">
              {BILLING_PERIODS.map((period) => (
                <button
                  key={period.key}
                  onClick={() => setActiveBillingPeriodKey(period.key)}
                  className={cn(
                    'relative flex items-center gap-2 px-6 py-2 text-sm font-medium transition-colors duration-200' +
                      ' rounded-full' +
                      ' text-gray-700 dark:text-gray-400',
                    {
                      'bg-gray-800 dark:bg-white/[0.05] text-white dark:text-white':
                        period.key === activeBillingPeriodKey,
                      'pr-2': period.saving,
                    }
                  )}
                >
                  {period.label}

                  {period.saving && (
                    <span className="bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full">
                      Save {period.saving}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 z-30 relative">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                Subscription plans
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Best for teams that want ongoing access and predictable monthly billing.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-6xl lg:mx-auto lg:grid-cols-3">
              {BILLING_PLANS.map((plan, index) => (
                <PricingCard
                  key={index}
                  plan={plan}
                  billingPeriod={activeBillingPeriodKey}
                  highlighted={
                    highlightedPlan === 'pro' && plan.name.toLowerCase().includes('pro') ||
                    highlightedPlan === 'business' && plan.name.toLowerCase().includes('business')
                  }
                />
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                Pay-as-you-go AI credits
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Buy credits when you need extra capacity without committing to a plan.
              </p>
            </div>
            <div className="mt-8 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
              {CREDIT_PACKS.map((plan, index) => (
                <PricingCard
                  key={index}
                  plan={plan}
                  billingPeriod="monthly"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
