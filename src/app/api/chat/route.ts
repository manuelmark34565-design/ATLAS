import { getAIModel } from '@/lib/ai/model';
import { getSystemPrompt } from '@/lib/ai/prompts';
import { getMostRecentUserMessage } from '@/lib/utils';
import { logger } from '@/lib/logger';
import { tokenTracker } from '@/lib/token-tracker';
import { createIdGenerator, streamText, toUIMessageStream, createUIMessageStreamResponse, convertToModelMessages } from 'ai';

export const maxDuration = 50;

function normalizeMessages(rawMessages: unknown[]) {
  return rawMessages.map((message, index) => {
    if (typeof message === 'string') {
      return {
        id: `message-${index}`,
        role: 'user' as const,
        parts: [{ type: 'text' as const, text: message }],
      };
    }

    if (message && typeof message === 'object') {
      const role = typeof (message as any).role === 'string' ? (message as any).role : 'user';
      const parts = Array.isArray((message as any).parts)
        ? (message as any).parts
        : typeof (message as any).content === 'string'
        ? [{ type: 'text' as const, text: (message as any).content }]
        : [];

      return {
        ...message,
        id: (message as any).id ?? `message-${index}`,
        role,
        parts,
      };
    }

    return {
      id: `message-${index}`,
      role: 'user' as const,
      parts: [{ type: 'text' as const, text: String(message) }],
    };
  });
}

export async function POST(req: Request) {
  const startTime = Date.now();
  let userId = 'anonymous';
  let agent = 'general';

  try {
    const requestBody = await req.json();
    const messages = Array.isArray(requestBody?.messages) ? requestBody.messages : undefined;
    agent = requestBody?.agent || 'general';

    // Get user ID from header or use anonymous
    userId = req.headers.get('x-user-id') || 'anonymous';

    if (!messages || messages.length === 0) {
      logger.warn('chat-api', 'Invalid chat request body', { userId, agent, requestBody });
      return new Response(
        JSON.stringify({
          error: 'Invalid request: messages array is required.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    logger.info('chat-api', 'Incoming chat request', {
      agent,
      messageCount: messages.length,
      userId,
    });

    // Check rate limit
    const rateLimitError = tokenTracker.checkRateLimit(userId);
    if (rateLimitError) {
      logger.warn('chat-api', 'Rate limit exceeded', {
        userId,
        agent,
      });
      return new Response(
        JSON.stringify({
          error: rateLimitError,
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const userMessage = getMostRecentUserMessage(messages);

    if (!userMessage) {
      logger.warn('chat-api', 'No user message found', { userId, agent });
      return new Response('No user message found', {
        status: 404,
      });
    }

    const messageContent = typeof userMessage === 'string' ? userMessage : userMessage.content || '';

    logger.debug('chat-api', `User message: ${messageContent.substring(0, 100)}...`, {
      userId,
      agent,
    });

    const normalizedMessages = normalizeMessages(messages);
    const modelMessages = await convertToModelMessages(normalizedMessages, {
      ignoreIncompleteToolCalls: true,
    });

    const model = getAIModel();

    const result = streamText({
      model,
      system: getSystemPrompt(agent),
      messages: modelMessages,
    });

    const stream = toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
      generateMessageId: createIdGenerator({ prefix: 'msgc' }),
      sendStart: true,
      sendFinish: true,
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          return String(error);
        }

        return 'An error occurred while streaming the response.';
      },
      onEnd: async () => {
        const usage = result.usage as { promptTokens?: number; completionTokens?: number } | undefined;
        if (usage) {
          const duration = Date.now() - startTime;

          tokenTracker.trackTokens(userId, usage.promptTokens || 0, usage.completionTokens || 0);

          logger.info('chat-api', 'Chat completed successfully', {
            agent,
            userId,
            tokens: {
              input: usage.promptTokens || 0,
              output: usage.completionTokens || 0,
              total: (usage.promptTokens || 0) + (usage.completionTokens || 0),
            },
            duration,
          });
        }
      },
    });

    logger.info('chat-api', 'Stream started', {
      agent,
      userId,
      model: 'groq/llama-3.3-70b-versatile',
    });

    return createUIMessageStreamResponse({
      status: 200,
      headers: {
        'x-user-id': userId,
      },
      stream,
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    if (error instanceof Error) {
      logger.error('chat-api', 'Chat request failed', error, {
        userId,
        agent,
        duration,
      });
    } else {
      logger.error('chat-api', 'Unknown error occurred', new Error(String(error)), {
        userId,
        agent,
        duration,
      });
    }

    // Return error response
    return new Response(
      JSON.stringify({
        error: 'An error occurred while processing your request. Please try again.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

