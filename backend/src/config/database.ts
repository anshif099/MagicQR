import mysql from 'mysql2/promise';
import { env } from './env';

export const databasePool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60_000,
  queueLimit: 0,
  enableKeepAlive: true,
  supportBigNumbers: true,
  bigNumberStrings: true,
  multipleStatements: false,
});

export type DatabaseExecutor = Pick<
  mysql.Pool,
  'execute' | 'query' | 'getConnection'
>;
