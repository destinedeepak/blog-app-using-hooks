export default function validate(errors, name, value) {
  switch (name) {
    case 'email':
      let emailError = value.includes('@') ? '' : 'Email does not contain @';
      errors.email = emailError;
      break;
    case 'password':
      let passwordError;
      passwordError =
        value.length < 7 ? 'Password should be at-least 6 characters' : '';
      let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]/;
      if (!re.test(value)) {
        passwordError = 'Password must contain a letter and a number';
      }
      errors.password = passwordError;
      break;
    case 'username':
      let userNameError =
        value.length < 6 ? 'Username should be at-least 6 characters long' : '';
      errors.username = userNameError;
      break;
    default:
      break;
  }
}
