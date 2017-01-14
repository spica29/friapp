process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/www');
var should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
/*
  * Test the /GET route
  */
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/profile')
            .end((err, res) => {
                res.should.have.status(200);
                (err === null).should.be.true;
              done();
            });
      });
  });

  describe('/GET dogs', () => {
      it('it should GET list of dogs', (done) => {
        chai.request(server)
            .get('/ourdogs')
            .end((err, res) => {
                res.should.have.status(200);
                (err === null).should.be.true;
              done();
            });
      });
  });

  describe('POST user', () => {
  	it('it should POST new user', (done) => {
		var user = {
			username: 'testuser',
			password: 'password',
			email: 'test@test.com'
		}
		chai.request(server)
            .post('/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
              	done();
            });
  	}
  )
  })

  describe('POST user', () => {
    it('it should POST new user', (done) => {
    var user = {
      username: 'user',
      password: '123'
    }
    chai.request(server)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    }
  )
  })

});