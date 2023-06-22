import { ApplicationConfig } from '@nestjs/core';
import { IConfigApp } from './app.types';
import { IsNumber, IsString } from 'class-validator';

export class AppConfig extends ApplicationConfig implements IConfigApp {
  /* App settings */

  @IsString()
  public NAME: string;

  @IsNumber()
  public PORT: number;

  @IsString()
  public URL: string;

  @IsString()
  public VERSION: string;

  @IsString()
  public DESCRIPTION: string;

  @IsString()
  public MODE: string;

  @IsString()
  public API_DOCS_PATH: string;

  /* DATABASE settings */

  @IsString()
  public DATABASE: string;

  @IsString()
  public DB_NAME: string;

  @IsString()
  public DB_PASSWORD: string;

  @IsString()
  public DB_USER: string;
}
