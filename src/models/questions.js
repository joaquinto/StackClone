import mongoose from 'mongoose';

import { enumTags } from '../helpers/validationRules';

const { Schema } = mongoose;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    enum: enumTags,
  },
  votes: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }],
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

const Question = mongoose.model('Question', questionSchema);

export default Question;
