import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmDelete = (props) => {
  const { message, handleDelete, onRequestClose } = props;
  return (
    <div className="confirm-delete-container">
      <div className="close-wrapper">
        <button className="close-btn" onClick={onRequestClose}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
      </div>

      <div className="message-wrapper">
        <h1>{message}</h1>
      </div>

      <div className="buttons-wrapper">
        <button className="cancel-btn" onClick={onRequestClose}>
          Cancel
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
