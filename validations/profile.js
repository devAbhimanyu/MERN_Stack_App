const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    //data.status = !isEmpty(data.status) ? data.status : '';
    //data.status = !isEmpty(data.status) ? data.status : '';
    if (!validator.isLength(data.handle, { min: 6, max: 40 })) {
        errors.handle = 'Handle need to be betweeen 6 and 40 characters';
    }
    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }
    if (validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }
    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Website URL is of incorrect format';
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'youtube URL is of incorrect format';
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'twitter URL is of incorrect format';
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'facebook URL is of incorrect format';
        }
    }
    if (!isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'linkedin URL is of incorrect format';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'instagram URL is of incorrect format';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}