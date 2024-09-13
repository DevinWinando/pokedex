const Pokedex = require("../models/pokedex");
const randomizer = require("../helpers/randomizer");

exports.getPokedex = async (req, res) => {
  try {
    const pokedex = await Pokedex.find();
    res.status(200).json({
      success: true,
      data: {
        pokemons: pokedex,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createPokedex = async (req, res) => {
  try {
    const pokedex = await Pokedex.create(req.body);
    res.status(201).json({
      success: true,
      data: pokedex,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const pokedex = await Pokedex.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: pokedex,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.release = async (req, res) => {
  try {
    const pokedex = await Pokedex.findById(req.params.id);

    if (!pokedex) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    await pokedex.remove();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.catch = async (req, res) => {
  try {
    const isCatched = randomizer.randomize();

    return res.status(200).json({
      success: true,
      message: "Pokemon catched",
      data: {
        catched: isCatched,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
