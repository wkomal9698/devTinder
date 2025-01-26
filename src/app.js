const express = require('express')
const connectDB = require("./config/database");
const {validateSignUpData, validateEmail} = require("./utils/validation")
const bcrypt = require("bcrypt")

const app = express();

const User = require("./models/user")

app.use(express.json())

app.post('/signup', async (req, res) => {
    
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

app.post('/login', async (req, res) => {

    try {
        const {emailId, password} = req.body;
        validateEmail(emailId)
        
        const user = await User.findOne({emailId: emailId})
        if(!user) {
            throw new Error("Invalid credentials!")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid) {
            res.send("Login successful!");
        } else {
            throw new Error("Invalid credentials!")
        }

    } catch(err) {
        res.status(400).send("ERROR : " + err.message)
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

// Update a user from database - with id
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
        if(!isUpdateAllowed) {
            throw new Error("Updates not allowed!")
        }
        if(data?.skills.length > 10) {
            throw new Error("Cannot add more than 10 skills!")
        }
        // const user = await User.findOneAndUpdate({_id: data})
        const user = await User.findByIdAndUpdate(userId, data, {runValidators: true})
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

