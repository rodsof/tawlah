export default function validateNewDish(values) {
    let errors = {};
  
    // Validate restaurant's name
    if (!values.name) {
      errors.name = "You have to enter the dish's name";
    }
  
    // validate ingredients
    if (!values.ingredients) {
      errors.ingredients = "Please describe the dish";
    }
   
     // validate category
     if (!values.category) {
        errors.price = "Select a category";
      }

    // validate price
    if (!values.price) {
      errors.price = "How much?";
    }
   
    return errors;
  }
  