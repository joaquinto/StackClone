import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    enum: ['javascript', 'java', 'c#', 'php', 'python', 'android', 'jquery', 'html', 'c++', 'ios', 'css', 'mysql', 'sql', 'asp.net', 'c', 'ruby-on-rails', 'r', 'arrays', 'node.js', 'objective-c', '.net', 'json', 'sql-server', 'angularjs', 'swift', 'iphone', 'regex', 'django', 'ruby', 'excel', 'ajax', 'xml', 'python-3.x', 'angular', 'asp.net-mvc', 'linux', 'reactjs', 'database', 'spring', 'wordpress', 'vba', 'wpf', 'string', 'xcode', 'windows', 'laravel', 'vb.net', 'pandas', 'html5', 'mongodb', 'multithreading', 'eclipse', 'bash', 'git', 'oracle', 'postgresql', 'forms', 'twitter-bootstrap', 'image', 'macos', 'algorithm', 'typescript', 'scala', 'python-2.7', 'list', 'visual-studio', 'winforms', 'apache', 'matlab', 'performance', 'facebook', 'amazon-web-services', 'excel-vba', 'entity-framework', 'hibernate', 'css3', 'sqlite', 'firebase', 'function', 'azure', 'linq', 'swing', 'rest', 'powershell', 'shell', 'qt', 'api', 'maven', 'spring-boot', '.htaccess', 'selenium', 'file', 'loops', 'unit-testing', 'numpy', 'codeigniter', 'csv', 'docker', 'symfony', 'perl'],
  },
  votes: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }],
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
}, { timeStamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;
