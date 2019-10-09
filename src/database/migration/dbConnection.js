import mongoose from 'mongoose';

import constants from '../../config/constants';

const dbConnection = async () => {
  mongoose.connect(constants.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default dbConnection;
