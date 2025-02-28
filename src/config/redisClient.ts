import {
  createClient,
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from "redis";
type RedisClient = RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
let redisClient: RedisClient;

const initializeRedisClient = async (): Promise<RedisClient> => {
  redisClient = createClient() as RedisClient; // Explicitly cast to RedisClient
  redisClient.on("error", (err) => console.error("Redis Client Error", err));
  await redisClient.connect();
  return redisClient;
};

// Export a singleton Redis client
const getRedisClient = async (): Promise<RedisClient> => {
  if (!redisClient) {
    redisClient = await initializeRedisClient();
  }
  return redisClient;
};

export default getRedisClient;
