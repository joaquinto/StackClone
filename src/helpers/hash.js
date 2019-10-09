import bcrypt from 'bcrypt';
import constants from '../config/constants';

export const hashPassword = async password => bcrypt.hash(password, Number(constants.SALT_ROUND));

export const comparePasswords = async (userPassword, hashedPassword) => bcrypt
  .compare(userPassword, hashedPassword);
