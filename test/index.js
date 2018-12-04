process.env.NODE_ENV = "test";

const assert = require("chai").assert;
var chai = require("chai");
let chaiHttp = require("chai-http");
var app = require("../server.js");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

before(done => {
  let user = {
    _id: {
      $oid: "5c06cbc1f8384a1b2cf6e4ac"
    },
    Name: "testing",
    Email: "testing@gmail.com",
    Password: "$2a$10$IbQYdkILs45D1VFM4hh42Ok0uGMiiuqGbrrxo0UyWrYbLCjkUBZIO",
    date: {
      $date: "2018-12-04T18:47:29.451Z"
    },
    __v: 0
  };
  global.user = user;
  done();
});

after(async () => {
  app.stop();
});

describe("/", () => {
  it("Return status 200 OK", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
