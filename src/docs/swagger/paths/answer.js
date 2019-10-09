const postAnswerPath = {
  post: {
    tags: [
      'answers',
    ],
    security: [
      {
        BearerToken: [],
      },
    ],
    summary: 'Answer a question',
    description: 'Answer a question',
    parameters: [
      {
        name: 'questionId',
        in: 'path',
        description: 'Question id',
        required: true,
        schema: {
          $ref: '#/definitions/questionId',
        },
      },
      {
        name: 'body',
        in: 'body',
        description: 'Answer request body',
        required: true,
        schema: {
          $ref: '#/definitions/createAnswer',
        },
      },
    ],
    responses: {
      201: {
        description: 'Operation successful',
        schema: {
          $ref: '#/definitions/created',
        },
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest',
        },
      },
      401: {
        description: 'Unauthorized access',
        schema: {
          $ref: '#/definitions/notAuthorized',
        },
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError',
        },
      },
    },
  },
};

export default postAnswerPath;
