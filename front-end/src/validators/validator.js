import rules from "./rules";
import regex from './regex'
const validator = (value, validations) => {

  let validationResults = [];

  for (const validator of validations) {
    if (validator.value === rules.requiredValue) {
      !value.trim().length && validationResults.push(false);
    }
    if (validator.value === rules.minValue) {
      value.trim().length < validator.min && validationResults.push(false);
    }
    if (validator.value === rules.maxValue) {
      value.trim().length > validator.max && validationResults.push(false);
    }
    if (validator.value === rules.emailValue) {
      !regex.testEmail(value) && validationResults.push(false);
    }
    if(validator.value === rules.phoneValue){
      !regex.testPhoneNumber(value) && validationResults.push(false);

    }
  }

  return validationResults.length ? false : true
};

export default validator;
