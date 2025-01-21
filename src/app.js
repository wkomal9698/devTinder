const express = require('express')
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user")

app.post('/signup', async (req, res) => {
    const userObj = {
        firstName: "Ko",
        lastName: "Wa",
        emailId: "ko@wa.com",
        password: "ko123",
        age: 18,
        gender: "Female"
    }

    // Creating a new instance of the User model
    const user = new User(userObj)

    try {
        await user.save();
        res.send("user saved")
    } catch(err) {
        res.status(400).send("Error saving user!! " + err.message)
    }
    
})

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is successfully listening on 3000");
    });
    console.log("Connection established!!")
}).catch((err) => {
    console.log("Error in Connection!! ", err)
})

