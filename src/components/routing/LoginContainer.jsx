import { Route } from "react-router-dom";

import Login from "../pages/Login";

const LoginContainer = () => {
  return (
    <>
      <Route path="/login" component={Login} />
    </>
  );
};

export default LoginContainer;
