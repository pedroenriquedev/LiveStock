const mongoose = require("mongoose");
const { Schema } = mongoose;

const pastureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["poor", "good", "satisfactory"],
    default: "good",
  },
  status: {
    type: String,
    enum: ["occupied", "vacant", "recovering"],
    default: "occupied",
  },
  herd: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Animal",
    },
  ],
  area: {
    type: Number,
    min: [1, `Pasture area can't be less than 1`],
    default: 5,
  },
});

// 272 acres

const Pasture = mongoose.model("Pasture", pastureSchema);

module.exports = Pasture;
