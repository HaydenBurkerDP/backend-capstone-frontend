import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const Modal = (props) => {
  const { isModalOpen, onRequestClose, overlay, content, children } = props;
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "rgba(112, 145, 176, 0.60)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...overlay,
        },
        content: {
          width: "50%",
          height: "50%",
          backgroundColor: "#a6bfd6",
          border: "none",
          borderRadius: "10px",
          position: "relative",
          padding: "30px",
          inset: "0",
          ...content,
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
