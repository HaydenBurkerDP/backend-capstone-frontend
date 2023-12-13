import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoalCard = ({ goal, handleEdit, handleShare }) => {
  return (
    <div className="goal-card">
      <h1>{goal.name ? goal.name : "Untitled Goal"}</h1>
      <p>{goal.description}</p>
      {handleEdit ? (
        <FontAwesomeIcon
          onClick={handleEdit}
          icon="fa-solid fa-pen-to-square"
        />
      ) : null}
      <button
        onClick={() => {
          console.log("create goal log");
        }}
      >
        Start Goal
      </button>
      {handleShare ? (
        <FontAwesomeIcon onClick={handleShare} icon="fa-solid fa-share-nodes" />
      ) : null}
    </div>
  );
};

export default GoalCard;
