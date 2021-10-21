"use strict";

const express = require("express");
const authRouter = express.Router();

const { users } = require("./models/index.js");

// Auth
const basicAuth = require("./middleware/basic.js");
const bearerAuth = require("./middleware/bearer.js");
const acl = require("./middleware/acl.js");

const dataModules = require("../auth/models/index.js");


authRouter.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

authRouter.get('/:model', basicAuth(users), acl("read"), handleGetAll);
authRouter.get('/:model/:id', basicAuth(users), acl("read"), handleGetOne);
authRouter.post('/:model', bearerAuth(users), acl("create"), handleCreate);
authRouter.put('/:model/:id', bearerAuth(users), acl("update"), handleUpdate);
authRouter.delete('/:model/:id', bearerAuth(users), acl("delete"), handleDelete);

async function handleGetAll(req, res) {
  try {
    let food = await req.model.read();
    res.status(200).json(food);
  } catch (e) {
    res.status(404).send("Could not get data");
  }
}

async function handleGetOne(req, res) {
  try {
    let id = req.params.id;
    let food = await req.model.read(id);
    res.status(200).json(food);
  } catch (e) {
    res.status(404).send("Could not get one data");
  }
}

async function handleCreate(req, res) {
  try {
    const obj = req.body;
    let food = await req.model.create(obj);
    res.status(200).json(food);
  } catch (e) {
    res.status(404).send("Could not create");
  }
}

async function handleUpdate(req, res) {
  try {
    let id = req.params.id;
    const obj = req.body;
    let food = await req.model.update(id, obj);
    res.status(200).json(food);
  } catch (e) {
    res.status(404).send("Could not Update");
  }
}

async function handleDelete(req, res) {
  try {
    let id = req.params.id;
    let food = await req.model.delete(id);
    res.status(200).json(food);
  } catch (e) {
    res.status(404).send("Could not Delete");
  }
}

module.exports = authRouter;

/* 
User1 -> { "username":"Krissy", "password": "BestGurl", "role": "admin"}
  - Basic a3Jpc3N5OkJlc3RHdXJs
  - Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtyaXNzeSIsImlhdCI6MTYzNDc4MzA2N30.4ZbK1LFWW4Fr0LjLQX-eU3MrQ_MyBJU2RUJLhVG6_qQ

  { "username": "Billy", "password": "Bob" }
  - Basic QmlsbHk6Qm9i
  - Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJpbGx5IiwiaWF0IjoxNjM0NDMwNjUyfQ.ODjmQyIuDBO0K3m7HXw3U4HDP2wpZ_a6I2Pv74kculs

  { "username":"cakeViewer", "password": "cake", "role": "user" }
    - Basic
    - Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNha2VWaWV3ZXIiLCJpYXQiOjE2MzQ3ODY3NTh9.yQwkPGu5d_ivatcWACGsedIgTVnA1FOPmPLLsfXQKR8

*/
