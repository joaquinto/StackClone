import redis from 'redis';
import log from 'fancy-log';

const client = redis.createClient();

client.on('connect', () => {
  log('redis database connected');
});

export default client;
