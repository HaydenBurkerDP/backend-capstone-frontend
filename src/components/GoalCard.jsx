import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GoalCard = ({ goal, handleEdit, handleShare }) => {
  return (
    <div className="goal-card">
      <div className="top">
        <h1 className="goal-name">{goal.name ? goal.name : "Untitled Goal"}</h1>
        {handleEdit ? (
          <button className="edit-btn">
            <FontAwesomeIcon
              onClick={handleEdit}
              icon="fa-solid fa-pen-to-square"
            />
          </button>
        ) : null}
      </div>

      <p className="goal-description">{goal.description}</p>

      <div className="bottom">
        <button
          className="start-goal-btn"
          onClick={() => {
            console.log("create goal log");
          }}
        >
          Start Goal
        </button>
        {handleShare ? (
          <button class="share-btn">
            <FontAwesomeIcon
              onClick={handleShare}
              icon="fa-solid fa-share-nodes"
            />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default GoalCard;
