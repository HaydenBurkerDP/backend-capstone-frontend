import { NavLink } from "react-router-dom";

import { useAuthInfo } from "../../context/authContext";

const NavBar = () => {
  const { logout, user } = useAuthInfo();
  return (
    <div className="navbar-container">
      <NavLink to="/">LOGO</NavLink>
      <NavLink to="/goals">Goals</NavLink>
      <NavLink to="/goal-logs">Goal logs</NavLink>
      <h2>{user?.first_name}</h2>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default NavBar;
