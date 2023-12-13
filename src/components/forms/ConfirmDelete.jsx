import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmDelete = (props) => {
  const { message, handleDelete, onRequestClose } = props;
  return (
    <div>
      <button onClick={onRequestClose}>
        <FontAwesomeIcon icon="fa-solid fa-xmark" />
      </button>
      <h1>{message}</h1>
      <button onClick={onRequestClose}>Cancel</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ConfirmDelete;
