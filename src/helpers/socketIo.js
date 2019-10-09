import socketIO from 'socket.io';
import { sendNotification } from './notificationHandler';

const users = {};

const socketConnection = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    socket.on('logged in', (data) => {
      const { email } = data;
      users[email] = socket.id;
    });
    socket.on('disconnecting', (data) => {
      if (!data.email) return;
      delete users[data.email];
    });
  });

  sendNotification('notification', io, users);
};

export default socketConnection;
