/* eslint-disable no-underscore-dangle */
import {
  findAllQuestions, upVoteQuestion, createQuestion, downVoteQuestion, queryAllQuestions,
} from '../services/questionServices';
import { addUserQuestion } from '../services/userServices';
import { respondWithWarning, respondWithSuccess } from '../helpers/responseHandler';
import client from '../helpers/redis';
import { pushObjectToRedis, returnData } from '../helpers/objectHelper';

export const postQuestion = async (req, res) => {
  try {
    const question = await createQuestion({ ...req.body, user: req.auth.id });
    await addUserQuestion(req.auth.id, question._id);
    return respondWithSuccess(res, 201, 'Question created successfully', question);
  } catch (error) {
    return respondWithWarning(res, '500', 'Oops! something bad happened', error);
  }
};

export const getQuestions = async (req, res) => {
  let questions;
  client.lrange('questions', 0, -1, async (error, data) => {
    if (error || data.length < 1) {
      const refreshedQuestion = await findAllQuestions();
      const dataValue = ['answers', '__v'];
      const key = 'questions';
      questions = pushObjectToRedis(refreshedQuestion, dataValue, key);
      return !questions.length ? respondWithWarning(res, 404, 'Questions not found') : respondWithSuccess(res, 200, 'Questions retrived successfully', questions);
    }
    questions = returnData(data);
    return !questions.length ? respondWithWarning(res, 404, 'Questions not found') : respondWithSuccess(res, 200, 'Questions retrived successfully', questions);
  });
};

export const getQuestion = async (req, res) => {
  client.get(req.params.questionId, (error, question) => {
    if (error) throw new Error(error);
    return respondWithSuccess(res, 200, 'Question retrived successfully', JSON.parse(question));
  });
};

export const upVoteAQuestion = async (req, res) => {
  try {
    const question = await upVoteQuestion(req.params.questionId);
    return respondWithSuccess(res, 200, 'Question has been up voted successfully', question);
  } catch (error) {
    return respondWithWarning(res, '500', 'Oops! something bad happened');
  }
};

export const downVoteAQuestion = async (req, res) => {
  try {
    const question = await downVoteQuestion(req.params.questionId);
    return respondWithSuccess(res, 200, 'Question has been down voted successfully', question);
  } catch (error) {
    return respondWithWarning(res, '500', 'Oops! something bad happened');
  }
};

export const queryQuestions = async (req, res) => {
  try {
    const questions = await queryAllQuestions(req.query.question);
    return !questions.length ? respondWithWarning(res, 404, 'Question or Answer not found') : respondWithSuccess(res, 200, 'Questions or Answers retrieved successfully', questions);
  } catch (error) {
    return respondWithWarning(res, '500', 'Oops! something bad happened');
  }
};
