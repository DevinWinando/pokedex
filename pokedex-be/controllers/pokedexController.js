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
    const pokedex = await Pokedex.create({
      name: req.body.name,
      id: req.body.id,
      pos: 0,
    });

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
        message: "Pokemen not found",
      });
    }

    const isPrime = randomizer.primeNumber();

    if (isPrime.prime) {
      await Pokedex.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Pokemon released",
        data: { isPrime },
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Pokemon failed release",
        data: { isPrime },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.rename = async (req, res) => {
  try {
    const pokedex = await Pokedex.findById(req.params.id);

    if (!pokedex) {
      return res.status(404).json({
        success: false,
        message: "Pokemen not found",
      });
    }

    const number = randomizer.fibonacci(pokedex.pos);

    pokedex.name = pokedex.name.split("-")[0] + "-" + number;
    pokedex.pos += 1;
    pokedex.save();

    return res.status(200).json({
      success: true,
      message: "Pokemon renamed",
      data: {
        pokedex,
        number,
      },
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
    const isCatched = randomizer.randomize(1);

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
