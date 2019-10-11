/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import answerData from './testData/answerData';

app.listen(3002);

chai.should();
chai.use(chaiHttp);

const url = '/api/v1/users';
const url1 = '/api/v1/questions';

describe('GET ALL USERS', () => {
  let request;
  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should return all users', async () => {
    const res = await request.get(`${url}`);
    res.body.should.have.property('message').equal('Users retrieved successfully');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
    res.body.should.have.property('status').equal(200);
  });

  it('should return error 404', async () => {
    const res = await request.get(`${url}/m`);
    res.body.should.have.property('message').equal('Page not found');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
  });
});

describe('USER NOTIFICATION SUBSCRIPTION', () => {
  let request;
  let userToken;
  beforeEach(async () => {
    request = await chai.request(app);
    const res = await chai.request(app).post('/api/v1/auth/signin').send({ email: 'johnwheal@gmail.com', password: 'johnwheal' });
    userToken = res.body.data.token;
  });

  it('should change the user subscription status', async () => {
    const res = await request
      .patch(`${url}/subscribe`)
      .set({ Authorization: userToken });
    res.body.should.have.property('message').equal('You have successfully subscribed to questions');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
    res.body.should.have.property('status').equal(200);
  });

  it('should change the user subscription status', async () => {
    const res = await request
      .patch(`${url}/subscribe`)
      .set({ Authorization: 'jbfbbfhbhfbbfjbbbjbj' });
    res.body.should.have.property('message').equal('Session is invalid. Signin to continue');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(401);
  });

  it('should change the user subscription status', async () => {
    const res = await request
      .patch(`${url}/subscribe`);
    res.body.should.have.property('message').equal('No token provided');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(401);
  });

  it('should return error 404', async () => {
    const res = await request
      .patch(`${url}/subscribe/m`)
      .set({ Authorization: userToken });
    res.body.should.have.property('message').equal('Page not found');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
  });
});

describe('SEARCH USER', () => {
  let request;
  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should get the list of users', async () => {
    const res = await request.get(`${url}/search/?displayName=johnwheal`);
    res.body.should.have.property('message').equal('Users retrieved successfully');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
    res.body.should.have.property('status').equal(200);
  });

  it('should return error for mis-spelt query parameter', async () => {
    const res = await request.get(`${url}/search/?displayname=johnwheal`);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.data[0].should.equal('displayName is required');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
  });

  it('should return error for query string less than 3', async () => {
    const res = await request.get(`${url}/search/?displayName=jo`);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.data[0].should.equal('displayName length must be at least 3 characters long');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
  });

  it('should return error 404', async () => {
    const res = await request
      .get(`${url}/searchs/?displayName=jo`);
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

    const resq = await chai.request(app).get(`${url1}`);
    questionId = resq.body.data[0]._id;
  });

  it('should return answer object', async () => {
    const res = await request
      .post(`${url1}/${questionId}/answers`)
      .set('Authorization', userToken)
      .send(answerData.answer);
    res.body.should.have.property('message').equal('Answer posted successfully');
    res.body.should.have.property('status').equal(201);
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
  });

  it('should return an error for missing body', async () => {
    const res = await request
      .post(`${url1}/${questionId}/answers`)
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
      .post(`${url1}/${questionId}/answers`)
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
      .post(`${url1}/${questionId}/answers`)
      .set('Authorization', userToken)
      .send(answerData.answerWithLeastBody);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('status').equal(400);
    res.body.should.have.property('data');
    res.body.data[0].should.equal('body length must be at least 3 characters long');
    res.body.should.have.property('success').equal(false);
  });
});
