import validator from 'validator';

function validateEmail(value){
    let error;
    if( !value || validator.isEmpty(value.trim())){
      error='Please enter an email';
    }
    else if(!validator.isEmail(value.trim())){
      error='Please enter a valid email.';
    } 
    return error;
}

export default validateEmail