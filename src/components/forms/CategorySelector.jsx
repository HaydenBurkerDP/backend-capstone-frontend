import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppData } from "../../context/appDataContext";

const EditCategories = (props) => {
  const { onRequestClose, categoryIds, setCategoryIds } = props;

  const [searchTerm, setSearchTerm] = useState("");

  const { categories } = useAppData();

  return (
    <div className="category-selector-container">
      <div className="close-wrapper">
        <button className="close-btn">
          <FontAwesomeIcon onClick={onRequestClose} icon="fa-solid fa-xmark" />
        </button>
      </div>
      <h1>Categories</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search Categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="category-selected-wrapper">
        {categories
          .filter((category) => {
            return category.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          })
          .map((category) => {
            return (
              <div
                className={`category-name${
                  categoryIds.includes(category.category_id) ? " selected" : ""
                }`}
                key={category.category_id}
                onClick={() => {
                  setCategoryIds((prev) =>
                    prev.includes(category.category_id)
                      ? prev.filter((c) => c !== category.category_id)
                      : [...prev, category.category_id]
                  );
                }}
              >
                {category.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EditCategories;
