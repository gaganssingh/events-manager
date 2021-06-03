import { Button, Menu } from "semantic-ui-react";

const SignedOutMenu = ({ setAuthenticated }) => {
  const loginHandler = () => setAuthenticated(true);

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
