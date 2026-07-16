import type { UIMessage } from 'ai';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export function getMostRecentUserMessage(messages: Array<UIMessage>) {
  const userMessages = messages.filter((message) => message.role === 'user');
  const lastUserMessage = userMessages.at(-1);

  if (!lastUserMessage) return undefined;

  if (typeof lastUserMessage === 'string') return undefined;

  const parts = Array.isArray((lastUserMessage as UIMessage & { parts?: Array<{ type?: string; text?: string }> }).parts)
    ? (lastUserMessage as UIMessage & { parts?: Array<{ type?: string; text?: string }> }).parts ?? []
    : [];

  const textPart = parts.find((part) => typeof part === 'object' && part !== null && 'type' in part && 'text' in part && part.type === 'text' && typeof part.text === 'string');
  const textContent = textPart && typeof textPart === 'object' && 'text' in textPart && typeof textPart.text === 'string' ? textPart.text : '';

  return {
    ...lastUserMessage,
    content: textContent,
  } as UIMessage & { content?: string };
}

export function errorHandler(error: unknown) {
  if (error == null) {
    return 'unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
