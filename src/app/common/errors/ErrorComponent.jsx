import { useSelector } from "react-redux";
import { Button, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
  const { error } = useSelector((state) => state.async);

  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || "Something went wrong..."}
      />
      <Button
        as={Link}
        to="/events"
        primary
        style={{ marginTop: 20 }}
        content="Return to all events"
      />
    </Segment>
  );
};

export default ErrorComponent;
