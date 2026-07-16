'use client';

import GeneratorInput from '@/components/generator/generator-input';
import { RenderMessage } from '@/components/generator/render-message';
import { GradientBlob } from '@/components/gradient-blob';
import { useChat } from '@ai-sdk/react';
import { createIdGenerator } from 'ai';
import { useState, type FormEvent } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<'general' | 'email'>('general');
  const [isThinking, setIsThinking] = useState(false);

  const chatHandler = useChat({
    generateId: createIdGenerator({ prefix: 'msgc' }),
    onFinish: () => setIsThinking(false),
  });

  return (
    <div className="contents">
      <RenderMessage useChat={chatHandler} isThinking={isThinking} />

      <div className="px-5 md:px-12">
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedAgent('general')}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              selectedAgent === 'general'
                ? 'border-[#1D2939] bg-[#1D2939] text-white dark:border-primary-500 dark:bg-primary-500'
                : 'border-[#D0D5DD] bg-white/70 text-[#344054] dark:border-white/10 dark:bg-white/5 dark:text-white/75'
            }`}
          >
            General assistant
          </button>
          <button
            type="button"
            onClick={() => setSelectedAgent('email')}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              selectedAgent === 'email'
                ? 'border-[#1D2939] bg-[#1D2939] text-white dark:border-primary-500 dark:bg-primary-500'
                : 'border-[#D0D5DD] bg-white/70 text-[#344054] dark:border-white/10 dark:bg-white/5 dark:text-white/75'
            }`}
          >
            Email Agent
          </button>
        </div>

        <form
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const trimmed = input.trim();
            if (!trimmed) return;
            setIsThinking(true);
            await chatHandler.sendMessage(
              { text: trimmed },
              {
                body: {
                  agent: selectedAgent,
                },
              },
            );
            setInput('');
          }}
        >
          <GeneratorInput
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder={
              selectedAgent === 'email'
                ? 'Paste an email or describe the inbox task...'
                : 'Type your message'
            }
            helperText={
              selectedAgent === 'email'
                ? 'Email Agent: sort messages, flag urgency, and turn them into action items.'
                : 'General assistant for writing and planning.'
            }
          />
        </form>

        <GradientBlob />
      </div>
    </div>
  );
}
