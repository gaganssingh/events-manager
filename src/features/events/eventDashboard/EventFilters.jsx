import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

const EventFilters = () => (
  <>
    <Menu vertical size="large" style={{ width: "100%" }}>
      <Header icon="filter" attached color="green" content="Filters" />
      <Menu.Item content="All Events" />
      <Menu.Item content="Going" />
      <Menu.Item content="Hosting" />
    </Menu>
    <Header icon="calendar" attached color="green" content="Select Date" />
    <Calendar />
  </>
);

export default EventFilters;
