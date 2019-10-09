import client from '../helpers/redis';
import { findUser } from '../services/userServices';
import { respondWithWarning } from '../helpers/responseHandler';

export const validUser = async (req, res, next) => {
  try {
    const user = await findUser({ email: req.body.email });
    if (!user) {
      return respondWithWarning(res, 404, 'User not found');
    }
    client.set('user', JSON.stringify(user));
    return next();
  } catch (error) {
    return respondWithWarning(res, 500, 'Oops! something went Wrong');
  }
};

export const existingUser = async (req, res, next) => {
  try {
    const user = await findUser({ email: req.body.email });
    if (user) {
      return respondWithWarning(res, 409, 'User already exist');
    }
    return next();
  } catch (error) {
    return respondWithWarning(res, 500, 'Oops! something went Wrong');
  }
};

export const checkUser = async (req, res, next) => {
  try {
    const user = await findUser({ _id: req.auth.id });
    if (!user) {
      return respondWithWarning(res, 404, 'User not found');
    }
    client.set('user', JSON.stringify(user));
    return next();
  } catch (error) {
    return respondWithWarning(res, 500, 'Oops! something went Wrong');
  }
};
