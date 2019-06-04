import mongoose from 'mongoose';
import tools from '../tools';
import uuid from 'node-uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const User = mongoose.model('User');
let adminController = {};

adminController = {

  /* Auth Protected Endponts */
  getUsers: (req, res, next) => {    
    User.find({}).then((payload) => {
      tools.burp('FgCyan','webserver','Admin user list requested','controllers.admin' )
      res.status('201').send(payload);
    }).catch((error) => { 
      tools.burp('FgCyan','webserver','Token not found.','controllers.admin' )
      res.status('400').send({message: 'Could not get users list.'});
    });
  },
}


export {adminController}