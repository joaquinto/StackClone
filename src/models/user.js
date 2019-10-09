import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  displayName: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }],
  subscription: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
}, {
  timeStamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
