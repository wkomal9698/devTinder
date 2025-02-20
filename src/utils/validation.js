const validator = require("validator")

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName) {
        throw new Error("Name is not valid!")
    }

    if(firstName.length < 4 || firstName.length > 50) {
        throw new Error("First Name should be 4-50 characters!")
    }

    if(!validator.isEmail(emailId)) {
        throw new Error("Email ID is not valid!")
    }

    // if(!validator.isStrongPassword(password)) {
    //     throw new Error("Please enter a strong password!")
    // }

}

const validateEmail = (emailId) => {
    if(!validator.isEmail(emailId)) {
        throw new Error("Email ID is not valid!")
    }
}

const validateEditProfileData = (req) => {
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];
    const isEditAllowed = Object.keys(req.body).every((field) => ALLOWED_UPDATES.includes(field));
    return isEditAllowed;
}

module.exports ={
    validateSignUpData,
    validateEmail,
    validateEditProfileData
}