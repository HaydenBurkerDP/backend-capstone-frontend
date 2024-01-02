import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CategorySelector from "./CategorySelector";
import fetchWrapper from "../../util/apiWrapper";
import ConfirmDelete from "./ConfirmDelete";
import Modal from "../modals/Modal";

import { useAppData } from "../../context/appDataContext";
import { successfulToast } from "../../util/toastNotification";
import { displayName } from "../../util/goalUtils";

const EditGoal = (props) => {
  const { goal, onRequestClose } = props;

  const [name, setName] = useState(goal.name);
  const [description, setDescription] = useState(goal.description);
  const [categoryIds, setCategoryIds] = useState(
    goal.categories.map((category) => category.category_id)
  );
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { setMyGoals } = useAppData();

  const updateGoal = () => {
    const oldCategoryIds = goal.categories.map(
      (category) => category.category_id
    );
    let changedCategoryIds = oldCategoryIds.concat(categoryIds);

    changedCategoryIds = changedCategoryIds.filter((categoryId) =>
      changedCategoryIds.filter((cId) => cId === categoryId).length === 1
        ? categoryId
        : null
    );

    const newGoal = {
      name: name,
      description: description,
      category_ids: changedCategoryIds,
    };

    fetchWrapper(`/goal/${goal.goal_id}`, "PUT", newGoal).then((res) => {
      onRequestClose();
      setMyGoals((prev) =>
        prev.map((currentGoal) =>
          currentGoal.goal_id === goal.goal_id ? res.goal : currentGoal
        )
      );
    });
  };

  const deleteGoal = () =>
    fetchWrapper(`/goal/delete/${goal.goal_id}`, "DELETE").then(() => {
      onRequestClose();
      setMyGoals((prev) =>
        prev.filter((currentGoal) => currentGoal.goal_id !== goal.goal_id)
      );
      successfulToast(`Deleted ${displayName(goal.name)}`);
    });

  return (
    <div className="edit-goal-container">
      <div className="close-wrapper">
        <button className="close-btn" onClick={onRequestClose}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
      </div>

      <div className="inputs-wrapper">
        <input
          className="name-input"
          placeholder="Goal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="buttons-wrapper">
        <button
          className="delete-btn"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </button>
        <div className="right-buttons-wrapper">
          <button
            className="categories-btn"
            onClick={() => setIsCategoriesModalOpen(true)}
          >
            Edit Categories
          </button>
          <button className="save-btn" onClick={updateGoal}>
            Save
          </button>
        </div>
      </div>

      <Modal
        isModalOpen={isCategoriesModalOpen}
        onRequestClose={() => setIsCategoriesModalOpen(false)}
        content={{
          width: "350px",
          height: "400px",
        }}
      >
        <CategorySelector
          onRequestClose={() => setIsCategoriesModalOpen(false)}
          categoryIds={categoryIds}
          setCategoryIds={setCategoryIds}
        />
      </Modal>

      <Modal
        isModalOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        content={{
          width: "400px",
          height: "250px",
        }}
      >
        <ConfirmDelete
          message="Are you sure you want to delete this goal?"
          onRequestClose={() => setIsDeleteModalOpen(false)}
          handleDelete={deleteGoal}
        />
      </Modal>
    </div>
  );
};

export default EditGoal;
