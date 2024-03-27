import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ['../**/*.entity{.ts,.js}'],
  migrations: ['./migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  cli: {
    migrationsDir: ['./migrations'],
  },
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
