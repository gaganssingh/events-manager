import ModalWrapper from "../../app/common/modals/ModalWrapper";

const TestModal = ({ data }) => (
  <ModalWrapper size="mini" header="Test Modal">
    <div>Here is the test data: {data}</div>
  </ModalWrapper>
);

export default TestModal;
