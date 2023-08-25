import { DataSource } from 'typeorm';
import 'dotenv/config';

export const db = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/entities/*{.js,.ts}'],
  logging: true,
  synchronize: true
});
