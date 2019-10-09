export const questionId = {
  type: 'object',
  properties: {
    questionId: {
      type: 'string',
    },
  },
};

export const createQuestion = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      example: 'How to use enu values with Joi String validation',
    },
    details: {
      type: 'string',
      example: `I am using Joi validator for my HTTP requests.  There I have a parameter called type. I need to make sure that the possible values for the parameter are either "ios" or "android".

      How can i do that?`,
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
        example: 'java',
      },
    },
  },
};
