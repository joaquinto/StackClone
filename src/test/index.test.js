import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

app.listen(3000);

chai.should();
chai.use(chaiHttp);

describe('FIRST TEST', () => {
  it('should return status 200', async () => {
    const res = await chai.request(app).get('/');
    res.body.should.have.property('message').equal('Welcome to stackoverflow');
  });

  it('should return status 404', async () => {
    const res = await chai.request(app).get('/hello');
    res.body.should.have.property('success').equal(false);
    res.body.should.have.property('message').equal('Page not found');
    res.body.should.have.property('status').equal(404);
  });
});
