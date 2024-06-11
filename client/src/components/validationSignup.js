const validate = (values) => {
  const errors = {};

  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  // Password validation
  if (!values.createPassword) {
    errors.createPassword = 'Create password is required';
  } else if (values.createPassword.length < 6) {
    errors.createPassword = 'Password should be at least 6 characters long';
  }
  // Confirm Password validation
  if (!values.password) {
    errors.password = 'Confirm password is required';
  } else if (values.password !== values.createPassword) {
    errors.password = 'Passwords do not match';
  }

  return errors;
};

export default validate;
