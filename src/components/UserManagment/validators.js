import { userErrors } from '../../enums/userErrors.enum';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validNumber = RegExp(/^[0-9\b]+$/);

export const isEmailValid = username => {
  return validEmailRegex.test(username);
};

export const isPasswordValid = (password, repeatPassword) => {
  return password !== '' && repeatPassword !== '' && password === repeatPassword;
};

export const isPasswordLongEnough = password => {
  return password.length >= 6;
};

export const isValidPhone = value => {
  return value == '' || validNumber.test(value);
};

export const validateRequiredFields = (formData, requiredFields) => {
  const required = {};
  requiredFields.forEach(field => {
    if (formData[field] === '') {
      required[field] = userErrors.REQUIRED_ERROR;
    }
  });
  return required;
};
