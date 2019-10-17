import log from 'fancy-log';
import User from '../../models/user';
import Question from '../../models/questions';
import Answer from '../../models/answers';
import { clearDb } from '../../helpers/userHelpers';
import client from '../../helpers/redis';
import userData from '../seeders/userSeeder';

export const flushRedis = async () => {
  await client.flushall((error) => {
    if (error) throw new Error(error);
    log('Data cache has been cleared');
  });
};

export const clearDatabase = async () => {
  try {
    await clearDb(User);
    await clearDb(Question);
    await clearDb(Answer);
    return null;
  } catch (error) {
    return new Error(error);
  }
};

export const seedUsers = async () => {
  await User.insertMany(userData, (error) => {
    if (error) throw new Error(error);
    log('Data has been seeded successfully');
  });
};
