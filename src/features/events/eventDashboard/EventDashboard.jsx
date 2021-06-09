import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import LoadingSpinner from "../../../app/ui/LoadingSpinner";
import EventList from "./EventList";

const EventDashboard = (props) => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
