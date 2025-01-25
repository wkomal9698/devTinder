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

// Get single user by email
app.get('/user', async (req, res) => {
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

// Get all users
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

// Delete a user from database - with id
app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        // const user = await User.findByIdAndDelete({_id: userId})
        const user = await User.findByIdAndDelete(userId)
        if(!user) {
            res.status(404).send("User not found!")
        } else {
            res.send("User deleted successfully")
        }
    } catch(err) {
        res.status(400).send("Something went wrong! "+err)
    }
})

// Delete a user from database - with id
app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        // const user = await User.findOneAndDelete({_id: data})
        const user = await User.findByIdAndUpdate(userId, data)
        if(!user) {
            res.status(404).send("User not found!")
        } else {
            res.send("User updated successfully")
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

