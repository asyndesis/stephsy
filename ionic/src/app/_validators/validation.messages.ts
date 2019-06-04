let validationMessages = {
'username': [
    { type: 'required', message: 'is required.' },
    { type: 'minlength', message: 'must be at least 5 characters long.' },
    { type: 'maxlength', message: 'cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'must contain only numbers and letters.' },
    { type: 'validUsername', message: 'has already been taken.' }
  ],
  'email': [
    { type: 'required', message: 'is required.' },
    { type: 'email',message:'must be valid.'}
  ],
  'password': [
    { type: 'minlength', message: 'must be at least 8 characters long.' },
    { type: 'maxlength', message: 'cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'needs 1 lowercase letter, 1 capital letter, 1 number, and 1 special character.' },
    { type: 'required', message: 'is required.' },
    { type: 'notEqual', message: '\'s must match.'}
  ],
  'confirmPassword': [
    { type: 'minlength', message: 'must be at least 8 characters long.' },
    { type: 'maxlength', message: 'cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'needs 1 lowercase letter, 1 capital letter, 1 number, and 1 special character.' },
    { type: 'required', message: 'is required.' },
    { type: 'notEqual', message: '\'s must match.'}
  ]
};

export default validationMessages;