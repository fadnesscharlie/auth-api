'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// We need this secret to "sign" we create with the DataType.Virutal attribute
// Then we verify with the validate method

const SECRET = 'secretSauce'

const userModel = (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull : false,
      unqiue: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        // getter, takes in information, you can strip it, then return back just what you want, think of credicard numbers, only want to return back the last 4 digits
        // Creates token

        // #### TESTING THIS BY BREAKING IT
        // return jwt.sign(this.username, SECRET)
        return jwt.sign({ username: this.username}, SECRET)
      },
      // set(TokenObj) {
      //   let token = jwt.sign(TokenObj, SECRET);
      //   return token;
      // }
    },
  });

  users.beforeCreate(async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 5);
    user.password = hashedPassword;
  })

  users.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username }})
    console.log('user token', user)
    const valid = await bcrypt.compare(password, user.password)
    // returns token in user?
    if(valid) { return user; }
    throw new Error(e.message)
  }

  users.authenticateToken = async function (token) {
    try {
      // verify token
      // create user
      // check if user is good -> return user
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ username: parsedToken.username })
      // user has username and
      if (user) { return user; }
      throw new Error('User Not Found');
    } catch (err) {
      throw new Error(err.message)
    }
  }
  return users;
}

module.exports = userModel;
