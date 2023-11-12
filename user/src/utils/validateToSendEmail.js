import validator from "validator";

function validateToSendEmail(value) {
    let valid = true;
      if( !value || validator.isEmpty(value.trim())){
        valid = false;
      }
      else if(!validator.isEmail(value.trim())){
        valid = false;
      } 
    return valid;
}

export default validateToSendEmail;