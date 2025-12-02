import { DataSource } from 'typeorm';
import { typeOrmConfigs } from '../../config/database.config';

export const AppDataSource = new DataSource(typeOrmConfigs);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
