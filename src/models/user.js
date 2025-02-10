const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Please enter a strong password!")
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male","female", "others"].includes(value)) {
                throw new Error("Invalid gender data!")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid photo URL!")
            }
        }
    },
    about: {
        type: String,
        default: "This is the default about of the user!"
    },
    skills: {
        type: [String]
    }
    
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790",{expiresIn: "1d"});
    return token;
}

userSchema.methods.validatePassword = async function (inputPasswordByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = bcrypt.compare(inputPasswordByUser, passwordHash);
    return isPasswordValid;
}

module.exports = User;