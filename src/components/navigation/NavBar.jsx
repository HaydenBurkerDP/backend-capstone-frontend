import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import { useAuthInfo } from "../../context/authContext";
import { useAppData } from "../../context/appDataContext";

import goalLogo from "../../assets/images/Goal.png";

const NavBar = () => {
  const userMenuRef = useRef(null);
  const userMenuToggleRef = useRef(null);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { logout, user } = useAuthInfo();
  const { categories, setCategory } = useAppData();

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

  const getCategory = (categoryId) => {
    for (const category of categories) {
      if (category.category_id === categoryId) {
        return category;
      }
    }
    return {};
  };

  return (
    <div className="navbar-container">
      <div className="links-wrapper">
        <NavLink exact to="/">
          <img className="logo" src={goalLogo} alt="" />
        </NavLink>

        <NavLink className="highlight-green" to="/goals">
          Goals
        </NavLink>

        <NavLink className="highlight-blue" to="/goal-logs">
          Goal logs
        </NavLink>
      </div>

      <div className="right-side-wrapper">
        <div className="category-dropdown-wrapper">
          <h2>Category</h2>
          <select
            className="category-dropdown"
            name="category"
            id="category"
            onChange={(e) => setCategory(getCategory(e.target.value))}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <h2 className="name">{user?.first_name}</h2>
        <div
          className="user-menu-arrow"
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
