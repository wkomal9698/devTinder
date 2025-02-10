const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // Read the token from req cookies
        const {token} = req.cookies;
        if(!token) {
            throw new Error("Invalid token!");
        }
        console.log("Toekn", token)

        // Validate the token
        const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
        console.log("decoded obj", decodedObj)
        // Find the user
        const {_id} = decodedObj;
        const user = User.findById(_id)
        console.log("user obj", user)
        if(!user) {
            throw new Error("User not found!");
        }
        req.user = user;
        next();
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports = {
    userAuth
}