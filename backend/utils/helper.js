const mongoose = require("mongoose");

const isIdValid = async (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = { isIdValid };
