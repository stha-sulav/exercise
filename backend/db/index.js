const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (!connection) {
      throw new Error("Cannot connect to database");
    } else {
      console.log("Connected to database");
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
