import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../../_validators/password.validator';
import validationMessages from '../../../_validators/validation.messages';
import { User } from 'src/app/_models';
import { ToastController } from '@ionic/angular';
import crypto from '../../../_tools/md5';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profilePicture:string = "https://www.gravatar.com/avatar/";
  currentUser:User;
  profileForm: FormGroup;
  validation_messages = validationMessages;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.profilePicture = "https://www.gravatar.com/avatar/" + crypto.md5((this.currentUser.email || '').toLowerCase(), false, false);
    console.log(this.currentUser);
    this.profileForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        Validators.required
      ])),
    },{
      /* Extra options */
      validator: PasswordValidator.notEqual
    });
  }

}
