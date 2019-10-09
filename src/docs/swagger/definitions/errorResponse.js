const badRequest = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'int',
      example: 400,
    },
    success: {
      type: 'boolean',
      example: false,
    },
    message: {
      type: 'string',
      example: 'Bad request',
    },
    payload: {
      type: 'object',
      items: {
        type: 'string',
        example: 'Bad Bequest',
      },
    },
  },
};
const notAuthorized = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'int',
      example: 401,
    },
    success: {
      type: 'boolean',
      example: false,
    },
    message: {
      type: 'string',
      example: 'Not Authorized',
    },
    data: {
      type: 'object',
    },
  },
};
const accessForbidden = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'int',
      example: 403,
    },
    success: {
      type: 'boolean',
      example: false,
    },
    message: {
      type: 'string',
      example: 'Access Forbidden',
    },
    data: {
      type: 'object',
    },
  },
};
const notFound = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'int',
      example: 404,
    },
    success: {
      type: 'boolean',
      example: false,
    },
    message: {
      type: 'string',
      example: 'resource not found',
    },
    data: {
      type: 'object',
    },
  },
};
const conflict = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'int',
      example: 409,
    },
    success: {
      type: 'boolean',
      example: false,
    },
    message: {
      type: 'string',
      example: 'Conflict',
    },
    data: {
      type: 'object',
    },
  },
};
const serverError = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'int',
      example: 500,
    },
    success: {
      type: 'boolean',
      example: false,
    },
    message: {
      type: 'string',
      example: 'Server Error',
    },
    data: {
      type: 'object',
    },
  },
};

export {
  badRequest,
  notAuthorized,
  accessForbidden,
  notFound,
  conflict,
  serverError,
};
