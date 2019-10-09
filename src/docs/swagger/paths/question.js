export const postQuestionPath = {
  post: {
    tags: [
      'questions',
    ],
    security: [
      {
        BearerToken: [],
      },
    ],
    summary: 'Post a question',
    description: 'Post a question',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'Question request body',
        required: true,
        schema: {
          $ref: '#/definitions/createQuestion',
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


export const getQuestionsPath = {
  get: {
    tags: [
      'questions',
    ],
    summary: 'Get all questions',
    description: 'Displays the list of all questions',
    responses: {
      200: {
        description: 'Operation successful',
        schema: {
          $ref: '#/definitions/success',
        },
      },
      404: {
        description: 'Questions not found',
        schema: {
          $ref: '#/definitions/notFound',
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

export const getQuestionPath = {
  get: {
    tags: [
      'questions',
    ],
    summary: 'Get a question',
    description: 'Displays a specific question',
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
    ],
    responses: {
      200: {
        description: 'Operation successful',
        schema: {
          $ref: '#/definitions/success',
        },
      },
      400: {
        description: 'Invalid question id',
        schema: {
          $ref: '#/definitions/badRequest',
        },
      },
      404: {
        description: 'Question not found',
        schema: {
          $ref: '#/definitions/notFound',
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

export const searchquestionsPath = {
  get: {
    tags: [
      'questions',
    ],
    summary: 'Search questions',
    description: 'Displays the list of all questions that matches the query',
    parameters: [
      {
        name: 'question',
        in: 'query',
        description: 'Query parameter takes in the search query',
        required: true,
        type: 'string',
      },
    ],
    responses: {
      200: {
        description: 'Operation successful',
        schema: {
          $ref: '#/definitions/success',
        },
      },
      400: {
        description: 'Invalid query parameter',
        schema: {
          $ref: '#/definitions/badRequest',
        },
      },
      404: {
        description: 'Questions not found',
        schema: {
          $ref: '#/definitions/notFound',
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

export const questionUpVotePath = {
  patch: {
    tags: [
      'questions',
    ],
    security: [
      {
        BearerToken: [],
      },
    ],
    summary: 'Upvote a question',
    description: 'Upvote a question',
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
    ],
    responses: {
      200: {
        description: 'Operation successful',
        schema: {
          $ref: '#/definitions/success',
        },
      },
      400: {
        description: 'Invalid question id parameter',
        schema: {
          $ref: '#/definitions/badRequest',
        },
      },
      401: {
        description: 'Unathorized access',
        schema: {
          $ref: '#/definitions/notAuthorized',
        },
      },
      404: {
        description: 'Question not found',
        schema: {
          $ref: '#/definitions/notFound',
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

export const questionDownVotePath = {
  patch: {
    tags: [
      'questions',
    ],
    security: [
      {
        BearerToken: [],
      },
    ],
    summary: 'Down vote a question',
    description: 'Down vote a question',
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
    ],
    responses: {
      200: {
        description: 'Operation successful',
        schema: {
          $ref: '#/definitions/success',
        },
      },
      400: {
        description: 'Invalid question id parameter',
        schema: {
          $ref: '#/definitions/badRequest',
        },
      },
      401: {
        description: 'Unathorized access',
        schema: {
          $ref: '#/definitions/notAuthorized',
        },
      },
      404: {
        description: 'Question not found',
        schema: {
          $ref: '#/definitions/notFound',
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
