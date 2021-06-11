import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { listenToEvents } from "../eventActions";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import {
  addEventToFirestore,
  cancelEventToggle,
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
import { useState } from "react";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  const handleCancelToggle = async (event) => {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
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
            {selectedEvent && (
              <Button
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? "teal" : "red"}
                loading={loadingCancel}
                content={
                  selectedEvent.isCancelled
                    ? "Reactivate event"
                    : "Cancel event"
                }
                onClick={() => setConfirmOpen(true)}
              />
            )}

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
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? "Are you sure you want to re-activate this event?"
            : "Really cancel this event?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
};

export default EventForm;
