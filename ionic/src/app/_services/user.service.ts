import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getUsers() {
      return this.http.get<User>(`http://localhost:3000/api/admin/getUsers`);
    }

    getCurrentUser(){
      return this.http.get<User>(`http://localhost:3000/api/getCurrentUser`);
    }

    updateCurrentUser(user: User){
      return this.http.post<User>(`http://localhost:3000/api/updateCurrentUser`, user);
    }

    register(user: User){
      return this.http.post<User>(`http://localhost:3000/api/register`, user);
    }
} 