const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://devinwinando13:AFk0HzIVhGybHr5m@pokedex.p9bux.mongodb.net/?retryWrites=true&w=majority&appName=pokedex";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
