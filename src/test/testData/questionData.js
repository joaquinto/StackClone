const questionData = {
  question: {
    title: 'How to use enu values with Joi String validation',
    details: `I am using Joi validator for my HTTP requests.  There I have a parameter called type. I need to make sure that the possible values for the parameter are either "ios" or "android".

    How can i do that?`,
    tags: ['node.js', 'java', 'laravel', 'facebook'],
  },
  questionWithMissingTitle: {
    details: `I am using Joi validator for my HTTP requests.  There I have a parameter called type. I need to make sure that the possible values for the parameter are either "ios" or "android".

    How can i do that?`,
    tags: ['node.js', 'java', 'laravel', 'facebook'],
  },
  questionWithEmptyTitle: {
    title: '',
    details: `I am using Joi validator for my HTTP requests.  There I have a parameter called type. I need to make sure that the possible values for the parameter are either "ios" or "android".

    How can i do that?`,
    tags: ['node.js', 'java', 'laravel', 'facebook'],
  },
  questionwithLeastTitle: {
    title: 'Ho',
    details: `I am using Joi validator for my HTTP requests.  There I have a parameter called type. I need to make sure that the possible values for the parameter are either "ios" or "android".

    How can i do that?`,
    tags: ['node.js', 'java', 'laravel', 'facebook'],
  },
  questionWithMissingDetails: {
    title: 'How to use enu values with Joi String validation',
    tags: ['node.js', 'java', 'laravel', 'facebook'],
  },
  questionWithEmptyDetails: {
    title: 'How to use enu values with Joi String validation',
    details: '',
    tags: ['node.js', 'java', 'laravel', 'facebook'],
  },
  questionWithLeastDetails: {
    title: 'How to use enu values with Joi String validation',
    details: 'i',
    tags: ['node.js', 'java', 'laravel', 'facebook'],
  },
  questionWithMissingTags: {
    title: 'How to use enu values with Joi String validation',
    details: `I am using Joi validator for my HTTP requests.  There I have a parameter called type. I need to make sure that the possible values for the parameter are either "ios" or "android".

    How can i do that?`,
  },
  questionWithEmptyTags: {
    title: 'How to use enu values with Joi String validation',
    details: `I am using Joi validator for my HTTP requests.  There I have a parameter called type. I need to make sure that the possible values for the parameter are either "ios" or "android".

    How can i do that?`,
    tags: '',
  },
  questionWithStringTags: {
    title: 'How to use enu values with Joi String validation',
    details: `I am using Joi validator for my HTTP requests.  There I have a parameter called type. I need to make sure that the possible values for the parameter are either "ios" or "android".

    How can i do that?`,
    tags: 'node.js',
  },
  questionWithLeastTags: {
    title: 'How to use enu values with Joi String validation',
    details: `I am using Joi validator for my HTTP requests.  There I have a parameter called type. I need to make sure that the possible values for the parameter are either "ios" or "android".

    How can i do that?`,
    tags: ['node.js', 'java'],
  },
};

export default questionData;
