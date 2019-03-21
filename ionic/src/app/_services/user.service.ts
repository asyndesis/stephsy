import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get<User[]>(`/users`);
    }

    getCurrentUser(){
      return this.http.get<User>(`/api/getCurrentUser`);
    }

    register(user: User){
      return this.http.post<User>(`/api/register`, user);
    }
} 