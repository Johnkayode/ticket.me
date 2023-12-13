import express, {Application} from 'express';
import expressLoader from './express';
import { connectRedisClient } from './redis';
import logger from '../common/logger';

export default async ({ expressApp }: { expressApp: Application}) => {
    await expressLoader({ app: expressApp });
    logger.info('🚀 Express loaded.');
  
    await connectRedisClient();
    logger.info('🚀 Redis Client connected.');
  };



