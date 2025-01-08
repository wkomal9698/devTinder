console.log("Start of node project")

const express = require('express')
const app = express();

app.use('/', (req, res) => {
    res.send("hELLO from /")
})

app.use('/test', (req, res) => {
    res.send("hELLO from /test")
})

app.use('/hello', (req, res) => {
    res.send("hELLO from /hello")
})


app.listen(3000, () => {
    console.log("Server is successfully listening on 3000")
});

console.log("End of node project")