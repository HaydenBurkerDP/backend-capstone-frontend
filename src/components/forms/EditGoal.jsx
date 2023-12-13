import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fetchWrapper from "../../util/apiWrapper";
import EditCategories from "./CategorySelector";
import ConfirmDelete from "./ConfirmDelete";
import Modal from "../modals/Modal";

import { useAppData } from "../../context/appDataContext";

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

  return (
    <div className="edit-goal-container">
      <FontAwesomeIcon onClick={onRequestClose} icon="fa-solid fa-xmark" />

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

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
            fetchWrapper(`/goal/delete/${goal.goal_id}`, "DELETE").then(() => {
              onRequestClose();
              setMyGoals((prev) =>
                prev.filter(
                  (currentGoal) => currentGoal.goal_id !== goal.goal_id
                )
              );
            })
          }
        />
      </Modal>
    </div>
  );
};

export default EditGoal;
