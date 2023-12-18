import { DataSource } from "typeorm"
import config from './src/config'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    migrations: ['src/modules/**/migrations/*{.ts,.js}'],
})