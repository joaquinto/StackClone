export const signInPath = {
  post: {
    tags: ['auth'],
    summary: 'Sign a user in',
    description: 'Allows registered user to signin',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'User request object',
        required: true,
        schema: {
          $ref: '#/definitions/signIn',
        },
      },
    ],
    responses: {
      200: {
        description: 'Logged in successfully',
        schema: {
          $ref: '#/definitions/success',
        },
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest',
        },
      },
      401: {
        description: 'Incorrect login details',
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

export const signUpPath = {
  post: {
    tags: ['auth'],
    summary: 'Create a new user',
    description: 'Register a new user',
    parameters: [
      {
        name: 'body',
        in: 'body',
        description: 'User request object',
        required: true,
        schema: {
          $ref: '#/definitions/signUp',
        },
      },
    ],
    responses: {
      201: {
        description: 'User created successfully',
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
      409: {
        description: 'User already exist on the database',
        schema: {
          $ref: '#/definitions/conflict',
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
