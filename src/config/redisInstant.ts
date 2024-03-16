import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redis = createClient({
    url: process.env.REDIS_HOST,
    database: Number(process.env.REDIS_DATABASE)
});
redis.on('error', (err) => console.log('Redis Client Error', err));
redis.connect();