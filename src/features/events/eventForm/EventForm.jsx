import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import cuid from "cuid";
import { createEvent, updateEvent } from "../eventActions";
import Input from "../../../app/ui/Input";

const EventForm = ({ match }) => {
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

  const [values, setValues] = useState(initialValues);

  const handleFormSubmit = (e) => {
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Segment clearing>
      <Header content={!selectedEvent ? "Create a new event" : "Edit event"} />
      <Form onSubmit={handleFormSubmit}>
        <Input
          name="title"
          type="text"
          placeholder="Title"
          value={values.title}
          handleInputChange={handleInputChange}
        />

        <Input
          name="category"
          type="text"
          placeholder="Category"
          value={values.category}
          handleInputChange={handleInputChange}
        />

        <Input
          name="description"
          type="text"
          placeholder="Description"
          value={values.description}
          handleInputChange={handleInputChange}
        />

        <Input
          name="city"
          type="text"
          placeholder="City"
          value={values.city}
          handleInputChange={handleInputChange}
        />

        <Input
          name="venue"
          type="text"
          placeholder="Venue"
          value={values.venue}
          handleInputChange={handleInputChange}
        />

        <Input
          name="date"
          type="date"
          placeholder="Date"
          value={values.date}
          handleInputChange={handleInputChange}
        />

        <Button type="submit" floated="right" positive content="Submit" />
        <Button as={Link} to="/events" floated="right" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default EventForm;
