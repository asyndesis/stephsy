import mongoose from 'mongoose';
import tools from '../tools';

const User = mongoose.model('User');
const userController = {};

userController.register = (req, res, next) =>{
  var user = new User();

  user.nick = req.body.nick;
  user.email = req.body.email;
  user.password = req.body.password;
  
  user.save().then((payload) => {
    tools.burp('FgCyan','webserver','A new user with nick \''+payload.nick+'\' has been created','controllers.user' )
    res.send(payload);
    next()
  }).catch((error) => { 
    tools.burp('FgCyan','webserver','User could not be created.','controllers.user' )
    res.send(error);
    next()
  });
}

export {userController}