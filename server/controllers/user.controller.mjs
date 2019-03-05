import mongoose from 'mongoose';
import tools from '../tools';
import uuid from 'node-uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const User = mongoose.model('User');
let userController = {};

userController = {
  register: (req, res, next) => {
    var user = new User();
  
    user.id = uuid.v1();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    
    user.save().then((payload) => {
      tools.burp('FgCyan','webserver','A new user with username \''+payload.username+'\' has been created','controllers.user' )
      res.send(payload);
      next()
    }).catch((error) => { 
      tools.burp('FgCyan','webserver','User could not be created.','controllers.user' )
      res.status('400').send(error);
      next()
    });
  },
  login: (req, res, next) => {
    User.findOne({username: req.body.username}).then((payload) => {
      if(!payload) {
        // if username does not exist
        console.log('arf');
        res.sendStatus('400');
        next()
      }else{
        bcrypt.compare(req.body.password, payload.password, function(err, bres) {
          if(bres) {
            // Passwords match
            tools.burp('FgCyan','webserver','Auth token supplied to \''+payload.username+'\'','controllers.user' )
            res.send({
              username: payload.username,
              token: jwt.sign({userID: payload.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'})
            });
          } else {
           // Passwords don't match
           tools.burp('FgCyan','webserver','Invalid password for user: '+payload.username+'.','controllers.user' )
           res.sendStatus('400');
          } 
        });
        
      }
    }).catch((error) => { 
      tools.burp('FgCyan','webserver','User could not log in.','controllers.user' )
      res.sendStatus('400');
      next()
    });
  }
}


export {userController}