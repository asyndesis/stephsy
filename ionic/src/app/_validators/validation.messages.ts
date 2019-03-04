let validationMessages = {
'username': [
    { type: 'required', message: 'Username is required.' },
    { type: 'minlength', message: 'Username must be at least 5 characters long.' },
    { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    { type: 'validUsername', message: 'Your username has already been taken.' }
  ],
  'name': [
    { type: 'required', message: 'Name is required.' }
  ]
};

export default validationMessages;