import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuthInfo } from "../../context/authContext";

const NavBar = () => {
  const { logout, user } = useAuthInfo();
  return (
    <div className="navbar-container">
      <div className="links-wrapper">
        <div className="link-wrapper">
          <NavLink exact to="/">
            LOGO
          </NavLink>
        </div>

        <div className="link-wrapper">
          <NavLink to="/goals">Goals</NavLink>
        </div>

        <div className="link-wrapper">
          <NavLink to="/goal-logs">Goal logs</NavLink>
        </div>
      </div>

      <div className="right-side-wrapper">
        <h2>{user?.first_name}</h2>
        <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
      </div>
      {/* <button onClick={() => logout()}>Logout</button> */}
    </div>
  );
};

export default NavBar;
