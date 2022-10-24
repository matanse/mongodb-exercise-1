const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connect to mongodb: exercises..."))
  .catch((err) => console.log("Error: ", err));
