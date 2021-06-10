import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import {
  dataFromSnapshot,
  getEventsFromFirestore,
} from "../../../app/firestore/firestoreService";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../app/store/asyncReducer";
import { listenToEvents } from "../eventActions";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
import EventListItemPlaceholder from "./EventListItemPlaceholder";

const EventDashboard = (props) => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    // Start the loading state
    dispatch(asyncActionStart());

    const unsubscribe = getEventsFromFirestore({
      // prettier-ignore
      next: (snapshot) => {
        dispatch(listenToEvents(snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))));
        dispatch(asyncActionFinish());
      },
      error: (error) => dispatch(asyncActionError(error)),
      complete: () =>
        console.log("This never happens, the application is always listening"),
    });

    return unsubscribe; // unsubscribe when component unmounts
  }, [dispatch]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
