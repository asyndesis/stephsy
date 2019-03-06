import express from 'express'
import {userController} from '../controllers/user.controller'
import jwt from 'jsonwebtoken';
import tools from '../tools/'

const router = express.Router();


// route middleware to verify a token
router.use(function(req, res, next) {
  /* Non-protected routes. This is hacky. I know */
  if (req.originalUrl == '/api/register' || req.originalUrl == '/api/login'){
    return next();
  }
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.jwtSecret, function(err, decoded) {
      if (err) {
        tools.burp('FgCyan','webserver','User has invalid token.','routes' )
        return res.status(403).send({ 
          message: 'Invalid token.' 
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    tools.burp('FgCyan','webserver','User did not provide token.','routes' )
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});

router.post('/login',userController.login)
router.post('/register',userController.register)
router.get('/profile',userController.profile)

export {router}