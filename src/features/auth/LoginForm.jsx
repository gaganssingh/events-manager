import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import { signInUser } from "./authActions";
import { closeModal } from "../../app/common/modals/modalReducer";
import FormTextInput from "../../app/common/form/FormTextInput";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  return (
    <ModalWrapper size="mini" header="Sign in to meetups">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInUser(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="ui form">
            <FormTextInput name="email" placeholder="Email Address" />
            <FormTextInput
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Login"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;
