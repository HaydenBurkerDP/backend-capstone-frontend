import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppData } from "../../context/appDataContext";

const EditCategories = (props) => {
  const { onRequestClose, categoryIds, setCategoryIds } = props;

  const { categories } = useAppData();

  return (
    <div>
      <FontAwesomeIcon onClick={onRequestClose} icon="fa-solid fa-xmark" />
      <h1>Categories</h1>
      {categories.map((category) => {
        return (
          <h1
            key={category.category_id}
            onClick={() => {
              setCategoryIds((prev) =>
                prev.includes(category.category_id)
                  ? prev.filter((c) => c !== category.category_id)
                  : [...prev, category.category_id]
              );
            }}
          >
            {categoryIds.includes(category.category_id) ? "!" : null}
            {category.name}
          </h1>
        );
      })}
    </div>
  );
};

export default EditCategories;
