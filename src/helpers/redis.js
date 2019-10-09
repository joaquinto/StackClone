import redis from 'redis';
import log from 'fancy-log';
import constants from '../config/constants'

const client = redis.createClient(constants.REDIS_URL);

client.on('connect', () => {
  log('redis database connected');
});

export default client;
