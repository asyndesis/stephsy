import mongoose from 'mongoose';
import tools from '../tools';
import uuid from 'node-uuid';

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
      res.send(error);
      next()
    });
  },
  login: (req, res, next) => {
    User.find({user: req.body.username}).then((payload) => {
      if(!payload /*|| res.body.password != 'todo'*/) {
        res.sendStatus(401);
        next()
      }else{
        res.send({
          username: payload.username,
          token: jwt.sign({userID: payload.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'})
        });

        tools.burp('FgCyan','webserver','Auth token supplied to \''+payload.username+'\'','controllers.user' )
      }
    }).catch((error) => { 
      tools.burp('FgCyan','webserver','User could not log in.','controllers.user' )
      res.send(error);
      next()
    });
  }
}


export {userController}