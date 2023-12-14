import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { displayDate } from "../util/dateUtils";

const GoalLogCard = (props) => {
  const { goalLog, handleEdit, toggleCompletionDate } = props;
  const completed = !!goalLog.completion_date;

  return (
    <div className="goal-log-card">
      <div className="top">
        <h1 className="goal-name">
          {goalLog.name ? goalLog.name : "Untitled Goal Log"}
        </h1>
        <button className="edit-btn">
          <FontAwesomeIcon
            onClick={handleEdit}
            icon="fa-solid fa-pen-to-square"
          />
        </button>
      </div>

      <p className="goal-description">{goalLog.description}</p>

      <div className="bottom">
        <div className="date-wrapper">
          Start Date: {displayDate(goalLog.start_date)}
        </div>
        {completed ? null : (
          <div className="date-wrapper">
            End Date: {displayDate(goalLog.end_date)}
          </div>
        )}

        {completed ? (
          <div className="date-wrapper">
            Completed: {displayDate(goalLog.completion_date)}
          </div>
        ) : null}

        <button className="completed-btn" onClick={toggleCompletionDate}>
          {completed ? (
            <FontAwesomeIcon icon="fa-solid fa-check" />
          ) : (
            <FontAwesomeIcon icon="fa-regular fa-square" />
          )}
        </button>
      </div>
    </div>
  );
};

export default GoalLogCard;
