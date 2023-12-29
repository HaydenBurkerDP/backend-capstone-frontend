import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchWrapper from "../util/apiWrapper";
import { displayDate } from "../util/dateUtils";

const GoalCard = ({ goal, handleEdit, handleShare }) => {
  const createGoalLog = () => {
    fetchWrapper("/goal-log", "POST", {
      goal_id: goal.goal_id,
      start_date: displayDate(new Date()),
    });
  };

  return (
    <div className="goal-card">
      <div className="top">
        <h1 className="goal-name">{goal.name ? goal.name : "Untitled Goal"}</h1>
        {handleEdit ? (
          <button className="edit-btn" onClick={handleEdit}>
            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
          </button>
        ) : null}
      </div>

      <p className="goal-description">{goal.description}</p>

      <div className="bottom">
        <button className="start-goal-btn" onClick={createGoalLog}>
          Start Goal
        </button>
        {handleShare ? (
          <button className="share-btn" onClick={handleShare}>
            <FontAwesomeIcon icon="fa-solid fa-share-nodes" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default GoalCard;
