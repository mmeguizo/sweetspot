require("dotenv").config();
const crypto = require("crypto");
const hash = crypto
  .createHmac("sha256", "suitespot")
  .update("suitespot")
  .digest("hex");

module.exports = {
  // uri: process.env.DB_URL,
  uri: process.env.DB_LOCAL,
  secret: hash,
};
