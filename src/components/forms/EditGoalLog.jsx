import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fetchWrapper from "../../util/apiWrapper";
import Modal from "../modals/Modal";
import EditCategories from "./CategorySelector";
import ConfirmDelete from "./ConfirmDelete";
import { formatDate } from "../../util/dateUtils";

import { useAppData } from "../../context/appDataContext";

const EditGoalLog = (props) => {
  const { goalLog, onRequestClose } = props;

  const [name, setName] = useState(goalLog.name);
  const [description, setDescription] = useState(goalLog.description);
  const [categoryIds, setCategoryIds] = useState(
    goalLog.categories.map((category) => category.category_id)
  );
  const [startDate, setStartDate] = useState(formatDate(goalLog.start_date));
  const [endDate, setEndDate] = useState(formatDate(goalLog.end_date));
  const [completionDate, setCompletionDate] = useState(
    formatDate(goalLog.completion_date)
  );
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { setGoalLogs } = useAppData();

  const updateGoal = () => {
    const oldCategoryIds = goalLog.categories.map(
      (category) => category.category_id
    );
    let changedCategoryIds = oldCategoryIds.concat(categoryIds);

    changedCategoryIds = changedCategoryIds.filter((categoryId) =>
      changedCategoryIds.filter((cId) => cId === categoryId).length === 1
        ? categoryId
        : null
    );

    const newGoalLog = {
      name: name,
      description: description,
      category_ids: changedCategoryIds,
      start_date: startDate ? startDate : null,
      end_date: endDate ? endDate : null,
      completion_date: completionDate ? completionDate : null,
    };
    console.log(newGoalLog);

    fetchWrapper(`/goal-log/${goalLog.goal_log_id}`, "PUT", newGoalLog).then(
      (res) => {
        onRequestClose();
        setGoalLogs((prev) =>
          prev.map((currentGoalLog) =>
            currentGoalLog.goal_log_id === goalLog.goal_log_id
              ? res.goal_log
              : currentGoalLog
          )
        );
      }
    );
  };

  return (
    <div className="edit-goal-container">
      <FontAwesomeIcon onClick={onRequestClose} icon="fa-solid fa-xmark" />

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        Start Date:{" "}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        End Date:{" "}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        Completed:{" "}
        <input
          type="date"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
        />
      </div>

      <button onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
      <button onClick={() => setIsCategoriesModalOpen(true)}>
        Edit Categories
      </button>
      <button onClick={updateGoal}>Save</button>

      <Modal
        isModalOpen={isCategoriesModalOpen}
        onRequestClose={() => setIsCategoriesModalOpen(false)}
      >
        <EditCategories
          onRequestClose={() => setIsCategoriesModalOpen(false)}
          categoryIds={categoryIds}
          setCategoryIds={setCategoryIds}
        />
      </Modal>

      <Modal
        isModalOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <ConfirmDelete
          message="Are you sure you want to delete this goal?"
          onRequestClose={() => setIsDeleteModalOpen(false)}
          handleDelete={() =>
            fetchWrapper(
              `/goal-log/delete/${goalLog.goal_log_id}`,
              "DELETE"
            ).then(() => {
              onRequestClose();
              setGoalLogs((prev) =>
                prev.filter(
                  (currentGoalLog) =>
                    currentGoalLog.goal_log_id !== goalLog.goal_log_id
                )
              );
            })
          }
        />
      </Modal>
    </div>
  );
};

export default EditGoalLog;
