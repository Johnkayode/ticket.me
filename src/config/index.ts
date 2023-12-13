import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file.");
}

export default {
    port: process.env.PORT || 3000,
    redisURL: process.env.REDIS_URL || 'redis://:@localhost:6379',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'ticketme',
    DB_PORT: parseInt(process.env.DB_PORT) || 5432,
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
};