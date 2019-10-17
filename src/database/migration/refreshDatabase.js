import log from 'fancy-log';
import dbConnection from './dbConnection';
import {
  flushRedis, clearDatabase, seedUsers,
} from './modelMigrations';

const refreshDatabase = async () => {
  await dbConnection().then(async () => {
    await Promise.all([flushRedis(), clearDatabase(), seedUsers()]);
  });
  log('All done');
  process.exit(0);
};

module.exports = { refreshDatabase };

require('make-runnable');
