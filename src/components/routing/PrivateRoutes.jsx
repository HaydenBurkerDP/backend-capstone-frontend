import { Route, Switch } from "react-router-dom";

import NavBar from "../navigation/NavBar";
import GoalLogs from "../pages/GoalLogs";
import Goals from "../pages/Goals";
import { AppDataContextProvider } from "../../context/appDataContext";

const PrivateRoutes = () => {
  return (
    <AppDataContextProvider>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Goals} />
        <Route path="/goals" component={Goals} />
        <Route path="/goal-logs" component={GoalLogs} />
      </Switch>
    </AppDataContextProvider>
  );
};

export default PrivateRoutes;
