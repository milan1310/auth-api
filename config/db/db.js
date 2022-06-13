require("dotenv").config();
const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
  });
  const connection = mongoose.connection;
  connection.once("open", () => console.log("Connected to DB"));
}

module.exports = connectDB;
