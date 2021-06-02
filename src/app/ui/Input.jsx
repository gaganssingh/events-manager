import { Form } from "semantic-ui-react";

const Input = (props) => {
  const { name, type, placeholder, value, handleInputChange } = props;
  return (
    <Form.Field>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e)}
      />
    </Form.Field>
  );
};

export default Input;
