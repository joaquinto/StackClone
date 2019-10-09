import { findQuestionById } from '../services/questionServices';
import client from '../helpers/redis';
import { respondWithWarning } from '../helpers/responseHandler';

const validQuestion = async (req, res, next) => {
  try {
    const question = await findQuestionById(req.params.questionId);
    if (!question || !question.tags) {
      return respondWithWarning(res, 404, 'Question not found');
    }
    client.set(req.params.questionId, JSON.stringify(question));
    req.authorId = question._id;
    return next();
  } catch (error) {
    return respondWithWarning(res, 500, 'Oops! something bad happened');
  }
};

export default validQuestion;
