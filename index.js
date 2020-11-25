const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get("/", (req, res) => {
    try {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    } catch (err) {
        console.log(err)
    }
});

app.listen(port, () => {
    console.log("Server is starting...")
});