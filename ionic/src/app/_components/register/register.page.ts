import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PasswordValidator } from '../../_validators/password.validator';
import { UsernameValidator } from '../../_validators/username.validator';
import validationMessages from '../../_validators/validation.messages';
import { User } from 'src/app/_models';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  newUser: User;
  loading = false;
  submitted = false;
  returnUrl: string;
  validation_messages = validationMessages;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public toastController: ToastController
    ) {}


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
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

    // reset login status
    //this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  back(){
    return this.router.navigate([this.returnUrl]);
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
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
    .register(this.newUser)
    .pipe(first())
    .subscribe(
      async data => {
        this.loading = false;
        this.router.navigate([this.returnUrl]);
        this.registerForm.reset();
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
        this.loading = false;
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
