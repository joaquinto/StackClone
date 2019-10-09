import http from 'http';
import log from 'fancy-log';
import cluster from 'cluster';
import { cpus } from 'os';
import app from './app';
import socketConnection from './helpers/socketIo';
import constants from './config/constants';
import client from './helpers/redis';

const { PORT } = constants;
const noOfCpu = cpus().length;

if (cluster.isMaster) {
  log(`master ${process.pid} is running`);
  client.flushall((error) => {
    if (error) throw new Error(error);
    log('Data cache has been cleared');
  });
  // fork workers
  for (let i = 0; i < noOfCpu; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    log(`worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer(app);

  socketConnection(server);

  server.listen(PORT, () => {
    log(`server running on port ${PORT}`);
  });

  log(`worker ${process.pid} started`);
}
