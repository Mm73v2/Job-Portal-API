import getRedisClient from "../config/redisClient";

const redisUtils = {
  set: async (
    key: string,
    value: string,
    expireInSeconds?: number
  ): Promise<void> => {
    const client = await getRedisClient();
    await client.set(key, value);
    if (expireInSeconds) {
      await client.expire(key, expireInSeconds);
    }
  },

  get: async (key: string): Promise<string | null> => {
    const client = await getRedisClient();
    return await client.get(key);
  },

  delete: async (key: string): Promise<void> => {
    const client = await getRedisClient();
    await client.del(key);
  },

  exists: async (key: string): Promise<boolean> => {
    const client = await getRedisClient();
    const result = await client.exists(key);
    return result === 1;
  },
};

export default redisUtils;
