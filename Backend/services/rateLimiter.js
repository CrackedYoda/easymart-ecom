import redis from "../startup/redisConnect";

const rateLimiter = async (key,limit,time) => {
    const count = await redis.incr(key); // starts at 0, becomes 1 after first iteration
    if(count === 1) { await redis.expire(key,time)}
    return count <= limit;


}

export default rateLimiter;