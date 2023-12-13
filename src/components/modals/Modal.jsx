import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const Modal = (props) => {
  const { isModalOpen, onRequestClose, overlay, content, children } = props;
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      styles={{
        overlay: {
          ...overlay,
        },
        content: {
          ...content,
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
