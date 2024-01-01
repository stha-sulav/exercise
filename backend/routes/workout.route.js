const { Router } = require("express");
const {
  getAllWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  createWorkout,
} = require("../controllers/workout.controller");

const router = Router();

router.route("/").get(getAllWorkouts).post(createWorkout);

router.route("/:id").get(getWorkout).patch(updateWorkout).delete(deleteWorkout);

module.exports = router;
