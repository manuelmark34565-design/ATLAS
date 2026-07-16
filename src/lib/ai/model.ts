import { createGroq } from '@ai-sdk/groq';

export function getAIModel() {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) {
    throw new Error('Missing GROQ_API_KEY environment variable');
  }

  return createGroq({ apiKey: groqApiKey }).languageModel(
    'llama-3.3-70b-versatile'
  );
}
