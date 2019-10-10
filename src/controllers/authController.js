/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import client from '../helpers/redis';
import { createUser } from '../services/userServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import { generateToken } from '../helpers/jwt';
import { hashPassword, comparePasswords } from '../helpers/hash';

export const signUp = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const user = await createUser(req.body);
    user.token = await generateToken({ id: user._id });
    return respondWithSuccess(res, 201, 'User created successfully', _.omit(user, 'password', '__v'));
  } catch (error) {
    return respondWithWarning(res, 500, 'Oops! something happened', error);
  }
};

export const signIn = async (req, res) => {
  client.get('user', async (error, data) => {
    if (error) return respondWithWarning(res, 500, 'Oops! something', error);

    const user = JSON.parse(data);
    const { password } = req.body;
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return respondWithWarning(res, 401, 'Wrong email or password');
    }
    user.token = await generateToken({ id: user._id });
    return respondWithSuccess(res, 200, 'Logged in successfully', _.omit(user, 'password', '__v'));
  });
};
