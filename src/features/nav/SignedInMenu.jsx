import { Link } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";

const SignedInMenu = ({ setAuthenticated }) => {
  // HOOKS

  // HELPER FUNCTIONS
  const logoutHandler = () => setAuthenticated(false);

  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src="/assets/user.png" />
      <Dropdown pointing="top left" text="Gagan">
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item as={Link} to="" text="My Profile" icon="user" />
          <Dropdown.Item
            as={Link}
            to="/"
            text="Sign Out"
            icon="power"
            onClick={logoutHandler}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
