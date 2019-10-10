import log from 'fancy-log';
import dbConnection from './dbConnection';
import {
  flushRedis, clearUsers, clearQuestions, clearAnswers, seedUsers,
} from './modelMigrations';

const refreshDatabase = async () => {
  await dbConnection().then(async () => {
    await Promise.all([flushRedis(), clearUsers(), clearQuestions(), clearAnswers(), seedUsers()]);
  });
  log('All done');
  process.exit(0);
};

module.exports = { refreshDatabase };

require('make-runnable');
