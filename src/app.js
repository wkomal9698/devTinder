console.log("Start of node project")

const express = require('express')
const app = express();



app.use('/test', (req, res) => {
    res.send("hELLO from /test")
});

// This will only handle GET call to /user
app.get('/user', (req, res) => {
    res.send({firstname: "Ko", lastname: "Wa"})
})

app.post('/user', (req, res) => {
    console.log("Saving data...")
    res.send("Data successfully saved!");
});

app.delete('/user', (req, res) => {
    console.log("Deleting data...")
    res.send("User successfully deleted!");
});

app.listen(3000, () => {
    console.log("Server is successfully listening on 3000");
});

console.log("End of node project")