/* eslint-disable */
const mongoose = require("mongoose");
const request = require("suoertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_TEST_HOST, PORT } = process.env;

describe("test auth rotes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach(() => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login ruote", async () => {
    const newUser = {
      email: "bogdan@gmail.com",
      password: "123456",
    };

    const user = await User.create(newUser);

    // 1. Проверить правильность получаемого ответа
    // на AJAX-запрос документации
    // 2. Проверить что в базу записался нужный элемент

    const response = await request(app).post("/api/auth/login").send(newUser);
    expest(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
