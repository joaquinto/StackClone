import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import questionData from './testData/questionData';
import answerData from './testData/answerData';

app.listen(3003);

chai.should();
chai.use(chaiHttp);

const url = '/api/v1/questions';

describe('POST QUESTION', () => {
  let request;
  let userToken;
  beforeEach(async () => {
    request = await chai.request(app);
    const res = await chai.request(app).post('/api/v1/auth/signin').send({ email: 'johnwheal@gmail.com', password: 'johnwheal' });
    userToken = res.body.data.token;
  });

  it('should return error 404', async () => {
    const res = await request
      .get(`${url}`);
    res.body.should.have.property('message').equal('Questions not found');
    res.body.should.have.property('status').equal(404);
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
  });

  it('should return question object', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.question);
    res.body.should.have.property('message').equal('Question created successfully');
    res.body.should.have.property('status').equal(201);
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
  });

  it('should return an error for missing title', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionWithMissingTitle);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('title is required');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for empty title', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionWithEmptyTitle);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('title is not allowed to be empty');
    res.body.data[1].should.equal('title length must be at least 3 characters long');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for least title', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionwithLeastTitle);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('title length must be at least 3 characters long');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for missing details', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionWithMissingDetails);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('details is required');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for empty details', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionWithEmptyDetails);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('details is not allowed to be empty');
    res.body.data[1].should.equal('details length must be at least 3 characters long');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for least details', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionWithLeastDetails);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('details length must be at least 3 characters long');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for missing tags', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionWithMissingTags);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('tags is required');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for empty tags', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionWithEmptyTags);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('tags must be an array');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for string tags', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionWithStringTags);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('tags must be an array');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for least details', async () => {
    const res = await request
      .post(`${url}`)
      .set('Authorization', userToken)
      .send(questionData.questionWithLeastTags);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('tags must contain at least 3 items');
    res.body.should.have.property('success').equal(false);
  });

  it('should return error 404', async () => {
    const res = await request
      .patch(`${url}/m`)
      .set({ Authorization: userToken });
    res.body.should.have.property('message').equal('Page not found');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
  });
});

describe('SEARCH QUESTIONS', () => {
  let request;
  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should get the list of users', async () => {
    const res = await request.get(`${url}/search/?question=validation`);
    res.body.should.have.property('message').equal('Questions or Answers retrieved successfully');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
    res.body.should.have.property('status').equal(200);
  });

  it('should return error for mis-spelt query parameter', async () => {
    const res = await request.get(`${url}/search/?questionss=validation`);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.data[0].should.equal('question is required');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
  });

  it('should return error for query string less than 3', async () => {
    const res = await request.get(`${url}/search/?question=jo`);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.data[0].should.equal('question length must be at least 3 characters long');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
  });

  it('should return error 404 for unfound question search', async () => {
    const res = await request
      .get(`${url}/search/?question=babangida`);
    res.body.should.have.property('message').equal('Question or Answer not found');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
  });
});

describe('Get QUESTIONS', () => {
  let request;
  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should return question object', async () => {
    const res = await request
      .get(`${url}`);
    res.body.should.have.property('message').equal('Questions retrived successfully');
    res.body.should.have.property('status').equal(200);
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
  });
});

describe('Get QUESTION', () => {
  let request;
  let questionId;
  beforeEach(async () => {
    request = await chai.request(app);

    const resq = await chai.request(app).get(`${url}`);
    questionId = resq.body.data[0]._id;
  });

  it('should return question object', async () => {
    const res = await request
      .get(`${url}/${questionId
      }`);
    res.body.should.have.property('message').equal('Question retrived successfully');
    res.body.should.have.property('status').equal(200);
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
  });

  it('should upvote a question', async () => {
    const res = await request
      .get(`${url}/1245`);
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
    res.body.should.have.property('message').equal('Question not found');
    res.body.should.have.property('data');
  });

  it('should return error 404', async () => {
    const res = await request
      .get(`${url}/${questionId}/m`);
    res.body.should.have.property('message').equal('Page not found');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
  });
});

