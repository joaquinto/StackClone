import Joi from '@hapi/joi';
import validationRules from '../helpers/validationRules';
import joiValidator from '../helpers/joiValidator';
import { respondWithWarning } from '../helpers/responseHandler';

export const signUpValidation = (req, res, next) => {
  const signUpSchema = Joi.object().keys({
    displayName: validationRules.displayName,
    email: validationRules.email,
    password: validationRules.password,
  });

  const errors = joiValidator(req.body, signUpSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

export const signInValidation = (req, res, next) => {
  const signInSchema = Joi.object().keys({
    email: validationRules.email,
    password: validationRules.password,
  });

  const errors = joiValidator(req.body, signInSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

export const questionValidation = (req, res, next) => {
  const questionSchema = Joi.object().keys({
    title: validationRules.title,
    details: validationRules.title,
    tags: validationRules.tag,
  });

  const errors = joiValidator(req.body, questionSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

export const idValidation = (req, res, next) => {
  const idSchema = Joi.object().keys({
    questionId: validationRules.displayName,
  });

  const errors = joiValidator(req.params, idSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

export const answerValidation = (req, res, next) => {
  const answerSchema = Joi.object().keys({
    questionId: validationRules.displayName,
    body: validationRules.title,
    userId: validationRules.displayName,
  });

  const data = {
    questionId: req.params.questionId,
    body: req.body.body,
    userId: req.auth.id,
  };

  const errors = joiValidator(data, answerSchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

export const userSearchValidation = (req, res, next) => {
  const querySchema = Joi.object().keys({
    displayName: validationRules.displayName,
  });

  const errors = joiValidator(req.query, querySchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};

export const questionSearchValidation = (req, res, next) => {
  const querySchema = Joi.object().keys({
    question: validationRules.displayName,
  });

  const errors = joiValidator(req.query, querySchema);
  if (!errors) {
    return next();
  }
  return respondWithWarning(res, 400, 'Bad request', errors);
};
