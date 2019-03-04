let validationMessages = {
'username': [
    { type: 'required', message: 'Username is required.' },
    { type: 'minlength', message: 'Username must be at least 5 characters long.' },
    { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    { type: 'validUsername', message: 'Your username has already been taken.' }
  ],
  'email': [
    { type: 'required', message: 'Email is required.' },
    { type: 'email',message:'Please use a valid email.'}
  ],
  'password': [
    { type: 'minlength', message: 'Password must be at least 8 characters long.' },
    { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'Password needs at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.' },
    { type: 'required', message: 'Password is required.' },
    { type: 'areEqual', message: 'Passwords must match.'}
  ],
  'confirmPassword': [
    { type: 'minlength', message: 'Password must be at least 8 characters long.' },
    { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'Password needs at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.' },
    { type: 'required', message: 'Password is required.' },
    { type: 'areEqual', message: 'Passwords must match.'}
  ]
};

export default validationMessages;