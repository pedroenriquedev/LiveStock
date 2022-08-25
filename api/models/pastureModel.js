const mongoose = require("mongoose");
const { Schema } = mongoose;

// pasture condition
// cattle
/* 
general growth of herd in the pasture
 - calculated by analyzing each animal in cattle
 - addition of all growth rates / number of animals

status: 'occupied', 'vacant', 'recovering'
// react: project profit based on general growth and speculated price

- move batch from one pasture to another
// cant move batch to a pasture that's recovering
-- this all could be done with findByIdAndUpdate doc.cattle = [''] after running a method on the array

*/
const pastureSchema = new Schema({
  name: String,
  condition: {
    type: String,
    enum: ["poor", "good", "satisfactory"],
  },
  status: {
    type: String,
    enum: ["occupied", "vacant", "recovering"],
  },
  herd: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Animal",
    },
  ],
  area: {
    type: Number,
    required: true,
    min: [1, `Pasture area can't be less than 1`],
  },
});

// 272 acres

const Pasture = mongoose.model("Pasture", pastureSchema);

module.exports = Pasture;
