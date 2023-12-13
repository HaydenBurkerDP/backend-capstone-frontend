import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppData } from "../../context/appDataContext";
import fetchWrapper from "../../util/apiWrapper";
import { useAuthInfo } from "../../context/authContext";

const UserSelector = (props) => {
  const { goal, setGoal, onRequestClose } = props;

  const { users, fetchUsers, setMyGoals } = useAppData();
  const { user } = useAuthInfo();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchUsers(signal).catch((e) => {
      if (!signal.aborted) console.error(e);
    });

    return () => controller.abort();
  }, [fetchUsers]);

  return (
    <div>
      <FontAwesomeIcon onClick={onRequestClose} icon="fa-solid fa-xmark" />
      <h1>Users</h1>
      {users
        .filter((u) => u.user_id !== user.user_id)
        .map((user) => (
          <h1
            key={user.user_id}
            onClick={() => {
              fetchWrapper(`/goal/${goal.goal_id}`, "PUT", {
                user_id: user.user_id,
              }).then((res) => {
                setGoal(res.goal);
                setMyGoals((prev) =>
                  prev.map((currentGoal) =>
                    currentGoal.goal_id === goal.goal_id
                      ? res.goal
                      : currentGoal
                  )
                );
              });
            }}
          >
            {goal.users.some((u) => u.user_id === user.user_id) ? "!" : ""}
            {user.first_name}
            {user.last_name}
          </h1>
        ))}
    </div>
  );
};

export default UserSelector;
