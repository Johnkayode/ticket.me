import { Application } from 'express';
import expressLoader from './express';
import { AppDataSource } from '../database/ormconfig';
import { loadDataSource } from './typeorm';
import { connectRedisClient } from './redis';
import logger from '../common/logger';

export default async ({ expressApp }: { expressApp: Application }) => {
  await expressLoader({ app: expressApp });
  logger.info('🚀 Express loaded.');

  await loadDataSource(AppDataSource);
  logger.info('🚀 Database connected.');

  await connectRedisClient();
  logger.info('🚀 Redis Client connected.');
};
