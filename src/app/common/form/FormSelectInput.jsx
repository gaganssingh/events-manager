import { useField } from "formik";
import { FormField, Label, Select } from "semantic-ui-react";

const FormSelectInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <FormField error={meta.touched && meta.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />

      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default FormSelectInput;
