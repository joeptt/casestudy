// Express setup
const express = require("express");
const app = express();

// Import the JSON data from json file
const data = require("./rides.json");

app.get("/rides", (req, res) => {
    res.json(data);
});

app.listen(3001, () => {
    console.log("Listening on 3001...");
});
