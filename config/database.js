require("dotenv").config();
const crypto = require("crypto");
const hash = crypto
  .createHmac("sha256", "suitespot")
  .update("suitespot")
  .digest("hex");

module.exports = {
  // uri: process.env.DB_URL,
  uri: "mongodb+srv://meguizo:mongolDB@cluster0.zwkop.mongodb.net/suitespot?retryWrites=true&w=majority",
  secret: hash,
};