describe('UPVOTE QUESTION', () => {
  let request;
  let userToken;
  let questionId;
  beforeEach(async () => {
    request = await chai.request(app);
    const res = await chai.request(app).post('/api/v1/auth/signin').send({ email: 'johnwheal@gmail.com', password: 'johnwheal' });
    userToken = res.body.data.token;

    const resq = await chai.request(app).get(`${url}`);
    questionId = resq.body.data[0]._id;
  });

  it('should upvote a question', async () => {
    const res = await request
      .patch(`${url}/${questionId}/upvote`)
      .set('Authorization', userToken);
    res.body.should.have.property('success').equal(true);
    res.body.should.have.property('status').equal(200);
    res.body.should.have.property('message').equal('Question has been up voted successfully');
    res.body.should.have.property('data');
  });

  it('should upvote a question', async () => {
    const res = await request
      .patch(`${url}/1245/upvote`)
      .set('Authorization', userToken);
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
    res.body.should.have.property('message').equal('Question not found');
    res.body.should.have.property('data');
  });

  it('should return error 404', async () => {
    const res = await request
      .patch(`${url}/${questionId}/m`)
      .set({ Authorization: userToken });
    res.body.should.have.property('message').equal('Page not found');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
  });
});

describe('DOWNVOTE QUESTION', () => {
  let request;
  let userToken;
  let questionId;
  beforeEach(async () => {
    request = await chai.request(app);
    const res = await chai.request(app).post('/api/v1/auth/signin').send({ email: 'johnwheal@gmail.com', password: 'johnwheal' });
    userToken = res.body.data.token;

    const resq = await chai.request(app).get(`${url}`);
    questionId = resq.body.data[0]._id;
  });

  it('should upvote a question', async () => {
    const res = await request
      .patch(`${url}/${questionId}/downvote`)
      .set('Authorization', userToken);
    res.body.should.have.property('success').equal(true);
    res.body.should.have.property('status').equal(200);
    res.body.should.have.property('message').equal('Question has been down voted successfully');
    res.body.should.have.property('data');
  });

  it('should upvote a question', async () => {
    const res = await request
      .patch(`${url}/1245/downvote`)
      .set('Authorization', userToken);
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
    res.body.should.have.property('message').equal('Question not found');
    res.body.should.have.property('data');
  });

  it('should return error 404', async () => {
    const res = await request
      .patch(`${url}/${questionId}/m`)
      .set({ Authorization: userToken });
    res.body.should.have.property('message').equal('Page not found');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
  });
});

describe('POST Answer', () => {
  let request;
  let userToken;
  let questionId;

  beforeEach(async () => {
    request = await chai.request(app);

    const res = await chai.request(app).post('/api/v1/auth/signin').send({ email: 'johnwheal@gmail.com', password: 'johnwheal' });
    userToken = res.body.data.token;

    const resq = await chai.request(app).get(`${url}`);
    questionId = resq.body.data[0]._id;
  });

  it('should return answer object', async () => {
    const res = await request
      .post(`${url}/${questionId}/answers`)
      .set('Authorization', userToken)
      .send(answerData.answer);
    res.body.should.have.property('message').equal('Answer posted successfully');
    res.body.should.have.property('status').equal(201);
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
  });

  it('should return an error for missing body', async () => {
    const res = await request
      .post(`${url}/${questionId}/answers`)
      .set('Authorization', userToken)
      .send(answerData.answerWithMissingBody);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('body is required');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for empty body', async () => {
    const res = await request
      .post(`${url}/${questionId}/answers`)
      .set('Authorization', userToken)
      .send(answerData.answerWithEmptyBody);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('body is not allowed to be empty');
    res.body.data[1].should.equal('body length must be at least 3 characters long');
    res.body.should.have.property('success').equal(false);
  });

  it('should return an error for least body', async () => {
    const res = await request
      .post(`${url}/${questionId}/answers`)
      .set('Authorization', userToken)
      .send(answerData.answerWithLeastBody);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('body length must be at least 3 characters long');
    res.body.should.have.property('success').equal(false);
  });
});
