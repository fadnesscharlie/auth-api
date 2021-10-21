'use strict';

// Want access to something

module.exports = (capability) => {
  // middleware code runs
  return ( req, res, next) => {
    // we have access to the parameter capabilities
    // We are expecting bearerAuth middleware to have put the correct user object in our request
    // Inspect the users capabilities
      // If good, pass next()
    // Using try/catch to avoid deeply checking the object 
    // We wanna handle rejections and errors
    try {
      console.log('capabilites', req.user.capabilities)
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next('Access Denied');
      }
      
    } catch (err) {
      next(`Invalid login with : ${err.message}`)
    }
  }
}
