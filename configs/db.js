require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL environment variable is not set.");
  process.exit(1); // Exit with an error code if database URL is missing
}

const connection = mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  connection,
};
