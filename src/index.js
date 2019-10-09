import http from 'http';
import log from 'fancy-log';
import app from './app';
import socketConnection from './helpers/socketIo';
import constants from './config/constants';
import client from './helpers/redis';

const { PORT } = constants;

const server = http.createServer(app);

client.flushall((error) => {
  if (error) throw new Error(error);
  log('Data cache has been cleared');
});

socketConnection(server);

server.listen(PORT, () => {
  log(`server running on port ${PORT}`);
});
