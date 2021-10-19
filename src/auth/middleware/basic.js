"use strict";

const base64 = require('base-64');

module.exports = (users) => (req, res, next) => {
  // req.headers.auth -> decode

  // console.log('basic - header-auth',req.headers.authorization)
  if (!req.headers.authorization) {
    next("Invalid Login");
    return;
  }

  let basic = req.headers.authorization.split(' ').pop();

  // console.log(base64)
  // console.log('basic',basic)
  // console.log("decode", base64.decode(basic));


  let [user, pass] = base64.decode(basic).split(':');

  users
    .authenticateBasic(user, pass)
    .then((validUser) => {
      req.user = validUser;
      next();
    })
    .catch((err) => {
      res.status(403).send('invalid login')
      next("Invalid Login")
    });
};
