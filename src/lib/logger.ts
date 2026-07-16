/**
 * AI Logger Utility
 * Provides logging for AI operations including requests, responses, and errors
 */

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  service: string;
  message: string;
  agent?: string;
  model?: string;
  tokens?: {
    input: number;
    output: number;
    total: number;
  };
  duration?: number;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
}

class AILogger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  private createEntry(
    level: LogEntry['level'],
    service: string,
    message: string,
    metadata?: Partial<LogEntry>
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      service,
      message,
      ...metadata,
    };
  }

  info(service: string, message: string, metadata?: Partial<LogEntry>) {
    const entry = this.createEntry('info', service, message, metadata);
    this.addLog(entry);
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${service}] ${message}`, metadata);
    }
  }

  warn(service: string, message: string, metadata?: Partial<LogEntry>) {
    const entry = this.createEntry('warn', service, message, metadata);
    this.addLog(entry);
    console.warn(`[${service}] ${message}`, metadata);
  }

  error(service: string, message: string, error?: Error, metadata?: Partial<LogEntry>) {
    const entry = this.createEntry('error', service, message, {
      ...metadata,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    });
    this.addLog(entry);
    console.error(`[${service}] ${message}`, error, metadata);
  }

  debug(service: string, message: string, metadata?: Partial<LogEntry>) {
    if (process.env.NODE_ENV !== 'development') return;
    const entry = this.createEntry('debug', service, message, metadata);
    this.addLog(entry);
    console.debug(`[${service}] ${message}`, metadata);
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  getLogs(filter?: { service?: string; level?: string; limit?: number }): LogEntry[] {
    let filtered = [...this.logs];

    if (filter?.service) {
      filtered = filtered.filter((log) => log.service === filter.service);
    }

    if (filter?.level) {
      filtered = filtered.filter((log) => log.level === filter.level);
    }

    if (filter?.limit) {
      filtered = filtered.slice(-filter.limit);
    }

    return filtered;
  }

  clearLogs() {
    this.logs = [];
  }

  getStats() {
    const stats = {
      total: this.logs.length,
      byLevel: {
        info: 0,
        warn: 0,
        error: 0,
        debug: 0,
      },
      byService: {} as Record<string, number>,
      totalTokens: 0,
      totalDuration: 0,
    };

    for (const log of this.logs) {
      stats.byLevel[log.level]++;
      stats.byService[log.service] = (stats.byService[log.service] || 0) + 1;
      if (log.tokens) {
        stats.totalTokens += log.tokens.total;
      }
      if (log.duration) {
        stats.totalDuration += log.duration;
      }
    }

    return stats;
  }
}

export const logger = new AILogger();
