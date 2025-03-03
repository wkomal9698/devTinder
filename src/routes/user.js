const express = require("express");
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

const userRouter = express.Router();

// Get all the pending connection requests for the logged in user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({toUserId: loggedInUser._id, status: "interested"}).populate("fromUserId", USER_SAFE_DATA)
        // Different way of passing parameter to populate - String(as above) and Array
        // const connectionRequests = await ConnectionRequest.find({toUserId: loggedInUser._id, status: "interested"}).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"])

        res.json({message: "Data fetched successfully!", data: connectionRequests});

    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
   
})

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionRequest.find({$or:[{fromUserId: loggedInUser._id},{toUserId: loggedInUser._id}], status: "accepted"}).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)
        const data = connections.map((connection) => {
            if(connection.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return connection.toUserId;
            }
            return connection.fromUserId;
        })
        res.json({message: "Data fetched successfully!", data: data});
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

userRouter.get('/user/feed', userAuth, async (req, res) => {
    try {
        // User should see all the user cards except:
        // 1. his own card
        // 2. his connections
        // 3. ignored people
        // 4. already sent the connection request

        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({$or: [{fromUserId: loggedInUser._id},{toUserId: loggedInUser._id}]}).select("fromUserId toUserId")
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((conReq) => {
            hideUsersFromFeed.add(conReq.fromUserId.toString());
            hideUsersFromFeed.add(conReq.toUserId.toString());
        })

        const users = await User.find({$and: [{_id: {$nin: Array.from(hideUsersFromFeed)}}, {_id: {$ne: loggedInUser._id}}]}).select(USER_SAFE_DATA).skip(skip).limit(limit)
        console.log("USERSS IN FEED: "+users)
        res.send(users)
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = userRouter;