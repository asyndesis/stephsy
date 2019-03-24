import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../../_validators/password.validator';
import validationMessages from '../../../_validators/validation.messages';
import { User } from 'src/app/_models';
import { ToastController } from '@ionic/angular';
import crypto from '../../../_tools/md5';
import { first } from 'rxjs/operators';

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
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.profilePicture = "https://www.gravatar.com/avatar/" + crypto.md5((this.currentUser.email || '').toLowerCase(), false, false);

    this.profileForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.email,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
      ])),
    },{
      /* Extra options */
      validator: PasswordValidator.notEqual
    });

    this.userService
    .getCurrentUser()
    .pipe(first())
    .subscribe(
      async data => {
        const toast = await this.toastController.create({
          message: 'Check your email.',
          duration: 5000,
          showCloseButton: true,
          color: 'success',
          closeButtonText: 'Okay!'
        });
        toast.present();
      },
      async error => {
        const toast = await this.toastController.create({
          color:'danger',
          message: error,
          duration: 5000,
          showCloseButton: true,
          closeButtonText: 'Okay!'
        });
        toast.present();
      }
    );


  }

}
