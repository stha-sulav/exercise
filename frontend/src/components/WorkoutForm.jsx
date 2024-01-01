const WorkoutForm = ({
  formFields,
  handleAdd,
  handleFormfields,
  handleEdit,
  emptyFields,
  error,
  edit,
}) => {
  const { title, reps, weight } = formFields;
  return (
    <form action="" className="create">
      <h3>Add a new workout</h3>

      <label>Name: </label>
      <input
        type="text"
        name="title"
        // onChange={(e) => setTitle(e.target.value)}
        onChange={handleFormfields}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Weight (in kg): </label>
      <input
        type="number"
        name="weight"
        // onChange={(e) => setWeight(e.target.value)}
        onChange={handleFormfields}
        value={weight}
        className={emptyFields.includes("weight") ? "error" : ""}
      />

      <label>Reps: </label>
      <input
        type="number"
        name="reps"
        // onChange={(e) => setReps(e.target.value)}
        onChange={handleFormfields}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      {edit ? (
        <button onClick={handleEdit} type="submit">
          Edit Workout
        </button>
      ) : (
        <button onClick={handleAdd} type="submit">
          Add Workout
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
