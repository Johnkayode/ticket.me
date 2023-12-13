import { DataSource } from "typeorm"
import config from '../config';
import { logger } from '../common';

const AppDataSource = new DataSource({
    type: "postgres",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
})


async function loadDataSource(appDataSource: DataSource) {
    try {
        await appDataSource.initialize()
    } catch(error) {
        logger.error('An error occured while attempting to connect redis client.');
        logger.error(error);
        process.exit(1);
    }
}


export { 
    AppDataSource,
    loadDataSource,
}