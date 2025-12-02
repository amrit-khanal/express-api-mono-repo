import { Cache, Events } from 'cache-manager';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';
import { config } from 'dotenv';
config({ path: '../../.env' });

const redisStore = new Keyv({
  store: new KeyvRedis(
    `redis://${process.env.REDIS_HOST || '127.0.0.1'}:${process.env.REDIS_PORT || 6379}`
  ),
});

export const redisCache: any = {
  get: async (key: string) => {
    return redisStore.get(key);
  },

  set: async <T>(key: string, value: T, ttl?: number): Promise<T> => {
    const ttlMs = ttl ? ttl * 1000 : undefined;
    await redisStore.set(key, value, ttlMs);
    return value;
  },

  del: async (key: string) => {
    const result = await redisStore.delete(key);
    return result ?? false;
  },
  mget: function <T>(keys: string[]): Promise<Array<T | null>> {
    throw new Error('Function not implemented.');
  },
  ttl: function (key: string): Promise<number | null> {
    throw new Error('Function not implemented.');
  },
  mset: function <T>(list: Array<{ key: string; value: T; ttl?: number; }>): Promise<Array<{ key: string; value: T; ttl?: number; }>> {
    throw new Error('Function not implemented.');
  },
  mdel: function (keys: string[]): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  clear: function (): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  on: function <E extends keyof Events>(event: E, listener: Events[E]): import("events") {
    throw new Error('Function not implemented.');
  },
  off: function <E extends keyof Events>(event: E, listener: Events[E]): import("events") {
    throw new Error('Function not implemented.');
  },
  disconnect: function (): Promise<undefined> {
    throw new Error('Function not implemented.');
  },
  cacheId: function (): string {
    throw new Error('Function not implemented.');
  },
  stores: [],
  wrap: function (...args: any[]): Promise<any> {
    throw new Error('Function not implemented.');
  }
};
