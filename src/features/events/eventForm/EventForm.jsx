import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { listenToEvents } from "../eventActions";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import {
  addEventToFirestore,
  listenToEventsFromFirestore,
  updateEventInFirestore,
} from "../../../app/firestore/firestoreService";
import { categoryData } from "../../../app/api/categoryData";
import { validationSchema } from "../../../app/helpers/formValidationSchema";
import FormTextInput from "../../../app/common/form/FormTextInput";
import FormTextArea from "../../../app/common/form/FormTextArea";
import FormSelectInput from "../../../app/common/form/FormSelectInput";
import FormDateInput from "../../../app/common/form/FormDateInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingSpinner from "../../../app/ui/LoadingSpinner";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const eventId = match.params.id;
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === eventId)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      latLng: null,
    },
    venue: {
      address: "",
      latLng: null,
    },
    date: "",
  };

  // Fetch single event's data from db to pre-fill the form
  useFirestoreDoc({
    query: () => listenToEventsFromFirestore(eventId),
    data: (event) => dispatch(listenToEvents([event])),
    dependencies: [eventId, dispatch],
    shouldExecute: !!eventId, // If no event found, returns false. For "Create Event"
  });

  if (loading) {
    return <LoadingSpinner content="Loading event..." />;
  }

  if (error) {
    return <Redirect to="/error" />;
  }

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);

            // After creating/updating event, send user to all events page
            setSubmitting(false);
            history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
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
            <FormTextInput
              name="venue"
              placeholder="Venue"
              disabled={!values.city.latLng}
            />
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
