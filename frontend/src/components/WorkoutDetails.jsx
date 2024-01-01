import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout, handleDelete, handleClick }) => {
  const { _id, title, reps, weight, createdAt } = workout;

  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Weight(kg): </strong>
        {weight}
      </p>
      <p>
        <strong>Reps: </strong>
        {reps}
      </p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <div className="actions">
        <button className="edit-btn" onClick={() => handleClick(workout)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => handleDelete(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetails;
