import _ from 'lodash';
import Question from '../models/questions';
import { addToSet, voteQuestion } from '../helpers/userHelpers';
import { findAllAnswers } from './answerServices';
import filterQuery from '../helpers/filterQuery';
import client from '../helpers/redis';

export const findAllQuestions = async () => {
  try {
    const questions = await Question.find({}, '_id title tags details').populate('answers', 'questionId body userId').exec();
    return questions;
  } catch (error) {
    return new Error(error);
  }
};

export const findQuestion = async (payload) => {
  try {
    const question = await Question.findOne(payload);
    return question;
  } catch (error) {
    return new Error(error);
  }
};

export const createQuestion = async (newQuestion) => {
  try {
    let question = await Question.create(newQuestion);
    question = question.toObject();
    client.lpush('questions', JSON.stringify(_.omit(question, 'answers', '__v')));
    return question;
  } catch (error) {
    return new Error(error);
  }
};

export const upVoteQuestion = async (id) => {
  try {
    const question = await voteQuestion(Question, id, 'upvote');
    // const question = await Question
    //   .findOneAndUpdate({ _id: id }, { $inc: { votes: 1 } }, { new: true });
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>', question);
    return question;
  } catch (error) {
    return new Error(error);
  }
};

export const downVoteQuestion = async (id) => {
  try {
    const question = await voteQuestion(Question, id, 'downvote');
    // const question = await Question
    //   .findOneAndUpdate({ _id: id }, { $inc: { votes: -1 } }, { new: true });
    console.log('<<<<<<<<<<<<<<<<<<<<<<<', question);
    return question;
  } catch (error) {
    return new Error(error);
  }
};

export const addQuestionAnswer = async (questionId, payload) => {
  try {
    const question = await addToSet(Question, questionId, 'answers', payload);
    return question;
  } catch (error) {
    return new Error(error);
  }
};

export const queryAllQuestions = async (query) => {
  try {
    const queryArray = query.split(' ');
    const questions = await findAllQuestions();
    const answers = await findAllAnswers();
    const queryPool = [...filterQuery(queryArray, questions, 'title'), ...filterQuery(queryArray, answers, 'body')];
    return queryPool;
  } catch (error) {
    return new Error(error);
  }
};
