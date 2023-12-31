import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fetchWrapper from "../../util/apiWrapper";
import EditGoalLog from "../forms/EditGoalLog";
import GoalLogCard from "../GoalLogCard";
import Modal from "../modals/Modal";

import { useAppData } from "../../context/appDataContext";
import { displayDate } from "../../util/dateUtils";

const GoalLogs = () => {
  const [selectedGoalLog, setSelectedGoalLog] = useState(null);
  const [isEditGoalLogModalOpen, setIsEditGoalLogModalOpen] = useState(false);

  const { goalLogs, setGoalLogs, fetchGoalLogs, category } = useAppData();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchGoalLogs(signal).catch((e) => {
      if (!signal.aborted) console.error(e);
    });

    return () => controller.abort();
  }, [fetchGoalLogs]);

  const createGoalLog = () => {
    const newGoalLog = {
      name: "",
      description: "",
      start_date: displayDate(new Date()),
    };

    if (category?.category_id) newGoalLog.category_ids = [category.category_id];

    fetchWrapper("/goal-log", "POST", newGoalLog).then((res) => {
      setGoalLogs((prev) => [...prev, res.goal_log]);
      setIsEditGoalLogModalOpen(true);
      setSelectedGoalLog(res.goal_log);
    });
  };

  const filterGoalLogs = (isCompleted) => {
    return goalLogs
      .filter((goalLog) => {
        return !!goalLog.completion_date === isCompleted;
      })
      .filter((goalLog) => {
        return (
          !category?.category_id ||
          goalLog.categories.some((c) => c.category_id === category.category_id)
        );
      });
  };

  const renderGoalLogs = (isCompleted) => {
    const renderedGoalLogs = filterGoalLogs(isCompleted);

    if (renderedGoalLogs.length === 0 && !isCompleted) {
      const completedGoalLogCount = filterGoalLogs(true).length;

      return completedGoalLogCount ? (
        <h1 className="empty-container-text">
          Nice job! You have completed all your goals!
        </h1>
      ) : (
        <h1 className="empty-container-text">
          No goal logs found! Click the + to create a new one
        </h1>
      );
    }

    return renderedGoalLogs.map((goalLog) => {
      return (
        <GoalLogCard
          key={goalLog.goal_log_id}
          goalLog={goalLog}
          handleEdit={() => {
            setIsEditGoalLogModalOpen(true);
            setSelectedGoalLog(goalLog);
          }}
          toggleCompletionDate={() => {
            const completionDate = goalLog.completion_date
              ? null
              : displayDate(new Date());

            fetchWrapper(`/goal-log/${goalLog.goal_log_id}`, "PUT", {
              completion_date: completionDate,
            }).then((res) =>
              setGoalLogs((prev) =>
                prev.map((gl) =>
                  gl.goal_log_id === goalLog.goal_log_id ? res.goal_log : gl
                )
              )
            );
          }}
        />
      );
    });
  };

  return (
    <div className="goal-logs-container">
      <div className="goal-logs-header">
        <h1>Goals in Progress</h1>

        <button className="plus-btn">
          <FontAwesomeIcon onClick={createGoalLog} icon="fa-solid fa-plus" />
        </button>
      </div>

      <div className="goal-log-cards-container">{renderGoalLogs(false)}</div>

      {filterGoalLogs(true).length ? (
        <>
          <div className="goal-logs-header">
            <h1>Goals Completed</h1>
          </div>

          <div className="goal-log-cards-container">{renderGoalLogs(true)}</div>
        </>
      ) : null}

      <Modal
        isModalOpen={isEditGoalLogModalOpen}
        onRequestClose={() => setIsEditGoalLogModalOpen(false)}
      >
        <EditGoalLog
          goalLog={selectedGoalLog}
          onRequestClose={() => setIsEditGoalLogModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default GoalLogs;
