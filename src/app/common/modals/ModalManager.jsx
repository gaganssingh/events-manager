import { useSelector } from "react-redux";
import LoginForm from "../../../features/auth/LoginForm";
import TestModal from "../../../features/sandbox/TestModal";

const ModalManager = () => {
  const currentModal = useSelector((state) => state.modals);
  const modalLookup = {
    TestModal,
    LoginForm,
  };

  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
};

export default ModalManager;
