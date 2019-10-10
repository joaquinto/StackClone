import log from 'fancy-log';
import User from '../../models/user';
import Question from '../../models/questions';
import Answer from '../../models/answers';
import client from '../../helpers/redis';
import userData from '../seeders/userSeeder';

export const flushRedis = async () => {
  await client.flushall((error) => {
    if (error) throw new Error(error);
    log('Data cache has been cleared');
  });
};

export const clearUsers = async () => {
  await User.deleteMany({}, (error) => {
    if (error) throw new Error(error);
    log('User data has been deleted');
  });
};

export const clearQuestions = async () => {
  await Question.deleteMany({}, (error) => {
    if (error) throw new Error(error);
    log('Question data has been deleted');
  });
};

export const clearAnswers = async () => {
  await Answer.deleteMany({}, (error) => {
    if (error) throw new Error(error);
    log('Answer data has been deleted');
  });
};

export const seedUsers = async () => {
  await User.insertMany(userData, (error) => {
    if (error) throw new Error(error);
    log('Data has been seeded successfully');
  });
};
