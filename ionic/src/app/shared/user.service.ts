import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    nick: '',
    email: '',
    password: ''
  };
  constructor() { }
}
