import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fetchWrapper from "../../util/apiWrapper";
import UserSelector from "../forms/UserSelector";
import EditGoal from "../forms/EditGoal";
import Modal from "../modals/Modal";
import GoalCard from "../GoalCard";

import { useAppData } from "../../context/appDataContext";

const Goals = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isEditGoalModalOpen, setIsEditGoalModalOpen] = useState(false);
  const [isShareGoalModalOpen, setIsShareGoalModalOpen] = useState(false);

  const {
    fetchSharedGoals,
    fetchMyGoals,
    sharedGoals,
    setMyGoals,
    category,
    myGoals,
  } = useAppData();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchMyGoals(signal).catch((e) => {
      if (!signal.aborted) console.error(e);
    });

    return () => controller.abort();
  }, [fetchMyGoals]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchSharedGoals(signal).catch((e) => {
      if (!signal.aborted) console.error(e);
    });

    return () => controller.abort();
  }, [fetchSharedGoals]);

  const createGoal = () => {
    const newGoal = {
      name: "",
      description: "",
    };

    if (category.category_id) newGoal.category_ids = [category.category_id];

    fetchWrapper("/goal", "POST", newGoal).then((res) => {
      setMyGoals((prev) => [...prev, res.goal]);
      setIsEditGoalModalOpen(true);
      setSelectedGoal(res.goal);
    });
  };

  const goalHasCategory = (goal, category) => {
    return (
      !category?.category_id ||
      goal.categories.some((c) => c.category_id === category.category_id)
    );
  };

  const renderMyGoals = () => {
    const renderedGoals = myGoals.filter((goal) =>
      goalHasCategory(goal, category)
    );
    if (renderedGoals.length === 0) {
      return (
        <h1 className="empty-container-text">
          No goals found! Click the + to create a new one
        </h1>
      );
    }
    return renderedGoals.map((goal) => {
      return (
        <GoalCard
          key={goal.goal_id}
          goal={goal}
          handleEdit={() => {
            setIsEditGoalModalOpen(true);
            setSelectedGoal(goal);
          }}
          handleShare={() => {
            setIsShareGoalModalOpen(true);
            setSelectedGoal(goal);
          }}
        />
      );
    });
  };

  const renderSharedGoals = () => {
    return sharedGoals
      .filter((goal) => goalHasCategory(goal, category))
      .map((goal) => {
        return <GoalCard key={goal.goal_id} goal={goal} />;
      });
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h1>My Goals</h1>

        <button className="plus-btn" onClick={createGoal}>
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </button>
      </div>

      <div className="goal-cards-container">{renderMyGoals()}</div>

      {sharedGoals.length ? (
        <div className="goals-header">
          <h1>Shared Goals</h1>
        </div>
      ) : null}

      <div className="goal-cards-container">{renderSharedGoals()}</div>

      <Modal
        isModalOpen={isEditGoalModalOpen}
        onRequestClose={() => setIsEditGoalModalOpen(false)}
      >
        <EditGoal
          goal={selectedGoal}
          onRequestClose={() => setIsEditGoalModalOpen(false)}
        />
      </Modal>

      <Modal
        isModalOpen={isShareGoalModalOpen}
        onRequestClose={() => setIsShareGoalModalOpen(false)}
        content={{
          width: "350px",
          height: "400px",
        }}
      >
        <UserSelector
          goal={selectedGoal}
          setGoal={setSelectedGoal}
          onRequestClose={() => setIsShareGoalModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Goals;
