const Workout = require("../models/workout.model");
const { isIdValid } = require("../utils/helper");

/*
    @desc get all workouts
    @route GET /api/workouts
    @access Private
*/
const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*
    @desc get a workout
    @route GET /api/workouts/:id
    @access Private
*/
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!(await isIdValid(id))) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  return res.status(200).json({ workout });
};

/*
    @desc create a workout
    @route GET /api/workouts/:id
    @access Private
*/
const createWorkout = async (req, res) => {
  const { title, reps, weight } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!weight) {
    emptyFields.push("weight");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "All fields are required", emptyFields });
  }

  try {
    const workout = await Workout.create({ title, reps, weight });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*
    @desc update workout
    @route PATCH /api/workouts/:id
    @access Private
*/
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, weight } = req.body;

  if (!(await isIdValid(id))) {
    return res.status(404).json({ error: "Workout mot found" });
  }

  try {
    const emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (!reps) {
      emptyFields.push("reps");
    }
    if (!weight) {
      emptyFields.push("weight");
    }

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "All fields are required", emptyFields });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*
    @desc delete workout
    @route DELETE /api/workouts/:id
    @access Private
*/
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!(await isIdValid(id))) {
    return res.status(404).json({ error: "Workout mot found" });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: "Workout mot found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
