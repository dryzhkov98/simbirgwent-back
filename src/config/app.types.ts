export interface IConfigApp {
  /* App settings */
  NAME: string;
  PORT: number;
  URL: string;
  VERSION: string;

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
}
