const express = require('express')
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const User = require("./models/user")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is successfully listening on 3000");
    });
    console.log("Connection established!!")
}).catch((err) => {
    console.log("Error in Connection!! ", err)
})

// Get single user by email
// app.get('/user', async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//         const user = await User.findOne({emailId: userEmail})
//         if(user.length === 0) {
//             res.status(404).send("User not found!")
//         } else {
//             res.send(user)
//         }
//     } catch(err) {
//         res.status(400).send("Something went wrong! "+err)
//     }
// })

// Get all users
// app.get('/feed', async (req, res) => {
//     try {
//         const users = await User.find({})
//         if(users.length === 0) {
//             res.status(404).send("User not found!")
//         } else {
//             res.send(users)
//         }
//     } catch(err) {
//         res.status(400).send("Something went wrong! "+err)
//     }
// })

// Delete a user from database - with id
// app.delete('/user', async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         // const user = await User.findByIdAndDelete({_id: userId})
//         const user = await User.findByIdAndDelete(userId)
//         if(!user) {
//             res.status(404).send("User not found!")
//         } else {
//             res.send("User deleted successfully")
//         }
//     } catch(err) {
//         res.status(400).send("Something went wrong! "+err)
//     }
// })

// Update a user from database - with id
// app.patch('/user/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     const data = req.body;

//     try {
//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"]
//         const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
//         if(!isUpdateAllowed) {
//             throw new Error("Updates not allowed!")
//         }
//         if(data?.skills.length > 10) {
//             throw new Error("Cannot add more than 10 skills!")
//         }
//         // const user = await User.findOneAndUpdate({_id: data})
//         const user = await User.findByIdAndUpdate(userId, data, {runValidators: true})
//         if(!user) {
//             res.status(404).send("User not found!")
//         } else {
//             res.send("User updated successfully")
//         }
//     } catch(err) {
//         res.status(400).send("Something went wrong! "+err)
//     }
// })



