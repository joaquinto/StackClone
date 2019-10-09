export const signIn = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'johnwheal@gmail.com',
    },
    password: {
      type: 'string',
      format: 'password',
      minLength: 6,
      example: 'johnwheal',
    },
  },
};

export const signUp = {
  type: 'object',
  properties: {
    displayName: {
      type: 'string',
      example: 'tonystark23',
    },
    email: {
      type: 'string',
      format: 'email',
      example: 'tonystark23@gmail.com',
    },
    password: {
      type: 'string',
      format: 'password',
      minLength: 6,
      example: 'tonystark23',
    },
  },
};
