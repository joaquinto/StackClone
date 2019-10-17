import _ from 'lodash';
import User from '../models/user';
import { eventEmitter } from '../helpers/notificationHandler';
import { addToSet } from '../helpers/userHelpers';
import filterQuery from '../helpers/filterQuery';
import client from '../helpers/redis';

export const findAllUsers = async () => {
  try {
    const users = await User.find({}, '_id displayName email questions answers').populate('questions').populate('answers').exec();
    return users;
  } catch (error) {
    return new Error(error);
  }
};

export const findUser = async (payload) => {
  try {
    const user = await User.findOne(payload);
    return user;
  } catch (error) {
    return new Error(error);
  }
};

export const createUser = async (newUser) => {
  try {
    let user = await User.create(newUser);
    user = user.toObject();
    client.lpush('users', JSON.stringify(_.omit(user, 'password', '__v', 'subscription', 'questions', 'answers')));
    return user;
  } catch (error) {
    return new Error(error);
  }
};

export const addUserQuestion = async (userId, payload) => {
  try {
    const user = await addToSet(User, userId, 'questions', payload);
    return user;
  } catch (error) {
    return new Error(error);
  }
};

export const addUserAnswer = async (userId, payload) => {
  try {
    const user = await addToSet(User, userId, 'answers', payload);
    return user;
  } catch (error) {
    return new Error(error);
  }
};

export const sendAuthorNotification = async (authorId, title, questionId) => {
  try {
    const user = await findUser({ _id: authorId });
    if (user.subscription) {
      const data = {
        title,
        questionId,
        message: `Someone answered ${title}`,
      };
      client.lpush(`${authorId}-notification`, JSON.stringify(data));
      eventEmitter('notification', { email: user.email, ...data });
    }
    return null;
  } catch (error) {
    return new Error(error);
  }
};

export const queryAllUsers = async (query) => {
  try {
    const queryArray = query.split(' ');
    const users = await User.find({}, '_id displayName email');
    const queryLocator = 'displayName';

    const queryPool = [...new Set(filterQuery(queryArray, users, queryLocator))];
    return queryPool;
  } catch (error) {
    return new Error(error);
  }
};

export const subscribeToQuestions = async (userId) => {
  try {
    const user = await findUser({ _id: userId });
    user.set({ subscription: !user.subscription });
    user.save();
    return user;
  } catch (error) {
    return new Error(error);
  }
};
