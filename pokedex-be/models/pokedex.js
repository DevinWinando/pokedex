const mongoose = require("mongoose");

const pokedexSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pos: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Pokedex", pokedexSchema);
