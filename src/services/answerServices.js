import Answer from '../models/answers';

export const createAnswer = async (payload) => {
  try {
    const answer = await Answer.create(payload);
    return answer;
  } catch (error) {
    return new Error(error);
  }
};


export const findAllAnswers = async () => {
  try {
    const answers = await Answer.find({}, '_id body userId').populate('questionId', 'tags _id title details').exec();
    return answers;
  } catch (error) {
    return new Error(error);
  }
};
