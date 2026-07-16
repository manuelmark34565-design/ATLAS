/**
 * Rate Limiter & Token Tracker
 * Manages API rate limiting and tracks token usage
 */

export interface UserTokenUsage {
  userId: string;
  date: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  requestCount: number;
}

export interface RateLimitConfig {
  maxRequests: number; // per minute
  maxTokensPerDay: number;
  maxTokensPerMonth: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 60, // 60 requests per minute
  maxTokensPerDay: 100000,
  maxTokensPerMonth: 1000000,
};

class TokenTracker {
  private usage: Map<string, UserTokenUsage[]> = new Map();
  private requestCounts: Map<string, { count: number; resetTime: number }> = new Map();

  trackTokens(userId: string, inputTokens: number, outputTokens: number) {
    const today = new Date().toISOString().split('T')[0];
    const key = userId;

    if (!this.usage.has(key)) {
      this.usage.set(key, []);
    }

    const userUsage = this.usage.get(key)!;
    const todayUsage = userUsage.find((u) => u.date === today);

    const totalTokens = inputTokens + outputTokens;

    if (todayUsage) {
      todayUsage.inputTokens += inputTokens;
      todayUsage.outputTokens += outputTokens;
      todayUsage.totalTokens += totalTokens;
      todayUsage.requestCount += 1;
    } else {
      userUsage.push({
        userId,
        date: today,
        inputTokens,
        outputTokens,
        totalTokens,
        requestCount: 1,
      });
    }

    // Keep only last 30 days
    if (userUsage.length > 30) {
      userUsage.shift();
    }
  }

  checkRateLimit(userId: string, config: RateLimitConfig = DEFAULT_CONFIG): string | null {
    const now = Date.now();
    const key = userId;

    if (!this.requestCounts.has(key)) {
      this.requestCounts.set(key, { count: 0, resetTime: now + 60000 });
    }

    const counter = this.requestCounts.get(key)!;

    // Reset counter if time has passed
    if (now > counter.resetTime) {
      counter.count = 0;
      counter.resetTime = now + 60000;
    }

    counter.count++;

    if (counter.count > config.maxRequests) {
      return `Rate limit exceeded. Max ${config.maxRequests} requests per minute.`;
    }

    return null;
  }

  checkTokenLimit(
    userId: string,
    newTokens: number,
    config: RateLimitConfig = DEFAULT_CONFIG
  ): string | null {
    const today = new Date().toISOString().split('T')[0];
    const userUsage = this.usage.get(userId) || [];
    const todayUsage = userUsage.find((u) => u.date === today);

    const currentDailyTokens = todayUsage?.totalTokens || 0;

    if (currentDailyTokens + newTokens > config.maxTokensPerDay) {
      return `Daily token limit exceeded. Used: ${currentDailyTokens}, Max: ${config.maxTokensPerDay}`;
    }

    // Check monthly limit
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const monthlyTotal = userUsage
      .filter((u) => new Date(u.date) >= monthAgo)
      .reduce((sum, u) => sum + u.totalTokens, 0);

    if (monthlyTotal + newTokens > config.maxTokensPerMonth) {
      return `Monthly token limit exceeded. Used: ${monthlyTotal}, Max: ${config.maxTokensPerMonth}`;
    }

    return null;
  }

  getUserUsage(userId: string): UserTokenUsage[] {
    return this.usage.get(userId) || [];
  }

  getUserStats(userId: string) {
    const usage = this.usage.get(userId) || [];
    const today = new Date().toISOString().split('T')[0];
    const todayUsage = usage.find((u) => u.date === today);

    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    const monthlyStats = usage.filter((u) => new Date(u.date) >= monthAgo);

    return {
      today: todayUsage || { inputTokens: 0, outputTokens: 0, totalTokens: 0, requestCount: 0 },
      monthly: {
        inputTokens: monthlyStats.reduce((sum, u) => sum + u.inputTokens, 0),
        outputTokens: monthlyStats.reduce((sum, u) => sum + u.outputTokens, 0),
        totalTokens: monthlyStats.reduce((sum, u) => sum + u.totalTokens, 0),
        requestCount: monthlyStats.reduce((sum, u) => sum + u.requestCount, 0),
      },
      history: usage.slice(-7), // Last 7 days
    };
  }

  getAllStats() {
    const stats = {
      totalUsers: this.usage.size,
      totalTokensUsed: 0,
      totalRequests: 0,
    };

    for (const userUsage of this.usage.values()) {
      for (const usage of userUsage) {
        stats.totalTokensUsed += usage.totalTokens;
        stats.totalRequests += usage.requestCount;
      }
    }

    return stats;
  }
}

export const tokenTracker = new TokenTracker();
