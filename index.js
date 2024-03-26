require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const errorHandler = require("express-error-handler");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000;
const config = require("./config/database");
const http = require("http").Server(app);

const users = require("./routes/users")(router);
const maintenance = require("./routes/maintenance")(router);
const api = require("./routes/api")(router);

mongoose
  .connect(config.uri, config.options)
  .then(() => console.log("Connected to the database:", process.env.DB_NAME))
  .catch((err) => console.error("Error connecting to database:", err));

app.use(cors());
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: false }));
app.use(allowCrossDomain);
app.use(errorHandler());

app.use("/users", users);
app.use("/maintenance", maintenance);
app.use("/api", api);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/app/dist/index.html"));
// });

app.listen(PORT || 52847, () => {
  console.log("Connected on port:", PORT);
});
