'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users.js');
// console.log('userModel', userModel)

// const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/basic-auth';

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL

const sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {}

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes)
}
