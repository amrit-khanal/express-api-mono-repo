import { config as dotenvConfig } from "dotenv";
import { DataSourceOptions } from "typeorm";

import { OrderEntity } from "../frameworks/database/entities/order.entity";

dotenvConfig({ path: "./apps/order-service/.order-service.local.env" });

export const typeOrmConfigs: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: [OrderEntity],

  migrations: [__dirname + "/../frameworks/database/migrations/*{.ts,.js}"],

  synchronize: false,
  logging: false,
  poolSize: 10,
  extra: {
    connectionLimit: 10,
  },
};
