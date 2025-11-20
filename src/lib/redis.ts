import Redis from "ioredis";

// Create Redis client
const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  throw new Error("REDIS_URL is not defined");
};

// Main Redis client
export const redis = new Redis(getRedisUrl(), {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Helper functions for common Redis operations

/**
 * Cache helpers
 */
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttl) {
      await redis.setex(key, ttl, serialized);
    } else {
      await redis.set(key, serialized);
    }
  },

  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },
};

/**
 * Session helpers
 */
export const session = {
  async get(sessionId: string) {
    return cache.get(`session:${sessionId}`);
  },

  async set(sessionId: string, data: unknown, ttl = 3600) {
    await cache.set(`session:${sessionId}`, data, ttl);
  },

  async destroy(sessionId: string) {
    await cache.del(`session:${sessionId}`);
  },
};

/**
 * Rate limiting using sliding window
 */
export const rateLimit = {
  async check(
    identifier: string,
    limit: number,
    window: number
  ): Promise<{ allowed: boolean; remaining: number; reset: number }> {
    const key = `rate_limit:${identifier}`;
    const now = Date.now();
    const windowStart = now - window * 1000;

    // Remove old entries
    await redis.zremrangebyscore(key, 0, windowStart);

    // Count requests in current window
    const count = await redis.zcard(key);

    if (count >= limit) {
      const oldest = await redis.zrange(key, 0, 0, "WITHSCORES");
      const reset = oldest[1] ? parseInt(oldest[1] as string) + window * 1000 : now + window * 1000;

      return {
        allowed: false,
        remaining: 0,
        reset,
      };
    }

    // Add current request
    await redis.zadd(key, now, `${now}`);
    await redis.expire(key, window);

    return {
      allowed: true,
      remaining: limit - count - 1,
      reset: now + window * 1000,
    };
  },

  async reset(identifier: string) {
    await redis.del(`rate_limit:${identifier}`);
  },
};

/**
 * Cart helpers
 */
export const cartCache = {
  async get(cartId: string) {
    return cache.get(`cart:${cartId}`);
  },

  async set(cartId: string, data: unknown, ttl = 86400) {
    // 24 hours default
    await cache.set(`cart:${cartId}`, data, ttl);
  },

  async delete(cartId: string) {
    await cache.del(`cart:${cartId}`);
  },

  async invalidateUser(userId: string) {
    await cache.invalidatePattern(`cart:user:${userId}*`);
  },
};

/**
 * Product cache helpers
 */
export const productCache = {
  async get(productId: string) {
    return cache.get(`product:${productId}`);
  },

  async set(productId: string, data: unknown, ttl = 3600) {
    await cache.set(`product:${productId}`, data, ttl);
  },

  async invalidate(productId: string) {
    await cache.del(`product:${productId}`);
  },

  async invalidateAll() {
    await cache.invalidatePattern("product:*");
  },
};

// Graceful shutdown
if (typeof process !== "undefined") {
  process.on("SIGINT", () => {
    redis.disconnect();
  });

  process.on("SIGTERM", () => {
    redis.disconnect();
  });
}
