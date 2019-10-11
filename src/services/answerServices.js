import Answer from '../models/answers';
import client from '../helpers/redis';

export const createAnswer = async (payload) => {
  try {
    const answer = await Answer.create(payload);
    client.lpush('answers', JSON.stringify(answer));
    return answer;
  } catch (error) {
    return new Error(error);
  }
};


export const findAllAnswers = async () => {
  try {
    const answers = await Answer.find({}, '_id body user question').populate('questionId', 'tags _id title details').exec();
    return answers;
  } catch (error) {
    return new Error(error);
  }
};
