import { createClient } from "redis";

const redis = createClient({
    url: "redis://localhost:6379",
})


redis.on("connect", () => console.log("Redis client connected"))
redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect();

export default redis;