import redis from "../startup/redisConnect.js";



export const setCachedData = async (key, value, ttl) => {
     await redis.set(key, JSON.stringify(value), { EX: ttl });
}
export const getCachedData = async (key) => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
}
export const deleteCachedData = async (key) => {
    await redis.del(key);
}

export const getOrSetCachedData = async (key, findFn, ttl ) => {
    const cachedData = getCachedData(key);
    if (cachedData) {
        return cachedData;
    }
    const data = await findFn;
    if(!data) {
        return null;
    }

    await setCachedData(key, data, ttl);
    return data;

}