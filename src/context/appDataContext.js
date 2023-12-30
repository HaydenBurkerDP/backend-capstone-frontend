import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import fetchWrapper from "../util/apiWrapper";

const AppDataContext = createContext();

export const AppDataContextProvider = ({ children }) => {
  const [myGoals, setMyGoals] = useState([]);
  const [sharedGoals, setSharedGoals] = useState([]);
  const [goalLogs, setGoalLogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [users, setUsers] = useState([]);

  const fetchMyGoals = useCallback((signal) => {
    return fetchWrapper("/goals/me", "GET", null, signal).then((res) => {
      setMyGoals(res.goals);
      return res.goals;
    });
  }, []);

  const fetchSharedGoals = useCallback((signal) => {
    return fetchWrapper("/goals/shared", "GET", null, signal).then((res) => {
      setSharedGoals(res.goals);
      return res.goals;
    });
  }, []);

  const fetchGoalLogs = useCallback((signal) => {
    return fetchWrapper("/goal-logs/me", "GET", null, signal).then((res) => {
      setGoalLogs(res.goal_logs);
      return res.goal_logs;
    });
  }, []);

  const fetchCategories = useCallback((signal) => {
    return fetchWrapper("/categories", "GET", null, signal).then((res) => {
      setCategories(res.categories);
      return res.categories;
    });
  }, []);

  const fetchUsers = useCallback((signal) => {
    return fetchWrapper("/users", "GET", null, signal).then((res) => {
      setUsers(res.users);
      return res.users;
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchCategories(signal).catch((e) => {
      if (!signal.aborted) console.error(e);
    });

    return () => controller.abort();
  }, [fetchCategories]);

  const values = {
    myGoals,
    setMyGoals,
    fetchMyGoals,
    sharedGoals,
    fetchSharedGoals,
    goalLogs,
    setGoalLogs,
    fetchGoalLogs,
    categories,
    setCategories,
    fetchCategories,
    category,
    setCategory,
    users,
    setUsers,
    fetchUsers,
  };
  return (
    <AppDataContext.Provider value={values}>{children}</AppDataContext.Provider>
  );
};

export const useAppData = () => {
  return useContext(AppDataContext);
};
