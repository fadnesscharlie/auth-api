'use strict';

require('dotenv').config();
const PORT = process.env.PORT ? process.env.PORT : 3000

// Start up on DB server
const { db } = require('./src/auth/models/index.js');
const server = require('./src/server.js');

db.sync()
  .then(() => {
    server.start(PORT)
  })
  .catch(console.error)
