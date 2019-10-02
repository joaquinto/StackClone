import http from 'http';
import log from 'fancy-log';
import app from './app';
import constants from './config/constants';

const { PORT } = constants;
const server = http.createServer(app);

server.listen(PORT, () => {
  log(`server running on port ${PORT}`);
});
