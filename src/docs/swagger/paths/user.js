export const getUserPath = {
  get: {
    tags: [
      'users',
    ],
    summary: 'Get all users',
    description: 'Displays the list of all users',
    responses: {
      200: {
        description: 'Operation successful',
        schema: {
          $ref: '#/definitions/success',
        },
      },
      404: {
        description: 'Users not found',
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

export const userSubscribePath = {
  patch: {
    tags: [
      'users',
    ],
    security: [
      {
        BearerToken: [],
      },
    ],
    summary: 'Subscribe for notification',
    description: 'Subscribe to receive notifications whenever the user questions gets answered',
    responses: {
      200: {
        description: 'Operation successful',
        schema: {
          $ref: '#/definitions/success',
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

export const searchUsersPath = {
  get: {
    tags: [
      'users',
    ],
    summary: 'Search users',
    description: 'Displays the list of all users that matches the query',
    parameters: [
      {
        name: 'displayName',
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
        description: 'Users not found',
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
