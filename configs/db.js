require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_URL;

const connection = mongoose.connect(dbUrl);

module.exports = {
  connection,
};
