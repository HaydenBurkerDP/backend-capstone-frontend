import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fetchWrapper from "../../util/apiWrapper";
import GoalLogCard from "../GoalLogCard";

import { useAppData } from "../../context/appDataContext";
import Modal from "../modals/Modal";
import EditGoalLog from "../forms/EditGoalLog";
import { displayDate } from "../../util/dateUtils";

const GoalLogs = () => {
  const [selectedGoalLog, setSelectedGoalLog] = useState(null);
  const [isEditGoalLogModalOpen, setIsEditGoalLogModalOpen] = useState(false);

  const { goalLogs, setGoalLogs, fetchGoalLogs } = useAppData();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchGoalLogs(signal).catch((e) => {
      if (!signal.aborted) console.error(e);
    });

    return () => controller.abort();
  }, [fetchGoalLogs]);

  const renderGoalLogs = (isCompleted) => {
    return goalLogs
      .filter((goalLog) => {
        return !!goalLog.completion_date === isCompleted;
      })
      .map((goalLog) => {
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
          <FontAwesomeIcon
            onClick={() => {
              fetchWrapper("/goal-log", "POST", {
                name: "",
                description: "",
                start_date: displayDate(new Date()),
              }).then((res) => {
                setGoalLogs((prev) => [...prev, res.goal_log]);
                setIsEditGoalLogModalOpen(true);
                setSelectedGoalLog(res.goal_log);
              });
            }}
            icon="fa-solid fa-plus"
          />
        </button>
      </div>

      <div className="goal-log-cards-container">{renderGoalLogs(false)}</div>

      <div className="goal-logs-header">
        <h1>Goals Completed</h1>
      </div>

      <div className="goal-log-cards-container">{renderGoalLogs(true)}</div>

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
