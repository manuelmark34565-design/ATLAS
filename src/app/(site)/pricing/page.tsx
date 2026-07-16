import type { Metadata } from 'next';
import { Suspense } from 'react';
import PricingSection from '@/components/sections/pricing';

export const metadata: Metadata = {
  title: 'Pricing',
};

export default async function PricingPage() {
  return (
    <Suspense fallback={null}>
      <PricingSection />
    </Suspense>
  );
}
