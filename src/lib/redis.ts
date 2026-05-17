import { Redis } from '@upstash/redis'

// We check if the environment variables are available so we don't crash the build or dev 
// server if they haven't been set up yet. If they are missing, we mock the redis client.

const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

export const redis = (url && token) 
  ? new Redis({
      url,
      token,
    })
  : {
      zincrby: async () => 1,
      zscore: async () => 0,
      zrange: async () => [],
      // Mock any other methods you might use
    } as unknown as Redis;
