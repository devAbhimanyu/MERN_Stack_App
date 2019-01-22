const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Email format is incorrect';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field are required';
    }
    if (validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Password fields are required';
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be more than 6 characters long';
    }
    if (!validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Password fields should match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}