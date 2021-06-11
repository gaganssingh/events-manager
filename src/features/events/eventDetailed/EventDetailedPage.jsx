import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { listenToEventFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingSpinner from "../../../app/ui/LoadingSpinner";
import { listenToEvents } from "../eventActions";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";

const EventDetailedPage = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);

  const eventId = match.params.id;
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === eventId)
  );

  // Fetch single event from the db
  useFirestoreDoc({
    query: () => listenToEventFromFirestore(eventId),
    data: (event) => dispatch(listenToEvents([event])),
    dependencies: [eventId, dispatch],
  });

  if (loading || (!event && !error)) {
    return <LoadingSpinner content="Loading event..." />;
  }

  if (error) {
    return <Redirect to="/error" />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailedPage;
