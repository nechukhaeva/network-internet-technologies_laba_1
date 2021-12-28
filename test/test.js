process.env.NODE_ENV = 'test'

let db = require('../db')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)


describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
          .get('/users')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.users.should.be.a('array');
            done();
          });
    });
});

describe('/POST user', () => {
  it('it should POST a user', (done) => {
    let user = {
      login: "lodin2",
      email: "e2@mail.ru",
      password: "password2"
    }
    chai.request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.user.should.be.a('object');
            res.body.should.have.property('msg').eql('ok');
            res.body.user.should.have.property('login');
            res.body.user.should.have.property('email');
            res.body.user.should.have.property('password');
          done();
        });
  });

  it('it should not POST a user without password field', (done) => {
    let user = {
      login: "lodin2",
      email: "e2@mail.ru",
    }
    chai.request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.success.should.equal(false);
          done();
        });
  });
});


describe('/GET user', () => {
  it('it should GET the user by login', (done) => {
    chai.request(server)
        .get('/user')
        .query({login: "lodin"})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.user.should.be.a('object');
            res.body.should.have.property('msg').eql('ok');
            res.body.user.should.have.property('login');
            res.body.user.should.have.property('email');
            res.body.user.should.have.property('password');
          done();
        });
  });
});