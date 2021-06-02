import { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";

const EventForm = ({ setFormOpen, setEvents }) => {
  const [values, setValues] = useState({
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  });

  const handleFormSubmit = (e) => {
    console.log(values);
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
        <Form.Field>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={values.title}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="category"
            type="text"
            placeholder="Category"
            value={values.category}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="description"
            type="text"
            placeholder="Description"
            value={values.description}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="city"
            type="text"
            placeholder="City"
            value={values.city}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="venue"
            type="text"
            placeholder="Venue"
            value={values.venue}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="date"
            type="date"
            placeholder="Date"
            value={values.date}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Button type="submit" floated="right" positive content="Submit" />
        <Button floated="right" content="Cancel" onClick={formCloseHandler} />
      </Form>
    </Segment>
  );
};

export default EventForm;
