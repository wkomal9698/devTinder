const express = require("express");
const {validateSignUpData, validateEmail} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    
    try {
        // Validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new instance of the User model
        const user = new User({firstName, lastName, emailId, password: passwordHash});

        await user.save();
        res.send("User saved successful!")
    } catch(err) {
        res.status(400).send("ERROR : " + err.message)
    }
})

authRouter.post('/login', async (req, res) => {

    try {
        const {emailId, password} = req.body;
        validateEmail(emailId)
        
        const user = await User.findOne({emailId: emailId})
        if(!user) {
            throw new Error("Invalid credentials!")
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid) {

            // Create a JWT Token
            const token = await user.getJWT();
            console.log(token)

            // Add the token to cookie and send the response back to user
            res.cookie("token", token)

            res.send("Login successful!");
        } else {
            throw new Error("Invalid credentials!")
        }

    } catch(err) {
        res.status(400).send("ERROR : " + err.message)
    }
    
})

module.exports = authRouter;