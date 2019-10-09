import mongoose from 'mongoose';

const { Schema } = mongoose;

const answerSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
}, { timeStamps: true });

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
