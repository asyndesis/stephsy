import { FormGroup, AbstractControl } from '@angular/forms';

export class PasswordValidator {
	static notEqual(control: AbstractControl) {
		 let password = control.get('password').value;

		 let confirmPassword = control.get('confirmPassword').value;

			if(password !== confirmPassword) {
					control.get('confirmPassword').setErrors( {notEqual: true} );
			} else {
					return null
			}
	}
}