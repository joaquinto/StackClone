import _ from 'lodash';
import client from './redis';

export const pushObjectToRedis = (dataObject, datavalues, key) => {
  const response = [];
  dataObject.forEach((item) => {
    const modifiedUser = _.omit(item.toObject(), ...datavalues);
    response.push(modifiedUser);
    client.lpush(key, JSON.stringify(modifiedUser));
  });
  return response;
};

export const returnData = (payload) => {
  const response = [];
  payload.forEach((user) => {
    response.push(JSON.parse(user));
  });
  return response;
};
