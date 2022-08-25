// every time theres an update (animals added), calculate total $$ and weigth -> function can be reused on Herd modal
// entity you bought it from
// date
// cattle
// total price
const mongoose = require("mongoose");
const { Schema } = mongoose;

const batchSchema = new Schema({
  // referencing: pass an array of ids of the documents
  cattle: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Animal",
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  // could be a person, company, family farm
  seller: {
    type: "String",
    required: true,
  },
  total: {
    type: Number,
    min: [0, "Total can't be less than 0."],
  },
  description: {
    type: String,
    maxLength: [5000, "Description can't have more than 5000 characters."],
  },
});

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
