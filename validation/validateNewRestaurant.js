export default function validateNewRestaurant(values) {
  let errors = {};

  // Validate restaurant's name
  if (!values.name) {
    errors.name = "You have to enter your restaurant's name";
  }

  // validate description
  if (!values.description) {
    errors.description = "Please describe your restaurant";
  }
 
  // validate city
  if (!values.city) {
    errors.city = "Please tell us where is your restaurant";
  }
  // validate street_address
  if (!values.street_address) {
    errors.street_address = "Please insert and address";
  }
  // validate zip_code
  if (!values.zip_code) {
    errors.zip_code = "Example: 6360";
  }
  // validate state
  if (!values.state) {
    errors.state = "Enter the state";
  }

  return errors;
}
