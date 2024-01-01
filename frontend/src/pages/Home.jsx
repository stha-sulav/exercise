import React, { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {
  const initialFormFieldsValue = {
    title: "",
    reps: "",
    weight: "",
  };

  const { workouts, dispatch } = useWorkoutContext();
  const [formFields, setFormFields] = useState(initialFormFieldsValue);
  const [edit, setEdit] = useState(false);
  const [workoutId, setWorkoutId] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts");
      const data = await res.json();

      dispatch({ type: "SET_WORKOUTS", payload: data });
    };

    fetchWorkouts();
  }, [dispatch]);

  const handleClick = (workout) => {
    const { title, reps, weight } = workout;

    setWorkoutId(workout._id);
    setEdit(true);
    setError(null);
    setEmptyFields([]);

    setFormFields({ title, reps, weight });
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/workouts/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: result });
    }
  };

  const handleFormfields = (e) => {
    const { name, value } = e.target;
    setFormFields((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(formFields),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error);
      setEmptyFields(result.emptyFields);
    }

    if (res.ok) {
      setFormFields(initialFormFieldsValue);
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: result });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/workouts/${workoutId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formFields),
    });
    const result = await res.json();

    if (!res.ok) {
      setError(result.error);
      setEmptyFields(result.emptyFields);
    }

    if (res.ok) {
      setFormFields(initialFormFieldsValue);
      setError(null);
      setEmptyFields([]);
      setWorkoutId("");
      setEdit(false);
      dispatch({ type: "UPDATE_WORKOUT", payload: result });
    }
  };

  console.log(workouts);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              handleDelete={handleDelete}
              handleClick={handleClick}
            />
          ))}
      </div>
      <WorkoutForm
        handleAdd={handleAdd}
        handleFormfields={handleFormfields}
        formFields={formFields}
        error={error}
        emptyFields={emptyFields}
        edit={edit}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Home;
