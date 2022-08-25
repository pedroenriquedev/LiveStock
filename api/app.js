const express = require("express");
const animalRouter = require("./routes/animalRoute");
const batchRouter = require("./routes/batchRoute");
const pastureRouter = require("./routes/pastureRouter");

const app = express();

app.use(
  express.json({
    limit: "50kb",
  })
);

app.use("/api/v1/animal", animalRouter);
app.use("/api/v1/batch", batchRouter);
app.use("/api/v1/pasture", pastureRouter);

module.exports = app;
