const { Dimmer, Loader } = require("semantic-ui-react");

const LoadingSpinner = ({ inverted = true, content = "Loading..." }) => (
  <Dimmer inverted={inverted} active={true}>
    <Loader content={content} />
  </Dimmer>
);

export default LoadingSpinner;
