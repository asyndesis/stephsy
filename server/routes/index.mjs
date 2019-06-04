import express from 'express'
import {userController} from '../controllers/user.controller'
import jwt from 'jsonwebtoken';
import tools from '../tools/'
import { adminController } from '../controllers/admin.controller';
import mongoose from 'mongoose';

const User = mongoose.model('User');
const router = express.Router();

/* Middleware */
router.use(function(req, res, next) {
  /* Non-protected routes. This is hacky. Not sure where else to put these though */
  if (req.originalUrl == '/api/register' || req.originalUrl == '/api/login' || req.originalUrl == '/api/getUsers'){
    return next();
  }
  // check header or url parameters or post parameters for token
  req.token = tools.revealToken(req);
  // decode token
  if (req.token) {
    // verifies secret and checks exp
    jwt.verify(req.token, process.env.jwtSecret, function(err, decoded) {
      if (err) {
        tools.burp('FgCyan','webserver','User has invalid token.','routes' )
        return res.status(401).send({
          success: false, 
          message: 'Invalid token.' 
        });
      } else {
        // if everything is good, save to request for use in other routes
        //req.decoded = decoded; //this contains some extra info that i might need later for security?
        req.userID = decoded.userID;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    tools.burp('FgCyan','webserver','User did not provide token.','routes' )
    return res.status(401).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});

/* Checks if we are on an admin page and then checks to see if the user is allowed to be there via roles. 
   This should probably be moved to inside the adminController somehow. */
router.use((req, res, next) => {
  /* Check the original url to see if we are on an admin route */
  let purl = req.originalUrl.split('/');
    /* We are on an admin page */
    if (purl[2] == 'admin'){
      User.findOne({token: req.token, id: req.userID}).then((payload) => {
        if (payload.roles.includes("admin")){
          next();
        }else{
          tools.burp('FgCyan','webserver','User is not an admin','routes' )
          return res.status(403).send({ 
              success: false, 
              message: 'Not an admin user.' 
          });
        }
      });
    }else{
      next()
    }
})

/* Routes */
router.post('/login',userController.login)
router.post('/register',userController.register)
router.get('/getCurrentUser',userController.getCurrentUser)
router.post('/updateCurrentUser',userController.updateCurrentUser)
router.get('/admin/getUsers',adminController.getUsers)
export {router}