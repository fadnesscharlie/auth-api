'use strict';

module.exports = (users) => (req, res, next) => {
  // req.headers.authorization -> "Bearer gfgffgfg.gfgfgfgfgfgf.fgfgfgfgfg";

  if(!req.headers.authorization) { next('Invalid Login'); return; }

  let token = req.headers.authorization.split(' ').pop();

  users.authenticateToken(token)
    .then(validUser => {
      req.user = validUser;
      next();
    })
    .catch((err) => {
      res.status(403).send('invalid login')
      next("Invalid Login")
    });
}
