'use client';

import GeneratorInput from '@/components/generator/generator-input';
import { RenderMessage } from '@/components/generator/render-message';
import { GradientBlob } from '@/components/gradient-blob';
import { getAgentById } from '@/lib/agents';
import { ChatFooter } from '@/components/generator/chat-footer';
import { useChat } from '@ai-sdk/react';
import { createIdGenerator } from 'ai';
import { useState, type FormEvent } from 'react';
import { useAgent } from '@/context/agent-context';

export default function Page() {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const { selectedAgentId } = useAgent();
  const selectedAgent = getAgentById(selectedAgentId);

  const chatHandler = useChat({
    generateId: createIdGenerator({ prefix: 'msgc' }),
    onFinish: () => setIsThinking(false),
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="hidden md:flex bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-800 px-5 md:px-12 py-2 items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          ✨ <span className="font-medium">Agent: {selectedAgent?.name}</span>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 overflow-hidden items-center">
        <div className="w-full max-w-4xl">
          <RenderMessage useChat={chatHandler} isThinking={isThinking} />
        </div>

        <div className="w-full max-w-4xl px-5 md:px-0">
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
                    agent: selectedAgentId,
                  },
                },
              );
              setInput('');
            }}
          >
            <GeneratorInput
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder={selectedAgent?.placeholder || 'Type your message...'}
              helperText={selectedAgent?.helperText || 'Select an agent to get started.'}
            />
          </form>

          <GradientBlob />
        </div>

        <div className="w-full max-w-4xl">
          <ChatFooter />
        </div>
      </div>

    </div>
  );
}
