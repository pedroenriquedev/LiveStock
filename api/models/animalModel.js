/* 
weightLog[{weight,dateWasLogged}], breed, color, age, description(optional),
price per weight as purchased, 
batch(optional, reference to parent), pasture (optional bc it will be added later,reference to parent)
*/

const mongoose = require("mongoose");
const { Schema } = mongoose;

const weightLogSchema = new Schema({
  weight: {
    type: Number,
    min: [10, `Weight can't be less than 10 pounds.`],
    max: [5000, `Weight can't be greater than 5000 pounds.`],
  },
  date: Date,
});

const animalSchema = new Schema({
  weightLog: [weightLogSchema],
  breed: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  batch: {
    type: mongoose.Schema.ObjectId,
    ref: "Batch",
  },
  pasture: {
    type: mongoose.Schema.ObjectId,
    ref: "Pasture",
  },
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
