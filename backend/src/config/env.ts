import 'dotenv/config';
import { z } from 'zod';

const emptyToUndefined = (value: unknown) => (value === '' ? undefined : value);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_NAME: z.preprocess(emptyToUndefined, z.string().optional()),
  DB_USER: z.preprocess(emptyToUndefined, z.string().optional()),
  DB_PASSWORD: z.string().optional().default(''),
  JWT_ACCESS_SECRET: z.preprocess(emptyToUndefined, z.string().optional()),
  JWT_REFRESH_SECRET: z.preprocess(emptyToUndefined, z.string().optional()),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(`Invalid environment configuration: ${z.prettifyError(parsedEnv.error)}`);
}

export const env = parsedEnv.data;

