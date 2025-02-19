const express = require("express");
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', userAuth, async(req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const ALLOWED_STATUS = ["interested", "ignored"];
        if(!ALLOWED_STATUS.includes(status)) {
            res.status(400).send("ERROR: Invalid status type: "+status);
        }

        if(fromUserId === toUserId) {
            res.status(400).send("ERROR: Cannot send request to yourself!")
        }

        const toUser = await User.findById(toUserId);
        if(!toUser) {
            res.status(400).send("ERROR: User not found!");
        }

        // Check if there is an existing connectionRequestion
        const existingConnectionRequest = await ConnectionRequest.findOne({$or:[{fromUserId, toUserId}, {fromUserId:toUserId, toUserId: fromUserId}]})
        if(existingConnectionRequest) {
            res.status(400).send("ERROR: Connection request already exists!");
        }

        const connectionRequest = new ConnectionRequest({fromUserId, toUserId, status})
        await connectionRequest.save();
        res.json({message: `${status} : ${toUser.firstName}!`, data: connectionRequest});
    } catch(err) {
        res.status(400).send("ERROR : " + err.message)
    }
})

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const status = req.params.status;
        const requestId = req.params.requestId;

        const ALLOWED_STATUS = ["accepted", "rejected"];
        if(!ALLOWED_STATUS.includes(status)) {
            throw new Error(`Status ${status} is invalid!`)
        }

        const connectionRequest = await ConnectionRequest.findOne({_id: requestId, toUserId: loggedInUser._id, status: "interested"});
        if(!connectionRequest) {
            throw new Error("Connection Request not found!")
        }

        connectionRequest.status = status;
        await connectionRequest.save();
        res.json({message: `Connection Request ${status}!`, data: connectionRequest});
    } catch(err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = requestRouter;