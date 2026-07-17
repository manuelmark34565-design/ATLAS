import { Suspense } from 'react';
import GeneratorWrapper from '@/components/generator/generator-wrapper';
import TextGeneratorPage from '../(generator)/text-generator/page';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GeneratorWrapper>
        <TextGeneratorPage />
      </GeneratorWrapper>
    </Suspense>
  );
}
