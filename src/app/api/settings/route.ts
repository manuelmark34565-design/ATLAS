import { AVAILABLE_MODELS, getActiveModel } from '@/lib/ai/model-config';
import { logger } from '@/lib/logger';
import { tokenTracker } from '@/lib/token-tracker';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint');

    logger.debug('settings-api', `Settings request: ${endpoint}`);

    if (endpoint === 'models') {
      return new Response(
        JSON.stringify({
          models: AVAILABLE_MODELS,
          activeModel: getActiveModel(),
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (endpoint === 'usage') {
      const userId = req.headers.get('x-user-id') || 'anonymous';
      const stats = tokenTracker.getUserStats(userId);

      return new Response(
        JSON.stringify({
          userId,
          stats,
          globalStats: tokenTracker.getAllStats(),
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (endpoint === 'logs') {
      const service = url.searchParams.get('service');
      const level = url.searchParams.get('level');
      const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : 100;

      const logs = logger.getLogs({ service: service || undefined, level: level || undefined, limit });

      return new Response(
        JSON.stringify({
          logs,
          stats: logger.getLogs().length,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Unknown endpoint' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    logger.error('settings-api', 'Settings API error', error as Error);

    return new Response(
      JSON.stringify({
        error: 'An error occurred',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { action, modelId } = await req.json();

    if (action === 'switch-model') {
      // This is a demonstration - in production, you'd persist this to a database
      logger.info('settings-api', 'Model switch requested', {
        modelId,
        userId: req.headers.get('x-user-id') || 'anonymous',
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Model configuration updated',
          activeModel: modelId,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Unknown action' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    logger.error('settings-api', 'Settings POST error', error as Error);

    return new Response(
      JSON.stringify({
        error: 'An error occurred',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
