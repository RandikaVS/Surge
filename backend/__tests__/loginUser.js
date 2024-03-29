const expect = require("chai").expect;
const request = require("request");
const URL = "http://localhost:5000/api/user";

describe("User API", () => {
  describe("Login User", () => {
    describe("Login user validation ERROR", () => {
      describe("Login  user validate email", () => {
        const payload = {
          email: "",
          password: "123",
        };

        it("Status", (done) => {
          request.post(
            `${URL}/login`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.statusCode).to.equal(400);
              done();
            }
          );
        });

        it("Message", (done) => {
          request.post(
            `${URL}/login`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.body.message).to.equal("Invalid Email");
              done();
            }
          );
        });
      });

      describe("User enter incorrect password", () => {
        const payload = {
          email: "sahan@gmail.com",
          password: "sahan1111",
        };

        it("Status", (done) => {
          request.post(
            `${URL}/login`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.statusCode).to.equal(400);
              done();
            }
          );
        });

        it("Message", (done) => {
          request.post(
            `${URL}/login`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.body.message).to.equal("Incorrect Password ");
              done();
            }
          );
        });
      });
      describe("User Loged in Successfully", () => {
        const payload = {
          email: "sahan@gmail.com",
          password: "123",
        };

        it("Status", (done) => {
          request.post(
            `${URL}/login`,
            {
              json: payload,
            },
            (_, response) => {
              expect(response.statusCode).to.equal(200);
              done();
            }
          );
        });
      });
    });
  });
});
