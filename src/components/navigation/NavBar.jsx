import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import { useAuthInfo } from "../../context/authContext";

const NavBar = () => {
  const userMenuRef = useRef(null);
  const userMenuToggleRef = useRef(null);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { logout, user } = useAuthInfo();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        !userMenuToggleRef.current.contains(event.target) &&
        isUserMenuOpen
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <div className="navbar-container">
      <div className="links-wrapper">
        <NavLink exact to="/">
          LOGO
        </NavLink>

        <NavLink className="highlight-green" to="/goals">
          Goals
        </NavLink>

        <NavLink className="highlight-blue" to="/goal-logs">
          Goal logs
        </NavLink>
      </div>

      <div className="right-side-wrapper">
        {console.log(user)}
        <h2 className="name">{user?.first_name}</h2>
        <div
          ref={userMenuToggleRef}
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
        >
          {isUserMenuOpen ? (
            <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
          )}
        </div>
        {isUserMenuOpen ? (
          <div ref={userMenuRef} className="user-menu">
            <div className="menu-option" onClick={() => logout()}>
              Sign Out
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
