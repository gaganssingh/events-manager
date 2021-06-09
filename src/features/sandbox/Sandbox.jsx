import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import { increment, decrement } from "./testReducer";

const Sandbox = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);

  const buttonClickHandler = (e, operator, val) => {
    setTarget(e.target.name);
    if (operator === "increment") {
      dispatch(increment(val));
    } else {
      dispatch(decrement(val));
    }
  };

  return (
    <>
      <h1>Testing 123</h1>
      <h3>Data: {data}</h3>
      <Button
        name="increment"
        loading={loading && target === "increment"}
        content="Increment"
        color="green"
        onClick={(e) => buttonClickHandler(e, "increment", 20)}
      />

      <Button
        name="decrement"
        loading={loading && target === "decrement"}
        content="Decrement"
        color="red"
        onClick={(e) => buttonClickHandler(e, "decrement", 10)}
      />

      <Button
        content="Open Modal"
        color="blue"
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
      />
    </>
  );
};

export default Sandbox;
