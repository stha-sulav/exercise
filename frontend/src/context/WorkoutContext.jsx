import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };

    case "UPDATE_WORKOUT":
      const workouts = state.workouts.filter(
        (workout) => workout._id !== action.payload._id
      );

      const updatedWorkout = [...workouts, action.payload].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      console.log(updatedWorkout);

      return {
        workouts: updatedWorkout,
      };

    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
