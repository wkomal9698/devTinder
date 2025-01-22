const express = require('express')
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user")

app.use(express.json())

app.post('/signup', async (req, res) => {

    // const userObj = {
    //     firstName: "Ko",
    //     lastName: "Wa",
    //     emailId: "ko@wa.com",
    //     password: "ko123",
    //     age: 18,
    //     gender: "Female"
    // }

    // Creating a new instance of the User model
    const user = new User(req.body)

    try {
        await user.save();
        res.send("user saved")
    } catch(err) {
        res.status(400).send("Error saving user!! " + err.message)
    }
    
})

app.post('/user', async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.findOne({emailId: userEmail})
        if(user.length === 0) {
            res.status(404).send("User not found!")
        } else {
            res.send(user)
        }
        
    } catch(err) {
        res.status(400).send("Something went wrong! "+err)
    }
    

})

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        if(users.length === 0) {
            res.status(404).send("User not found!")
        } else {
            res.send(users)
        }
    } catch(err) {
        res.status(400).send("Something went wrong! "+err)
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

