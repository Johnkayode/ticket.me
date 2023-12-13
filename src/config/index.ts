import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file.");
}

export default {
    port: process.env.PORT || 3000,
    databaseURL: process.env.MONGODB_URI,
    redisURL: process.env.REDIS_URL || 'redis://:@localhost:6379',
};