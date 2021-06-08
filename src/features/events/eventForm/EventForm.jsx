import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import cuid from "cuid";
import { createEvent, updateEvent } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormTextInput from "../../../app/common/form/FormTextInput";
import FormTextArea from "../../../app/common/form/FormTextArea";
import FormSelectInput from "../../../app/common/form/FormSelectInput";
import { categoryData } from "../../../app/api/categoryData";
import FormDateInput from "../../../app/common/form/FormDateInput";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();

  const eventId = match.params.id;
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === eventId)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  // Form validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Enter a catchy title for the event."),
    category: Yup.string().required("What category?"),
    description: Yup.string().required("Please enter a short description."),
    city: Yup.string().required("What city is the event in?"),
    venue: Yup.string().required("What venue is the event in?"),
    date: Yup.date().required("Please provide a vailid date."),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const eventData = {
            id: cuid(),
            hostedBy: "Gagan",
            hostPhotoURL: "/assets/user.png",
            attendees: [],
            ...values,
          };

          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(createEvent(eventData));

          // After creating/updating event, send user to all events page
          history.push("/events");
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="green" content="Event Details" />
            {/* Form fields */}
            <FormTextInput name="title" placeholder="Event Title" />
            <FormSelectInput
              name="category"
              placeholder="Category"
              options={categoryData}
            />

            <FormTextArea
              name="description"
              placeholder="Description"
              rows="3"
            />

            <Header sub color="green" content="Event Location Details" />
            <FormTextInput name="city" placeholder="City" />
            <FormTextInput name="venue" placeholder="Venue" />
            <FormDateInput
              name="date"
              placeholderText="Date"
              time="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            {/* Buttons */}
            <Button
              type="submit"
              floated="right"
              positive
              content="Submit"
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              as={Link}
              to="/events"
              floated="right"
              content="Cancel"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default EventForm;
