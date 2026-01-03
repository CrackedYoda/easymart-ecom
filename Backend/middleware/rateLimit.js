import rateLimiter from "../services/rateLimiter.js";

export const ratelimit = (req, res, next) => {

    const key = `ratelimit:${req.ip}`;
    const limit = 10;
    const time = 60;
    if(!rateLimiter(key,limit,time)){
        return res.status(429).send('Too many requests');
    }
    next();


}