"use strict";

const express = require("express");
const authRouter = express.Router();

const { users } = require("./models/index.js");

// Auth
// const User = require('./auth/models/users.js');
const basicAuth = require("./middleware/basic.js");
const bearerAuth = require("./middleware/bearer.js");

authRouter.post("/register", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      userToken: userRecord.token,
    };
    res.status(201).json(output);
  } catch (err) {
    next(err.message);
  }
});

authRouter.post("/signin", basicAuth(users), (req, res) => {
  try {
    const user = {
      user: req.user,
      // token: req.token
      token: req.user.token,
    };

    // if not token or user, create error code
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send(err);
  }
});

authRouter.get("/users", bearerAuth(users), async (req, res, next) => {
  const allUsers = await users.findAll({});
  // if !users, create a error code
  const list = allUsers.map((user) => user.username);
  res.status(200).json(list);
});

authRouter.get("/secret", bearerAuth(users), async (req, res, next) => {
  res.status(200).send("Welcome to the super special STUFF!");
});

module.exports = authRouter;
