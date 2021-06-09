import { useDispatch } from "react-redux";
import { Button, Menu } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";

const SignedOutMenu = () => {
  const dispatch = useDispatch();

  const loginHandler = () => dispatch(openModal({ modalType: "LoginForm" }));

  return (
    <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={loginHandler} />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
};

export default SignedOutMenu;
