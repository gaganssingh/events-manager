import { useState } from "react";
import { Grid } from "semantic-ui-react";
import { sampleData } from "../../../app/api/sampleData";
import EventForm from "../eventForm/EventForm";
import EventList from "./EventList";

const EventDashboard = (props) => {
  const { formOpen, setFormOpen, selectEvent, selectedEvent } = props;

  const [events, setEvents] = useState(sampleData);

  const handleCreateEvent = (eventData) => setEvents([...events, eventData]);
  const handleUpdateEvent = (updatedEvent) => {
    setEvents(
      events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
    );
    selectEvent(null);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} selectEvent={selectEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            key={selectedEvent ? selectedEvent.id : null}
            setFormOpen={setFormOpen}
            setEvents={setEvents}
            createEvent={handleCreateEvent}
            selectedEvent={selectedEvent}
            updateEvent={handleUpdateEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
