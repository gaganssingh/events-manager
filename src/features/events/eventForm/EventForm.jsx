import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment, FormField, Label } from "semantic-ui-react";
import cuid from "cuid";
import { createEvent, updateEvent } from "../eventActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
    title: Yup.string().required("Please provide a title for the event."),
  });

  // const handleFormSubmit = (e) => {
  //   const eventData = {
  //     id: cuid(),
  //     hostedBy: "Gagan",
  //     hostPhotoURL: "/assets/user.png",
  //     attendees: [],
  //     ...values,
  //   };

  //   selectedEvent
  //     ? dispatch(updateEvent({ ...selectedEvent, ...values }))
  //     : dispatch(createEvent(eventData));

  //   // After creating/updating event, send user to all events page
  //   history.push("/events");
  // };

  return (
    <Segment clearing>
      <Header content={!selectedEvent ? "Create a new event" : "Edit event"} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="ui form">
          {/* Form fields */}
          <FormField>
            <Field name="title" placeholder="Event Title" />
            <ErrorMessage
              name="title"
              render={(error) => <Label basic color="red" content={error} />}
            />
          </FormField>
          <FormField>
            <Field name="category" placeholder="Category" />
          </FormField>
          <FormField>
            <Field name="description" placeholder="Description" />
          </FormField>
          <FormField>
            <Field name="city" placeholder="City" />
          </FormField>
          <FormField>
            <Field name="venue" placeholder="Venue" />
          </FormField>
          <FormField>
            <Field name="date" placeholder="Date" type="date" />
          </FormField>

          {/* Buttons */}
          <Button type="submit" floated="right" positive content="Submit" />
          <Button as={Link} to="/events" floated="right" content="Cancel" />
        </Form>
      </Formik>
    </Segment>
  );
};

export default EventForm;
