import EventEmitter from 'events';

const notification = new EventEmitter();

export const eventEmitter = (event, data) => {
  notification.emit(event, data);
};

const socketEmitter = (event, io, users, data) => {
  io.to(users[data.email]).emit(event, data);
};

const eventListener = (event, io, users) => {
  notification.on(event, (data) => {
    socketEmitter(event, io, users, data);
  });
};

export const sendNotification = (event, io, users) => {
  eventListener(event, io, users);
};
