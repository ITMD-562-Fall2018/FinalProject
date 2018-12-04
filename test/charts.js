process.env.NODE_ENV = "test";

const assert = require("chai").assert;
var chai = require("chai");
let chaiHttp = require("chai-http");
var app = require("../server.js");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

/* Charts page test
describe("/api/charts", () => {
  it("Return status 200 OK", done => {
    chai
      .request(app)
      .get("/api/charts")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

*/