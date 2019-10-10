/* eslint-disable no-underscore-dangle */
import { createAnswer } from '../services/answerServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import { addUserAnswer, sendAuthorNotification } from '../services/userServices';
import { addQuestionAnswer } from '../services/questionServices';

const postAnswer = async (req, res) => {
  try {
    const answer = await createAnswer({
      question: req.params.questionId,
      ...req.body,
      user: req.auth.id,
    });
    await addUserAnswer(req.auth.id, answer._id);
    const question = await addQuestionAnswer(req.params.questionId, answer._id);
    await sendAuthorNotification(question.user, question.title, question._id);
    return respondWithSuccess(res, 201, 'Answer posted successfully', answer);
  } catch (error) {
    return respondWithWarning(res, 500, 'Oops! something bad happened');
  }
};

export default postAnswer;
