export default function validate(values) {
    let errors = {};
    if(!values.name){
      errors.name='The field must be filled in';     
    }    
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be 6 or more characters';
    }
    if(!values.confirm){
      errors.confirm='The field must be filled in';     
    }
    else if(values.confirm!==values.password){
      errors.confirm="password and confirm fields must be the same"
    }
    if(!values.role){
      errors.role='The button must be checked';     
    }
    return errors;
  };