/* eslint-disable no-underscore-dangle */
import { createAnswer, findAllAnswers } from '../services/answerServices';
import { respondWithSuccess, respondWithWarning } from '../helpers/responseHandler';
import { addUserAnswer, sendAuthorNotification } from '../services/userServices';
import { addQuestionAnswer } from '../services/questionServices';
import client from '../helpers/redis';
import { pushObjectToRedis, returnData } from '../helpers/objectHelper';

export const postAnswer = async (req, res) => {
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

export const findAnswers = async (req, res) => {
  let answers;
  client.lrange('answers', 0, -1, async (error, data) => {
    if (error || data.length < 1) {
      const refreshedAnswers = await findAllAnswers();
      const dataValues = ['__v'];
      const key = 'answers';
      answers = pushObjectToRedis(refreshedAnswers, dataValues, key);
      return !answers.length ? respondWithWarning(res, 404, 'Answers not found') : respondWithSuccess(res, 200, 'Answers retrived successfully', answers);
    }
    answers = returnData(data);
    return !answers.length ? respondWithWarning(res, 404, 'Answers not found') : respondWithSuccess(res, 200, 'Answers retrived successfully', answers);
  });
};
