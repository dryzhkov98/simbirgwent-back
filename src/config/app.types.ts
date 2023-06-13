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
}
