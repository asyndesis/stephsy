import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import tools from '../tools'

let userModel = new mongoose.Schema({
  nick: {
    type: String,
    required: [true,'Nick name can\'t be empty'],
    unique: true
  },
  email: {
    type: String,
    required: [true,'Email can\'t be empty'],
    validate: {
      validator: function(v) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(v).toLowerCase())
      },
      message: props => `Must be valid email.`
    },
    unique: true
  },
  password: {
    type: String,
    validate: {
      validator: function(v) {
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        return re.test(String(v))
      },
      message: props => `Password must contain at least 1 lowercase letter, 1 uppercase letter, mone number, one special character and be eight characters or longer.`
    },
  },
  saltSecret: String
});

/* Middleware */
userModel.pre('save',function(next) {
  bcrypt.genSalt(10,(err,salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});
userModel.post('save', function(err, payload, next) {
  if (err){
    tools.burp('FgCyan','mongoose','Error creating new user','models.user')
  }
  next()
});
userModel.post('validate', function(err, payload, next) {
  if (err){
    tools.burp('FgCyan','mongoose','Error validating new user','models.user')
  }
  next()
});

export default userModel
