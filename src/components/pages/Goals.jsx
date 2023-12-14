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

  const { myGoals, setMyGoals, fetchMyGoals, sharedGoals, fetchSharedGoals } =
    useAppData();

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

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h1>My Goals</h1>

        <button className="plus-btn">
          <FontAwesomeIcon
            onClick={() => {
              fetchWrapper("/goal", "POST", {
                name: "",
                description: "",
              }).then((res) => setMyGoals((prev) => [...prev, res.goal]));
            }}
            icon="fa-solid fa-plus"
          />
        </button>
      </div>

      <div className="goal-cards-container">
        {myGoals.map((goal) => {
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
        })}
      </div>

      {sharedGoals.length ? (
        <div className="goals-header">
          <h1>Shared Goals</h1>
        </div>
      ) : null}

      <div className="goal-cards-container">
        {sharedGoals.map((goal) => {
          return <GoalCard key={goal.goal_id} goal={goal} />;
        })}
      </div>

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
