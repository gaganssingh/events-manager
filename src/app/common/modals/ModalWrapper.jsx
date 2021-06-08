import { useDispatch } from "react-redux";
import { Modal } from "semantic-ui-react";
import { closeModal } from "./modalReducer";

const ModalWrapper = ({ children, size, header }) => {
  const dispatch = useDispatch();

  const modalCloseHandler = () => dispatch(closeModal());

  return (
    <Modal open={true} size={size} onClose={modalCloseHandler}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default ModalWrapper;
