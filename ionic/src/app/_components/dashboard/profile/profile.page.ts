import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../../_validators/password.validator';
import validationMessages from '../../../_validators/validation.messages';
import { User } from 'src/app/_models';
import { ToastController } from '@ionic/angular';
import crypto from '../../../_tools/md5';
import zodiac from '../../../_tools/zodiac';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profilePicture:string = "https://www.gravatar.com/avatar/";
  profileBirthday:string = '';
  currentUser:User;
  newUser: User;
  loading = false;
  submitted = false;
  profileForm: FormGroup;
  validation_messages = validationMessages;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.profilePicture = "https://www.gravatar.com/avatar/" + crypto.md5((this.currentUser.email || '').toLowerCase(), false, false);
    this.profileBirthday = '';

    this.profileForm = this.formBuilder.group({
      username: new FormControl({value: ''}, Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
      ])),
      email: new FormControl({value: '', disabled: true}, Validators.compose([
        Validators.email,
      ])),
      birthday: new FormControl({value: ''}, Validators.compose([

      ])),
    },{
      /* Extra options */
    });

    this.pumpForm();
  }
  // convenience getter for easy access to form fields
  get f() { 
    return this.profileForm.controls;
  }
  /* pump from server.getCurrentUser */
  pumpForm(){
    this.userService
        .getCurrentUser()
        .pipe(first())
        .subscribe(
      async data => {
        this.profileForm.reset();
        this.currentUser = data;
        this.f.username.setValue(this.currentUser.username);
        this.f.email.setValue(this.currentUser.email);
        this.f.birthday.setValue(this.currentUser.birthday);
        this.birthdayChanged();
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
  // gravatar
  emailChanged(){
    this.profilePicture = "https://www.gravatar.com/avatar/" + crypto.md5((this.f.email.value || '').toLowerCase(), false, false);
  }
  birthdayChanged(){
    if (this.f.birthday.value){
      let birthday = this.f.birthday.value;
      let month = birthday.substring(5,7);
      let day = birthday.substring(8,10);
      this.profileBirthday = zodiac.getSign(day,month)['symbol'];
    }
  }
  // send off
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      console.log('[form] invalid');
        return;
    }
    this.loading = true;
    this.newUser = {
      username: this.f.username.value, 
      birthday: this.f.birthday.value,
      email: this.f.email.value
    };
    this.userService
    .updateCurrentUser(this.newUser)
    .pipe(first())
    .subscribe(
      async data => {
        this.loading = false;
        this.pumpForm();
        const toast = await this.toastController.create({
          message: 'Profile updated.',
          duration: 5000,
          showCloseButton: true,
          color: 'success',
          closeButtonText: 'Okay!'
        });
        toast.present();
      },
      async error => {
        this.loading = false;
        this.pumpForm();
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
