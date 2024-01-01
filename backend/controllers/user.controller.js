const User = require("../models/user.model");
const createToken = require("../utils/createToken");

/*
    @desc login user
    @route GET /api/users/login
    @access Public
*/
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      throw new Error("All fields are required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const isPasswordCorrect = await user.verifyPassword(password);

    if (!isPasswordCorrect) {
      throw new Error("Incorrect email or password");
    }

    const token = createToken(user._id);

    res
      .status(200)
      .json({ _id: user._id, email: user.email, fullname: user.fullname });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*
    @desc register user
    @route GET /api/users/signup
    @access Public
*/
const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    User.validateUserWhileSignup(fullname, email, password);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User with that email already exists.");
    }

    const user = await User.create({ fullname, email, password });

    if (!user) {
      throw new Error("Cannot create User");
    }

    const token = createToken(user._id);

    res.status(201).json({ _id: user._id, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
