import log from 'fancy-log';
import User from '../../models/user';
import Question from '../../models/questions';
import Answer from '../../models/answers';
import client from '../../helpers/redis';
import dbConnection from './dbConnection';
import userData from '../seeders/userSeeder';

const refreshDatabase = async () => {
  await dbConnection().then(async () => {
    await Promise.all([
      client.flushall((error) => {
        if (error) throw new Error(error);
        log('Data cache has been cleared');
      }),
      User.deleteMany({}, (error) => {
        if (error) throw new Error(error);
        log('User data has been deleted');
      }),
      Question.deleteMany({}, (error) => {
        if (error) throw new Error(error);
        log('Question data has been deleted');
      }),
      Answer.deleteMany({}, (error) => {
        if (error) throw new Error(error);
        log('Answer data has been deleted');
      }),
      User.insertMany(userData, (error) => {
        if (error) throw new Error(error);
        log('Data has been seeded successfully');
      }),
    ]);
  });
  log('All done');
  process.exit(0);
};

module.exports = { refreshDatabase };

require('make-runnable');
