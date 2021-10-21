'use strict';

// 3rd party resouces
const express = require('express');
const morgan = require('morgan');

// Error Handlers/routes
const errorHandlers = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRouter = require('./auth/routes.js');
const authRouterV2 = require('./auth/v2Routes.js');
const authRouterV1 = require('./auth/v1Routes.js');

// Express App
const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.get('/', (req, res) => {
  res.status(200).send('Its ALIVE')
})
app.use(authRouter);
app.use('/api/v1', authRouterV1);
app.use('/api/v2', authRouterV2);

// CatchAlls
app.use('*', notFound);
app.use(errorHandlers);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port')}
    app.listen(port, () => console.log(`Listening on ${port}`))
  }
}
