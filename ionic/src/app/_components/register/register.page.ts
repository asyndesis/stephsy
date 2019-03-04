import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../_validators/password.validator';
import { UsernameValidator } from '../../_validators/username.validator';
import validationMessages from '../../_validators/validation.messages';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  validation_messages = validationMessages;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.pattern('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/'),
        Validators.required
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(8),
        Validators.pattern('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/'),
        Validators.required
      ])),
    }, (formGroup: FormGroup) => {
      /* after validation? */
      return PasswordValidator.areEqual(formGroup);
    });
  }

  ngOnInit() {
  }

}
