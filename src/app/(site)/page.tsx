import HeroSection from '@/components/sections/hero-section';
import { CoreFeatures } from '@/components/sections/core-features';
import { CustomAgentsSection } from '@/components/sections/custom-agents';
import { AgentCategoriesSection } from '@/components/sections/agent-categories';

export default async function Home() {
  return (
    <>
      <HeroSection />
      <CustomAgentsSection />
      <AgentCategoriesSection />
      <CoreFeatures />
    </>
  );
}
