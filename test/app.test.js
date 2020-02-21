const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const {
  expect
} = chai;
chai.use(chaiHttp);
describe("/GET all accounts", () => {
  it("it should get all the accounts", done => {
    chai
      .request("http://localhost:3000")
      .get("/accounts")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/GET a transaction by Id", () => {
  it("it should get a specific transaction by id", done => {
    chai
      .request("http://localhost:3000")
      .get("/transactions/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/GET all transactions of a specific account", () => {
  it("it should get all transactions of an account", done => {
    chai
      .request("http://localhost:3000")
      .get("/accounts/23232322/transactions")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/GET all accounts of a specific user", () => {
  it("it should get all accounts of a specific user", done => {
    chai
      .request("http://localhost:3000")
      .get("/users/kk@gmail.com/accounts")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/POST Signin ", () => {
  it("it should signIn the user", done => {
    chai
      .request("http://localhost:3000")
      .post("/auth/signin")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 'cena',
        password: '123456'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("/POST SignUp ", () => {
  it("it should signUp the user", done => {
    chai
      .request("http://localhost:3000")
      .post("/auth/signup")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        fname: "Test",
        lname: "User",
        email: "user@test.fr",
        username: "userTest",
        password: "123456",
        isadmin: "false",
        role: 3
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});