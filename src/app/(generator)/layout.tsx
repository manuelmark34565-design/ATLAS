import { Suspense } from 'react';
import GeneratorWrapper from '@/components/generator/generator-wrapper';

export default async function GeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={null}>
      <GeneratorWrapper>{children}</GeneratorWrapper>
    </Suspense>
  );
}
