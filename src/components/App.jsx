import { Switch, Route, BrowserRouter } from "react-router-dom";

import LoginContainer from "./routing/LoginContainer";
import PrivateRoutes from "./routing/PrivateRoutes";

import { AuthProvider } from "../context/authContext";

import regularIcons from "../assets/icons/regularIcons";
import solidIcons from "../assets/icons/solidIcons";

import "../app.scss";

solidIcons();
regularIcons();

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={LoginContainer} />

            <Route component={PrivateRoutes} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
