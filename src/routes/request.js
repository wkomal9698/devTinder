const express = require("express");
const {userAuth} = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post('/sendConnectRequest', userAuth, async(req, res) => {
    const {user} = req;
    // Sending connection request
    console.log(user.firstName + " Sending connection request");
    res.send(user.firstName+ ": Connection request sent!");
})

module.exports = requestRouter;