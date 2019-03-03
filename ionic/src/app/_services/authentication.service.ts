import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage, private plt: Platform) { }

  login(){
    return this.storage.set(TOKEN_KEY,'Bearer 123567').then(res => {
      this.authenticationState.next(true);
    });
  }

  logout(){
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }

  checkToken(){

  }
}
