import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fetchWrapper from "../../util/apiWrapper";

import { useAppData } from "../../context/appDataContext";
import { useAuthInfo } from "../../context/authContext";

const UserSelector = (props) => {
  const { goal, setGoal, onRequestClose } = props;

  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="user-selector-container">
      <div className="close-wrapper">
        <button className="close-btn">
          <FontAwesomeIcon onClick={onRequestClose} icon="fa-solid fa-xmark" />
        </button>
      </div>
      <h1>Users</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search Users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="user-selected-wrapper">
        {users
          .filter((u) => u.user_id !== user.user_id)
          .filter((u) => {
            const name = `${u.first_name} ${u.last_name}`;
            return name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((user) => (
            <div
              className={`user-name${
                goal.users.some((u) => u.user_id === user.user_id)
                  ? " selected"
                  : ""
              }`}
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
              {`${user.first_name} ${user.last_name}`}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserSelector;
