const express = require("express");
const animalRouter = require("./routes/animalRoute");

const app = express();

app.use("/api/v1/animal", animalRouter);

module.exports = app;
