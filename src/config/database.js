const mongoose = require("mongoose");
const url = "mongodb+srv://hellonode:DoE6rsBfFyNm1Yc6@hellonode.qsykn.mongodb.net/devTinder";

const connectDB = async () => {
    await mongoose.connect(url);
}

module.exports = connectDB;

connectDB().then(() => {
    console.log("Connection established!!")
}).catch((err) => {
    console.log("Error in Connection!! ", err)
})
console.log("in db22finish fileConnection established!!")