import { Button, Segment, Grid, Icon } from "semantic-ui-react";
import { format } from "date-fns";

const EventDetailedInfo = ({ event }) => {
  const { description, date, venue } = event;

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="green" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="green" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(date, "MMMM d, yyyy h:mm a")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="green" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{venue.address}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color="green" size="tiny" content="Show Map" />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailedInfo;
