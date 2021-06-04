import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import Sandbox from "../../features/sandbox/Sandbox";

const App = () => {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route
        path={`/(.+)`}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route path="/events" exact component={EventDashboard} />
              <Route path="/sandbox" exact component={Sandbox} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
};
export default App;
