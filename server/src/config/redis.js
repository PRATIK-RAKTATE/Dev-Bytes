import { createClient } from 'redis';
import { logger } from '../utils/logger.js';
import { env } from '../config/constants.js';

class RedisClient {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.retryAttempts = 0;
    this.maxRetries = 5;
    this.retryDelay = 3000;
  }

  async initialize() {
    try {
      this.client = createClient({
        url: env.REDIS_URL,
        socket: {
          tls: env.NODE_ENV === 'production',
          reconnectStrategy: (attempts) => {
            if (attempts > this.maxRetries) {
              logger.error('Redis connection retries exhausted');
              return new Error('Max retries reached');
            }
            this.retryAttempts = attempts;
            return Math.min(attempts * 100, this.retryDelay);
          },
          connectTimeout: 10000,
          keepAlive: 30000
        },
        pingInterval: 25000
      });

      this.registerEvents();
      await this.client.connect();
      await this.testConnection();
      this.isConnected = true;
    } catch (error) {
      logger.error('Redis initial connection failed:', error);
      throw error;
    }
  }

  registerEvents() {
    this.client.on('connect', () => {
      logger.info('Redis connecting...');
    });

    this.client.on('ready', () => {
      logger.info('Redis connected successfully');
      this.retryAttempts = 0;
      this.isConnected = true;
    });

    this.client.on('end', () => {
      logger.warn('Redis connection closed');
      this.isConnected = false;
    });

    this.client.on('reconnecting', () => {
      logger.warn(`Redis reconnecting (attempt ${this.retryAttempts + 1})`);
    });

    this.client.on('error', (error) => {
      logger.error('Redis error:', error);
      this.isConnected = false;
    });
  }

  async testConnection() {
    try {
      await this.client.ping();
      logger.info('Redis ping successful');
    } catch (error) {
      logger.error('Redis ping failed:', error);
      throw error;
    }
  }

  async quit() {
    try {
      if (this.client && this.isConnected) {
        await this.client.quit();
        logger.info('Redis connection closed gracefully');
      }
    } catch (error) {
      logger.error('Error closing Redis connection:', error);
    } finally {
      this.isConnected = false;
    }
  }

  async healthCheck() {
    return {
      status: this.isConnected ? 'connected' : 'disconnected',
      version: await this.getRedisVersion(),
      memory: await this.getMemoryStats(),
      latency: await this.calculateLatency()
    };
  }

  async getRedisVersion() {
    try {
      const info = await this.client.info('server');
      const versionLine = info.split('\n').find(line => line.startsWith('redis_version'));
      return versionLine ? versionLine.split(':')[1] : 'unknown';
    } catch (error) {
      logger.error('Error getting Redis version:', error);
      return 'unknown';
    }
  }

  async getMemoryStats() {
    try {
      return await this.client.info('memory');
    } catch (error) {
      logger.error('Error getting Redis memory stats:', error);
      return null;
    }
  }

  async calculateLatency() {
    const start = Date.now();
    await this.client.ping();
    return Date.now() - start;
  }

  // Proxy redis methods
  async get(key) {
    return this.client.get(key);
  }

  async set(key, value, options = {}) {
    return this.client.set(key, value, options);
  }

  async del(key) {
    return this.client.del(key);
  }

  async expire(key, seconds) {
    return this.client.expire(key, seconds);
  }

  async keys(pattern) {
    return this.client.keys(pattern);
  }
}

// Singleton instance
const redisClient = new RedisClient();

// Graceful shutdown
const shutdownHandler = async () => {
  logger.info('Shutting down Redis client...');
  await redisClient.quit();
  process.exit(0);
};

process.on('SIGINT', shutdownHandler);
process.on('SIGTERM', shutdownHandler);
process.on('beforeExit', shutdownHandler);

// Initialize connection immediately
(async () => {
  try {
    await redisClient.initialize();
  } catch (error) {
    logger.error('Failed to initialize Redis:', error);
    process.exit(1);
  }
})();

export default redisClient;