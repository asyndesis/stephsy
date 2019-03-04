import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login(){
    this.authService.login();
  }

}
