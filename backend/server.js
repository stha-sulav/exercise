require("dotenv").config();
const express = require("express");
const connectDb = require("./db");

const app = express();
const PORT = 8000 || process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//workout routes
const workoutRoutes = require("./routes/workout.route");
app.use("/api/workouts", workoutRoutes);

//connect ot database
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
