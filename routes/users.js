const User = require("../models/user"); // Import User Model Schema
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

let bcrypt = require("bcryptjs");
const {
  encryptPassword,
  comparePassword,
} = require("../config/password-hasher");

// const ObjectId = mongoose.Types.ObjectId;

module.exports = (router) => {
  router.post("/addUser", async (req, res) => {
    const { email, username, password, confirm, role } = req.body;

    const userExists = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (userExists) {
      return res.json({
        success: false,
        message: "User name or Email already exists",
      });
    }

    if (!email || !username || !password || password !== confirm) {
      return res.json({
        success: false,
        message:
          "Invalid input, please provide email, username and matching password",
      });
    }

    try {
      const newUser = new User({
        id: uuidv4(),
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password,
        role: role.toLowerCase(),
      });

      const savedUser = await newUser.save();

      res.json({
        success: true,
        message: "This user is successfully Registered",
        data: { email: savedUser.email, username: savedUser.username },
      });
    } catch (err) {
      console.error(err);

      const errorMessages = Object.values(err.errors).map(
        ({ message }) => message
      );

      return res.json({
        success: false,
        message: errorMessages.join(", "),
      });
    }
  });

  router.get("/getAllUser", async (req, res) => {
    try {
      const users = await User.find({ deleted: false })
        .select({ id: 1, email: 1, username: 1, role: 1, status: 1 })
        .sort({ _id: -1 });

      if (users.length === 0) {
        return res.json({ success: false, message: "No User found." });
      }

      res.json({ success: true, users });
    } catch (err) {
      res.json({ success: false, message: err });
    }
  });

  router.put("/deleteUser", async (req, res) => {
    const { id } = req.body;

    try {
      const deletedUser = await User.findOneAndUpdate(
        { id },
        { $set: { deleted: true } },
        { new: true }
      );

      if (!deletedUser) {
        return res.json({
          success: false,
          message: "User not found to delete",
        });
      }

      const { password, ...userData } = deletedUser._doc;

      console.log(password);

      res.json({
        success: true,
        message: "User deleted successfully",
        data: userData,
      });
    } catch (err) {
      console.error(err);
      res.json({ success: false, message: "Could not delete User" });
    }
  });

  router.put("/changeUserStatus", async (req, res) => {
    const { id } = req.body;

    try {
      const user = await User.findOne({ id });

      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }

      const statusData = user.status === "inactive" ? "active" : "inactive";
      const updatedUser = await User.findOneAndUpdate(
        { id },
        { status: statusData },
        { new: true }
      );

      const { password, ...userData } = updatedUser._doc;

      res.json({
        success: true,
        message: "User status updated successfully",
        data: userData,
      });
    } catch (err) {
      res.json({ success: false, message: err.message });
    }
  });

  router.put("/updateProfile", async (req, res) => {
    const { id } = req.body;
    const { username, email, role } = req.body;

    if (req.body.new_password) {
      const user = await User.findOne({ id });
      const isValidPassword = await comparePassword(
        req.body.current_password,
        user.password
      );
      if (!isValidPassword) {
        return res.json({
          success: false,
          message: "Incorrect Old Password : " + req.body.current_password,
        });
      }
      req.body.password = await encryptPassword(req.body.new_password);
    }

    const updateFields = { ...req.body };
    delete updateFields.id;
    delete updateFields.current_password;

    const updatedUser = await User.findOneAndUpdate({ id }, updateFields, {
      upsert: false,
      new: true,
    });

    if (updatedUser) {
      return res.json({
        success: true,
        message: "User Information has been updated!",
        data: updatedUser,
      });
    }

    return res.json({
      success: false,
      message: "No User has been modified!",
    });
  });

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
      return res.json({ success: false, message: "No Username was provided" });
    }

    if (!password) {
      return res.json({ success: false, message: "No password was provided" });
    }

    try {
      const user = await User.findOne({ username: username.toLowerCase() });

      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }

      if (await comparePassword(password, user.password)) {
        const newUser = user.toObject();
        delete newUser.password;
        delete newUser._id;
        delete newUser.__v;

        const token = jwt.sign(newUser, config.secret, {
          expiresIn: "24h",
        });

        return res.json({
          success: true,
          message: "Password is Correct",
          token,
          newUser
        });
      }

      return res.json({ success: false, message: "Password is incorrect" });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  });

  return router;
};
