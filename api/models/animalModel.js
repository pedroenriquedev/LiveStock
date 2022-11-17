const mongoose = require("mongoose");
const { Schema } = mongoose;

const weightLogSchema = new Schema({
  weight: {
    type: Number,
    min: [10, `Weight can't be less than 10 pounds.`],
    max: [5000, `Weight can't be greater than 5000 pounds.`],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  growthRatio: Number,
  pasture: String,
});

const animalSchema = new Schema({
  weightLog: [weightLogSchema],
  initialWeight: {
    type: Number,
    required: true,
    min: [10, `Weight can't be less than 10 pounds.`],
    max: [5000, `Weight can't be greater than 5000 pounds.`],
  },
  currentWeight: {
    type: Number,
    min: [10, `Weight can't be less than 10 pounds.`],
    max: [5000, `Weight can't be greater than 5000 pounds.`],
  },
  breed: {
    type: String,
    required: true,
  },
  name: String,
  color: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
  },
  health: {
    type: String,
    enum: ["critical", "poor", "good", "healthy"],
    default: "Healthy",
  },
  priceRatio: {
    type: Number,
    min: [1, `Price can't be less than 1.`],
    required: true,
  },
  growthRatio: Number,
  initialPrice: {
    type: Number,
    immutable: true,
  },
  dateOfPurchase: {
    type: Date,
  },
  description: {
    type: String,
  },
  batch: {
    type: mongoose.Schema.ObjectId,
    ref: "Batch",
  },
});

animalSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
  }
  const actualWeight = this.initialWeight / 2;
  this.initialPrice = this.priceRatio * (actualWeight / 15);
  next();
});

animalSchema.pre("save", function (next) {
  // map this.weight log and add growthRatio to each one of them
  if (this.weightLog.length === 0) next();

  this.weightLog.forEach((log) => {
    ratio = ((log.weight - this.initialWeight) / this.initialWeight) * 100;
    log.growthRatio = ratio;
    this.growthRatio = ratio;
  });
  // generate log right here! bull #342243 has lost a lot of weight!
  next();
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
