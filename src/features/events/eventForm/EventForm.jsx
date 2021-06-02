import cuid from "cuid";
import { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import Input from "../../../app/ui/Input";

const EventForm = ({ setFormOpen, setEvents, createEvent }) => {
  const [values, setValues] = useState({
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  });

  const handleFormSubmit = (e) => {
    const eventData = {
      id: cuid(),
      hostedBy: "Gagan",
      hostPhotoURL: "/assets/user.png",
      attendees: [],
      ...values,
    };
    createEvent(eventData);
    setFormOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const formCloseHandler = (e) => {
    e.preventDefault();
    setFormOpen(false);
  };

  return (
    <Segment clearing>
      <Header content="Create a new event" />
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
        <Button floated="right" content="Cancel" onClick={formCloseHandler} />
      </Form>
    </Segment>
  );
};

export default EventForm;
