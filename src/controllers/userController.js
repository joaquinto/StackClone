import { findAllUsers, queryAllUsers, subscribeToQuestions } from '../services/userServices';
import client from '../helpers/redis';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import { pushObjectToRedis, returnData } from '../helpers/objectHelper';

export const findUsers = async (req, res) => {
  client.lrange('users', 0, -1, async (error, users) => {
    if (error || users.length < 1) {
      const refreshedUsers = await findAllUsers();
      const dataValues = ['password', '__v', 'subscription', 'questions', 'answers'];
      const key = 'users';
      return respondWithSuccess(res, 200, 'Users retrieved successfully', pushObjectToRedis(refreshedUsers, dataValues, key));
    }
    return respondWithSuccess(res, 200, 'Users retrieved successfully', returnData(users));
  });
};

export const queryUsers = async (req, res) => {
  try {
    const users = await queryAllUsers(req.query.displayName);
    return !users.length ? respondWithWarning(res, 404, 'User not found') : respondWithSuccess(res, 200, 'Users retrieved successfully', users);
  } catch (error) {
    return respondWithWarning(res, 500, 'Oops! something bad happened');
  }
};

export const subscribeToQuestion = async (req, res) => {
  try {
    const user = await subscribeToQuestions(req.auth.id);
    return respondWithSuccess(res, 200, 'You have successfully subscribed to questions', user);
  } catch (error) {
    return respondWithWarning(res, 500, 'Oops! something bad happened');
  }
};
