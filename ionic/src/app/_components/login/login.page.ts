import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import validationMessages from '../../_validators/validation.messages';
import { ToastController } from '@ionic/angular';
import crypto from '../../_tools/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  profilePicture: any = "https://www.gravatar.com/avatar/";
  validation_messages = validationMessages;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public toastController: ToastController
    ) {}

  emailChanged(){
    this.profilePicture = "https://www.gravatar.com/avatar/" + crypto.md5((this.f.email.value || '').toLowerCase(), false, false);
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        console.log('[form] invalid');
        return;
    }

    this.loading = true;
    // authentication service handles the login
    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            async data => {
                this.loginForm.reset();
                this.loading = false;
                this.router.navigate(['/dashboard']);
            },
            async (error) => {
              this.loginForm.reset();
              this.loading = false;
              const toast = await this.toastController.create({
                color: 'danger',
                message: error,
                duration: 5000,
                showCloseButton: true,
                closeButtonText: 'Okay!',
              });
              toast.present();
            });
}

}
