export interface IConfigApp {
  /* App settings */
  NAME: string;
  PORT: number;
  URL: string;
  VERSION: string;
  DESCRIPTION: string;
  MODE: string;
  API_DOCS_PATH: string;
  SENSITIVE_KEYS: string;

  /* DATABASE settings */
  DATABASE: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_USER: string;
  DB_DRIVER: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_SCHEMA: string;

  /* Prisma DB URL */
  DATABASE_URL: string;

  /* Tokens */
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_TTL: string;
  REFRESH_TOKEN_TTL: string;
  SALT_SIZE: number;
}
