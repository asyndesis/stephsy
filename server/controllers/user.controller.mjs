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
    user.role = ['user'];
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    
    user.save().then((payload) => {
      tools.burp('FgCyan','webserver','A new user with email \''+payload.email+'\' has been created','controllers.user' )
      res.status('201').send(payload);
      next();
    }).catch((error) => { 
      tools.burp('FgCyan','webserver','User could not be created.','controllers.user' )
      res.status('400').send({message: 'User could not be created.'});
      next();
    });
  },

  login: (req, res, next) => {
    User.findOne({email: req.body.email}).then((payload) => {
      if(!payload) {
        tools.burp('FgCyan','webserver','Email does not exist: '+payload.email+'.','controllers.user' )
        res.status('400').send({message: 'Invalid credentials.'});
        next();
      }else{
        bcrypt.compare(req.body.password, payload.password, function(err, bres) {
          if(bres) {
            // Passwords match
            tools.burp('FgCyan','webserver','Auth token supplied to \''+payload.email+'\'','controllers.user' )
            res.send({
              email: payload.email,
              token: jwt.sign({userID: payload.id}, process.env.jwtSecret, {expiresIn: '2h'})
            });
          } else {
           // Passwords don't match
           tools.burp('FgCyan','webserver','Invalid password for email: '+payload.email+'.','controllers.user' )
           res.status('400').send({message: 'Invalid credentials.'});
          } 
        });
        
      }
    }).catch((error) => { 
      tools.burp('FgCyan','webserver','Email not found.','controllers.user' )
      res.status('400').send({message: 'Invalid credentials.'});
      next();
    });
  },

  editUser: (req, res, next) => {
    let currentUserId = req.userID;
    

    res.send();
  }
}


export {userController}