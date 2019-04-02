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
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.profilePicture = "https://www.gravatar.com/avatar/" + crypto.md5((this.currentUser.email || '').toLowerCase(), false, false);

    this.profileForm = this.formBuilder.group({
      username: new FormControl({value: ''}, Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
      ])),
      email: new FormControl({value: '', disabled: true}, Validators.compose([
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
      password: this.f.password.value,
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
