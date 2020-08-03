export default function validateSignup(values) {
  let errors = {};
  // Validate username
  if (!values.name) {
    errors.name = "You have to enter your name";
  }
  // Validate lastname
  if (!values.surname) {
    errors.surname = "You have to enter your surname";
  }

  // validate email
  if (!values.email) {
    errors.email = "You have to register an email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }

  // validate password
  if (!values.password) {
    errors.password = "You have to choose a password";
  } else if (values.password.length < 6) {
    errors.password = "Password minimum length: 6 characters";
  }


  return errors;
}
