const success = {
  type: 'object',
  required: ['success', 'message'],
  properties: {
    status: {
      type: 'int',
      example: 200,
    },
    success: {
      type: 'boolean',
      example: true,
    },
    message: {
      type: 'string',
      example: 'Operation successful',
    },
    data: {
      type: 'object',
      items: {
        type: 'string',
        example: 'data',
      },
    },
  },
};

const created = {
  type: 'object',
  required: ['success', 'message'],
  properties: {
    status: {
      type: 'int',
      example: 201,
    },
    success: {
      type: 'boolean',
      example: true,
    },
    message: {
      type: 'string',
      example: 'Resource created',
    },
    data: {
      type: 'object',
      items: {
        type: 'string',
        example: 'data',
      },
    },
  },
};

const noContent = {
  type: 'object',
  required: ['success', 'message'],
  properties: {
    status: {
      type: 'int',
      example: 200,
    },
    success: {
      type: 'boolean',
      example: true,
    },
  },
};

export {
  created,
  noContent,
  success,
};
