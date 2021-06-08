import { useSelector } from "react-redux";
import TestModal from "../../../features/sandbox/TestModal";

const ModalManager = () => {
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;

  const modalLookup = {
    TestModal,
  };
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
};

export default ModalManager;
