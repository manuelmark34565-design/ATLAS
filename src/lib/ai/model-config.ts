export type ModelProvider = 'groq' | 'openai';

export interface ModelConfig {
  id: string;
  name: string;
  provider: ModelProvider;
  modelId: string;
  description: string;
  costPerMillionInputTokens: number;
  costPerMillionOutputTokens: number;
  maxTokens: number;
  speedRating: number; // 1-5
  qualityRating: number; // 1-5
  isActive: boolean;
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'llama-3.3-70b-versatile',
    name: 'Llama 3.3 70B',
    provider: 'groq',
    modelId: 'llama-3.3-70b-versatile',
    description: 'Fast, high-quality model running on Groq',
    costPerMillionInputTokens: 0,
    costPerMillionOutputTokens: 0,
    maxTokens: 128000,
    speedRating: 5,
    qualityRating: 5,
    isActive: true,
  },
  {
    id: 'llama-3.1-8b-instant',
    name: 'Llama 3.1 8B Instant',
    provider: 'groq',
    modelId: 'llama-3.1-8b-instant',
    description: 'Smaller, very fast model for testing',
    costPerMillionInputTokens: 0,
    costPerMillionOutputTokens: 0,
    maxTokens: 128000,
    speedRating: 5,
    qualityRating: 4,
    isActive: false,
  },
];

export function getModelConfig(modelId: string): ModelConfig | undefined {
  return AVAILABLE_MODELS.find((m) => m.id === modelId);
}

export function getActiveModel(): ModelConfig {
  return AVAILABLE_MODELS.find((m) => m.isActive) || AVAILABLE_MODELS[0];
}

export function calculateCost(
  model: ModelConfig,
  inputTokens: number,
  outputTokens: number
): number {
  const inputCost = (inputTokens / 1000000) * model.costPerMillionInputTokens;
  const outputCost = (outputTokens / 1000000) * model.costPerMillionOutputTokens;
  return inputCost + outputCost;
}
