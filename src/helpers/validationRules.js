import Joi from '@hapi/joi';

const enumTags = ['javascript', 'java', 'c#', 'php', 'python', 'android', 'jquery', 'html', 'c++', 'ios', 'css', 'mysql', 'sql', 'asp.net', 'c', 'ruby-on-rails', 'r', 'arrays', 'node.js', 'objective-c', '.net', 'json', 'sql-server', 'angularjs', 'swift', 'iphone', 'regex', 'django', 'ruby', 'excel', 'ajax', 'xml', 'python-3.x', 'angular', 'asp.net-mvc', 'linux', 'reactjs', 'database', 'spring', 'wordpress', 'vba', 'wpf', 'string', 'xcode', 'windows', 'laravel', 'vb.net', 'pandas', 'html5', 'mongodb', 'multithreading', 'eclipse', 'bash', 'git', 'oracle', 'postgresql', 'forms', 'twitter-bootstrap', 'image', 'macos', 'algorithm', 'typescript', 'scala', 'python-2.7', 'list', 'visual-studio', 'winforms', 'apache', 'matlab', 'performance', 'facebook', 'amazon-web-services', 'excel-vba', 'entity-framework', 'hibernate', 'css3', 'sqlite', 'firebase', 'function', 'azure', 'linq', 'swing', 'rest', 'powershell', 'shell', 'qt', 'api', 'maven', 'spring-boot', '.htaccess', 'selenium', 'file', 'loops', 'unit-testing', 'numpy', 'codeigniter', 'csv', 'docker', 'symfony', 'perl'];

const validationRules = {
  password: Joi.string().required().min(6),
  email: Joi.string().email().required().trim(),
  displayName: Joi.string().required().trim().min(3)
    .max(30),
  title: Joi.string().required().trim().min(3),
  tag: Joi.array().items(Joi.string().valid(...enumTags).required()).min(3).required(),
};

export default validationRules;
