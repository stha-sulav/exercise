const Workout = require("../models/workout.model");
const { isIdValid } = require("../utils/helper");

/*
    @desc login user
    @route GET /api/users/login
    @access Public
*/
const loginUser = async (req, res) => {
  res.send("Login Route");
};

/*
    @desc register user
    @route GET /api/users/signup
    @access Public
*/
const registerUser = async (req, res) => {
  res.send("Signup Route");
};

module.exports = {
  loginUser,
  registerUser,
};
