import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetchWrapper from "../util/apiWrapper";

import { successfulToast } from "../util/toastNotification";
import { displayDate } from "../util/dateUtils";
import { displayName } from "../util/goalUtils";

const GoalCard = ({ goal, handleEdit, handleShare }) => {
  const createGoalLog = () => {
    fetchWrapper("/goal-log", "POST", {
      goal_id: goal.goal_id,
      start_date: displayDate(new Date()),
    }).then((res) => {
      successfulToast(`Added ${displayName(res.goal_log.name)} to goal logs`);
    });
  };

  return (
    <div className="goal-card">
      <div className="top">
        <h1 className="goal-name">{displayName(goal.name)}</h1>
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
