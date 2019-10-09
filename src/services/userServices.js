import _ from 'lodash';
import User from '../models/user';
import { eventEmitter } from '../helpers/notificationHandler';
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
    const user = await User.findOne({ _id: userId });
    user.questions.addToSet(payload);
    user.save();
    return user;
  } catch (error) {
    return new Error(error);
  }
};

export const addUserAnswer = async (userId, payload) => {
  try {
    const user = await User.findOne({ _id: userId });
    user.answers.addToSet(payload);
    user.save();
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
    const userResponse = [];
    const users = await User.find({}, '_id displayName email');

    queryArray.forEach((queryItem) => {
      if (queryItem.length) {
        users.filter(({ displayName }) => displayName.toLowerCase()
          .match(queryItem.toLowerCase())).map(item => userResponse.push(item));
      }
    });

    const queryPool = [...new Set(userResponse)];
    return queryPool;
  } catch (error) {
    return new Error(error);
  }
};

export const subscribeToQuestions = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    user.set({ subscription: !user.subscription });
    user.save();
    return user;
  } catch (error) {
    return new Error(error);
  }
};
