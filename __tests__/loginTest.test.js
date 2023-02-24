const dotenv = require("dotenv");
dotenv.config();

const request = require("supertest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const mongoose = require("mongoose");
const app = require("../app");

const { User } = require("../models");
const { SECRET_KEY, DB_HOST } = process.env;

describe("testing user login controller", () => {
  beforeAll(async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_HOST);
    const newUser = new User(mockUser);
    await newUser.save();
  });

  afterAll(async () => {
    await User.deleteMany({ email: /test@mail.com/ });
    await mongoose.disconnect();
  });

  function reqLogin(email, password) {
    return request(app).post("/api/users/login").send({ email, password });
  }

  const id = new mongoose.Types.ObjectId();
  const testEmail = "test@mail.com";
  const testPassword = "test";

  const mockUser = {
    _id: id,
    email: testEmail,
    subscription: "starter",
    token: jwt.sign({ _id: id }, SECRET_KEY),
    password: bcrypt.hashSync(testPassword, bcrypt.genSaltSync(10)),
    avatarURL: gravatar.url(testEmail),
  };

  test("response has 200 status code", async () => {
    const response = await reqLogin(testEmail, testPassword);

    expect(response.statusCode).toBe(200);
  });

  test("response has a token", async () => {
    const response = await reqLogin(testEmail, testPassword);
    const { token } = response.body;

    expect(token).not.toBeNull();
  });

  test("response has an object `user` with 2 fields (email and subscription) that have type String", async () => {
    const response = await reqLogin(testEmail, testPassword);

    expect(response.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });

  test("recieved password is wrong", async () => {
    const testPassword = "wrongPassword";
    const response = await reqLogin(testEmail, testPassword);

    expect(response.statusCode).toBe(401);
  });

  test("recieved email is wrong", async () => {
    const testEmail = "wrongEmail@gmail.com";
    const response = await reqLogin(testEmail, testPassword);

    expect(response.statusCode).toBe(401);
  });
});
