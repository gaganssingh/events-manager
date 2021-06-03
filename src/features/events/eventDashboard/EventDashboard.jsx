import { useState } from "react";
import { Grid } from "semantic-ui-react";
import { sampleData } from "../../../app/api/sampleData";
import EventList from "./EventList";

const EventDashboard = (props) => {
  const [events, setEvents] = useState(sampleData);

  // Create a new Event
  // const handleCreateEvent = (eventData) => setEvents([...events, eventData]);

  // // Edit/Update an existing event
  // const handleUpdateEvent = (updatedEvent) => {
  //   setEvents(
  //     events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
  //   );
  //   selectEvent(null);
  // };

  // Delete an existing event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((evt) => evt.id !== id));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={handleDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
