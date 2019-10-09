import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import userData from './testData/userData';

app.listen(3001);

chai.should();
chai.use(chaiHttp);

const url = '/api/v1/auth';

describe('USER SIGNUP', () => {
  let request;
  before(async () => {
    const res = await chai.request(app)
      .post(`${url}/signup`)
      .send({
        displayName: 'johnwheal1',
        email: 'johnwheal1@gmail.com',
        password: 'johnwheal1',
      });
  })
  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should return user object', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.signUpData);
    res.body.should.have.property('message').equal('User created successfully');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
    res.body.should.have.property('status').equal(201);
  });

  it('should return error for existing user', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send({
        displayName: 'johnwheal1',
        email: 'johnwheal1@gmail.com',
        password: 'johnwheal1',
      });
    res.body.should.have.property('message').equal('User already exist');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(409);
  });

  it('should return error for missingDisplayName', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.missingDisplayName);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('displayName is required');
  });

  it('should return error for emptyDisplayName', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.emptyDisplayName);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('displayName is not allowed to be empty');
    res.body.data[1].should.equal('displayName length must be at least 3 characters long');
  });

  it('should return error for invalidDisplayName', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.invalidDisplayName);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('displayName length must be at least 3 characters long');
  });

  it('should return error for missingEmail', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.missingEmail);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('email is required');
  });

  it('should return error for emptyEmail', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.emptyEmail);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('email is not allowed to be empty');
    res.body.data[1].should.equal('email must be a valid email');
  });

  it('should return error for invalidEmail', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.invalidEmail);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('email must be a valid email');
  });

  it('should return error for missingPassword', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.missingPassword);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('password is required');
  });

  it('should return error for emptyPassword', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.emptyPassword);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('password is not allowed to be empty');
    res.body.data[1].should.equal('password length must be at least 6 characters long');
  });

  it('should return error for invalidPassword', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send(userData.invalidPassword);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('password length must be at least 6 characters long');
  });

  it('should return error for missing inputs', async () => {
    const res = await request
      .post(`${url}/signup`)
      .send();
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('displayName is required');
    res.body.data[1].should.equal('email is required');
    res.body.data[2].should.equal('password is required');
  });

  it('should return status 404', async () => {
    const res = await request
      .post(`${url}/signup/hello`);
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('message').equal('Page not found');
    res.body.should.have.property('status').equal(404);
  });
});

describe('USER SIGNIN', () => {
  let request;
  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should return user object', async () => {
    const res = await request
      .post(`${url}/signin`)
      .send(userData.signIn);
    res.body.should.have.property('message').equal('Logged in successfully');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(true);
    res.body.should.have.property('status').equal(200);
  });

  it('should return error for invalid email', async () => {
    const res = await chai.request(app)
      .post(`${url}/signin`)
      .send(userData.signInWithInvalidEmail);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.data[0].should.equal('email must be a valid email');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
  });

  it('should return error for missing email', async () => {
    const res = await chai.request(app)
      .post(`${url}/signin`)
      .send(userData.signInwithMissingEmail);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('email is required');
  });

  it('should return error for empty email', async () => {
    const res = await chai.request(app)
      .post(`${url}/signin`)
      .send(userData.signInWithEmptyEmail);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('email is not allowed to be empty');
    res.body.data[1].should.equal('email must be a valid email');
  });

  it('should return error for wrong password', async () => {
    const res = await chai.request(app)
      .post(`${url}/signin`)
      .send(userData.signInWithWrongPassword);
    res.body.should.have.property('message').equal('Wrong email or password');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(401);
  });

  it('should return error for empty password', async () => {
    const res = await chai.request(app)
      .post(`${url}/signin`)
      .send(userData.signInWithEmptyPassword);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('password is not allowed to be empty');
    res.body.data[1].should.equal('password length must be at least 6 characters long');
  });

  it('should return error for missing password', async () => {
    const res = await chai.request(app)
      .post(`${url}/signin`)
      .send(userData.signInwithMissingPassword);
    res.body.should.have.property('message').equal('Bad request');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(400);
    res.body.data[0].should.equal('password is required');
  });

  it('should return error for wrong email', async () => {
    const res = await chai.request(app)
      .post(`${url}/signin`)
      .send(userData.signInWithWrongEmail);
    res.body.should.have.property('message').equal('User not found');
    res.body.should.have.property('data');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('status').equal(404);
  });

  it('should return status 404', async () => {
    const res = await chai.request(app).post(`${url}/signin/hello`);
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('message').equal('Page not found');
    res.body.should.have.property('status').equal(404);
  });
});
